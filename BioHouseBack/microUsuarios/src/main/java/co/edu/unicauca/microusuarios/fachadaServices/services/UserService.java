package co.edu.unicauca.microusuarios.fachadaServices.services;

import co.edu.unicauca.microusuarios.fachadaServices.services.dtos.AsesorResponseDTO;
import co.edu.unicauca.microusuarios.fachadaServices.services.dtos.RegistroAsesorDTO;
import co.edu.unicauca.microusuarios.fachadaServices.services.dtos.RegistroUsuarioAuth0DTO;
import co.edu.unicauca.microusuarios.fachadaServices.services.dtos.UserResponseDTO;

import java.util.List;

public interface UserService {
    public UserResponseDTO sincronizarUsuario(RegistroUsuarioAuth0DTO dto, String auth0Id, List<String> rolesAuth0);
    public AsesorResponseDTO registrarAsesor(RegistroAsesorDTO dto);
    public UserResponseDTO getUserById(Long id);
    public void desactivarUsuario(Long id);
    public List<UserResponseDTO> listarAsesor();
    public List<UserResponseDTO> listarClientes();
    public UserResponseDTO findByEmail(String email);
}
