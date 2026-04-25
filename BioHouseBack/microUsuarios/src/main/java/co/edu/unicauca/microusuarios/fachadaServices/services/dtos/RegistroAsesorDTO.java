package co.edu.unicauca.microusuarios.fachadaServices.services.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegistroAsesorDTO {
    String nombre;
    String apellido;
    String email;
    String telefono;
    String imagenUrl;
}
