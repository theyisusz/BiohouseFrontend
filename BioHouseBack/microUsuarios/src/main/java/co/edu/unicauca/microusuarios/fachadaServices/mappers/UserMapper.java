package co.edu.unicauca.microusuarios.fachadaServices.mappers;

import co.edu.unicauca.microusuarios.capaAccesoADatos.modelos.User;
import co.edu.unicauca.microusuarios.fachadaServices.services.dtos.UserResponseDTO;
import co.edu.unicauca.microusuarios.fachadaServices.services.dtos.AsesorResponseDTO;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public UserResponseDTO toUserResponseDTO(User u) {
        return new UserResponseDTO(
                u.getId(),
                u.getAuth0Id(),
                u.getEmail(),
                u.getNombre(),
                u.getApellido(),
                u.getTelefono(),
                u.getImagenUrl(),
                u.getRole(),
                u.getFechaRegistro(),
                u.getUltimaSesion()
        );
    }

    public AsesorResponseDTO toAsesorResponseDTO(User u) {
        return new AsesorResponseDTO(
                u.getId(),
                u.getNombre(),
                u.getApellido(),
                u.getEmail(),
                u.getTelefono(),
                u.getEstado()
        );
    }
}