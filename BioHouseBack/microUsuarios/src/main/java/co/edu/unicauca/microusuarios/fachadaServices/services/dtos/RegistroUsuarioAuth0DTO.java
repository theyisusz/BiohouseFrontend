package co.edu.unicauca.microusuarios.fachadaServices.services.dtos;

import lombok.Data;

@Data
public class RegistroUsuarioAuth0DTO {
    private String email;
    private String nombre;
    private String apellido;
    private String imagenUrl; // Para guardar la foto de Google
    private String telefono;
}
