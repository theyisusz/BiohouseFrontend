package co.edu.unicauca.microusuarios.fachadaServices.services.dtos;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AsesorResponseDTO {
    Long id;
    String nombre;
    String apellido;
    String email;
    String telefono;
    Boolean estado;
}
