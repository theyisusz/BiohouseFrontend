package co.edu.unicauca.microusuarios.fachadaServices.services;

import co.edu.unicauca.microusuarios.capaAccesoADatos.modelos.Role;
import co.edu.unicauca.microusuarios.capaAccesoADatos.modelos.User;
import co.edu.unicauca.microusuarios.capaAccesoADatos.repositories.UserRepository;
import co.edu.unicauca.microusuarios.fachadaServices.mappers.UserMapper;
import co.edu.unicauca.microusuarios.fachadaServices.services.dtos.AsesorResponseDTO;
import co.edu.unicauca.microusuarios.fachadaServices.services.dtos.RegistroAsesorDTO;
import co.edu.unicauca.microusuarios.fachadaServices.services.dtos.RegistroUsuarioAuth0DTO;
import co.edu.unicauca.microusuarios.fachadaServices.services.dtos.UserResponseDTO;
import co.edu.unicauca.microusuarios.infra.exceptions.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    //private final AsesorClient asesorClient;

    public UserServiceImpl(
            UserRepository userRepository,
            UserMapper userMapper
    ) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }

    // ----------------------------------------------------
    // SYNCHRONIZATION (Login/Registro unificado con Auth0)
    // ----------------------------------------------------
    @Override
    @Transactional
    public UserResponseDTO sincronizarUsuario(RegistroUsuarioAuth0DTO dto, String auth0Id, List<String> rolesAuth0) {

        // 1. Buscamos si ya existe por email
        Optional<User> existingUserOpt = userRepository.findByEmail(dto.getEmail());
        User user;

        // 2. Determinamos qué rol dice Auth0 que tiene este usuario
        Role rolDesdeAuth0 = Role.CLIENTE;
        if (rolesAuth0.contains("admin") || rolesAuth0.contains("ADMIN")) {
            rolDesdeAuth0 = Role.ADMIN;
        } else if (rolesAuth0.contains("asesor") || rolesAuth0.contains("ASESOR")) {
            rolDesdeAuth0 = Role.ASESOR;
        }

        // 3. Lógica del nombre
        String nombreAUsar = dto.getNombre();
        if (nombreAUsar == null || nombreAUsar.trim().isEmpty()) {
            nombreAUsar = dto.getEmail();
        }

        if (existingUserOpt.isPresent()) {
            // =================================================================
            // CASO 1: El usuario YA EXISTE (Pre-registro Admin o login previo)
            // =================================================================
            user = existingUserOpt.get();

            if (user.getAuth0Id() != null && !user.getAuth0Id().equals(auth0Id)) {
                throw new ConflictException("El email ya está vinculado a otra cuenta Auth0");
            }

            // --- CORRECCIÓN CRÍTICA AQUÍ ---
            // Si el usuario en la BD ya tiene un rol importante (ASESOR o ADMIN),
            // y Auth0 nos dice que es CLIENTE (o nada), RESPETA EL ROL DE LA BD.
            // Solo actualizamos el rol si en la BD es CLIENTE (así permitimos ascensos futuros).
            if (user.getRole() == Role.CLIENTE) {
                user.setRole(rolDesdeAuth0);
            }
            // Nota: Si en BD es ASESOR y Auth0 dice CLIENTE -> Se queda como ASESOR.
            // -------------------------------

            // Vinculamos la cuenta Auth0 si no estaba vinculada
            if (user.getAuth0Id() == null || !user.getAuth0Id().equals(auth0Id)) {
                user.setAuth0Id(auth0Id);
            }

            // Actualizamos datos básicos solo si vienen en el login y están vacíos en BD
            // (Opcional: puedes decidir sobrescribir siempre la imagen si quieres)
            if (dto.getImagenUrl() != null) {
                user.setImagenUrl(dto.getImagenUrl());
            }

            // No sobrescribas nombre o teléfono si ya existen en BD (preserva lo que puso el Admin)
            if ((user.getNombre() == null || user.getNombre().isEmpty()) && nombreAUsar != null) {
                user.setNombre(nombreAUsar);
            }
            if ((user.getApellido() == null || user.getApellido().isEmpty()) && dto.getApellido() != null) {
                user.setApellido(dto.getApellido());
            }
            if ((user.getTelefono() == null || user.getTelefono().isEmpty()) && dto.getTelefono() != null) {
                user.setTelefono(dto.getTelefono());
            }

        } else {
            // =================================================================
            // CASO 2: Usuario NUEVO (Registro real desde cero)
            // =================================================================
            user = User.builder()
                    .email(dto.getEmail())
                    .nombre(nombreAUsar)
                    .apellido(dto.getApellido() != null ? dto.getApellido() : " ")
                    .imagenUrl(dto.getImagenUrl())
                    .auth0Id(auth0Id)
                    .role(rolDesdeAuth0) // Aquí sí usamos lo que diga Auth0 o Cliente por defecto
                    .estado(true)
                    .telefono(dto.getTelefono())
                    .ultimaSesion(LocalDateTime.now())
                    .build();
        }

        user.setUltimaSesion(LocalDateTime.now());
        User saved = userRepository.save(user);
        return userMapper.toUserResponseDTO(saved);
    }

    // -----------------------------------------
    // Registrar Asesor(admin)
    // -----------------------------------------
    @Override
    @Transactional
    public AsesorResponseDTO registrarAsesor(RegistroAsesorDTO dto) {
        if (userRepository.existsByEmail(dto.getEmail())) {
            throw new ConflictException("El correo ya está registrado");
        }

        // Creamos el asesor SIN contraseña y SIN auth0Id todavía.
        // Cuando el asesor entre por primera vez con ese correo, el metodo sincronizarUsuario
        // encontrará este registro y le pegará el Auth0Id.
        User asesor = User.builder()
                .nombre(dto.getNombre())
                .email(dto.getEmail())
                .telefono(dto.getTelefono())
                .imagenUrl(dto.getImagenUrl())
                .role(Role.ASESOR)
                .estado(true)
                .build();

        User saved = userRepository.save(asesor);

        // Mapeos y llamada a microservicio externo
        AsesorResponseDTO respuestaUsuarios = userMapper.toAsesorResponseDTO(saved);


        //LOGICA FUTURA PARA PODER HACERLO EN ASESOR
//        BarberoDTOPeticion peticionAsesor = new BarberoDTOPeticion(
//                respuestaUsuarios.getId(),
//                respuestaUsuarios.getNombre(),
//                respuestaUsuarios.getEmail(),
//                respuestaUsuarios.getTelefono(),
//                respuestaUsuarios.getEstado()
//        );
//
//        asesorClient.crearAsesor(peticionAsesor);

        return respuestaUsuarios;
    }

    @Override
    public UserResponseDTO getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("El usuario con ID " + id + " no existe."));

        return userMapper.toUserResponseDTO(user);
    }

    @Override
    @Transactional
    public void desactivarUsuario(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("No se puede desactivar. Usuario con ID " + id + " no existe."));

        user.setEstado(false);
        userRepository.save(user);
    }

    @Override
    public List<UserResponseDTO> listarAsesor() {
        return userRepository.findByRole(Role.ASESOR)
                .stream()
                .map(userMapper::toUserResponseDTO)
                .toList();
    }

    @Override
    public List<UserResponseDTO> listarClientes() {
        return userRepository.findByRole(Role.CLIENTE)
                .stream()
                .map(userMapper::toUserResponseDTO)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public UserResponseDTO findByEmail(String email) {
        // 1. Buscamos en el repositorio
        User userEntity = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("NOT_FOUND: Usuario con email " + email + " no existe"));

        UserResponseDTO UsuarioToDto = userMapper.toUserResponseDTO(userEntity);

        // 2. Mapeamos a DTO
        return UsuarioToDto;
    }
}
