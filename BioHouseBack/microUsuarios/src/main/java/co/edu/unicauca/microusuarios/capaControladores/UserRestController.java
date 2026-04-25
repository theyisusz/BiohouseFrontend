package co.edu.unicauca.microusuarios.capaControladores;

import co.edu.unicauca.microusuarios.fachadaServices.services.UserService;
import co.edu.unicauca.microusuarios.fachadaServices.services.dtos.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/usuarios")
@RequiredArgsConstructor
public class UserRestController {

    private final UserService userService;

    // ---------------------------
    //  SINCRONIZACIÓN (LOGIN / REGISTRO CON AUTH0)
    // ---------------------------
    @PostMapping("/sincronizar")
    public ResponseEntity<UserResponseDTO> sincronizar(
            @RequestBody RegistroUsuarioAuth0DTO dto,
            @AuthenticationPrincipal Jwt jwt) {

        //  ID único de Auth0 (CRÍTICO)
        String auth0Id = jwt.getSubject();

        // Roles desde el token (custom claim)
        List<String> rolesAuth0 = jwt.getClaimAsStringList("https://BioHouse.com/roles");

        if (rolesAuth0 == null) {
            rolesAuth0 = List.of();
        }

        UserResponseDTO response =
                userService.sincronizarUsuario(dto, auth0Id, rolesAuth0);

        return ResponseEntity.ok(response);
    }

    // ---------------------------
    //  REGISTRAR ASESOR (ADMIN)
    // ---------------------------
    @PostMapping("/registro-asesor")
    public ResponseEntity<AsesorResponseDTO> registrarAsesor(
            @RequestBody RegistroAsesorDTO dto) {

        AsesorResponseDTO response = userService.registrarAsesor(dto);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // ---------------------------
    //  OBTENER USUARIO POR ID
    // ---------------------------
    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDTO> getUserById(@PathVariable Long id) {

        UserResponseDTO response = userService.getUserById(id);

        return ResponseEntity.ok(response);
    }

    // ---------------------------
    //  DESACTIVAR USUARIO
    // ---------------------------
    @PatchMapping("/{id}/desactivar")
    public ResponseEntity<Void> desactivar(@PathVariable Long id) {

        userService.desactivarUsuario(id);

        return ResponseEntity.noContent().build();
    }

    // ---------------------------
    // LISTAR ASESORES
    // ---------------------------
    @GetMapping("/asesores")
    public ResponseEntity<List<UserResponseDTO>> listarAsesores() {

        List<UserResponseDTO> asesores = userService.listarAsesor();

        return ResponseEntity.ok(asesores);
    }

    // ---------------------------
    //  LISTAR CLIENTES
    // ---------------------------
    @GetMapping("/clientes")
    public ResponseEntity<List<UserResponseDTO>> listarClientes() {

        List<UserResponseDTO> clientes = userService.listarClientes();

        return ResponseEntity.ok(clientes);
    }

    // ---------------------------
    // BUSCAR POR EMAIL
    // ---------------------------
    @GetMapping("/buscar")
    public ResponseEntity<UserResponseDTO> getUserByEmail(
            @RequestParam String email) {

        UserResponseDTO response = userService.findByEmail(email);

        return ResponseEntity.ok(response);
    }
}