export interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
  rol: RolEnum;
  fechaRegistro: string;
  ultimaSesion: string;
  estado: EstadoUsuarioEnum;
}

export enum RolEnum {
  CLIENTE          = 'CLIENTE',
  ADMINISTRADOR    = 'ADMINISTRADOR',
  ASESOR_COMERCIAL = 'ASESOR_COMERCIAL',
  INVITADO         = 'INVITADO'
}

export enum EstadoUsuarioEnum {
  ACTIVO    = 'Activo',
  INACTIVO  = 'Inactivo',
  BLOQUEADO = 'Bloqueado'
}