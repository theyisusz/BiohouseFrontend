export interface Usuario {
  id: number;
  auth0Id: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  imagenUrl?: string;
  role: RolEnum;
  fechaRegistro: string;
  ultimaSesion: string;
  estado: boolean;
}

export enum RolEnum {
  ADMIN   = 'ADMIN',
  ASESOR  = 'ASESOR',
  CLIENTE = 'CLIENTE',
}
