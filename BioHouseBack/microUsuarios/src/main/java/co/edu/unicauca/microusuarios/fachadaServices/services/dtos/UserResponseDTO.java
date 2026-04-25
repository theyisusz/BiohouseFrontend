package co.edu.unicauca.microusuarios.fachadaServices.services.dtos;

import co.edu.unicauca.microusuarios.capaAccesoADatos.modelos.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserResponseDTO {
    Long id;
    String auth0Id;
    String email;
    String nombre;
    String apellido;
    String telefono;
    String imagenUrl;
    Role role;
    LocalDateTime fechaRegistro;
    LocalDateTime ultimaSesion;
}