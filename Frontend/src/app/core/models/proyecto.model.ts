export interface Proyecto {
  id: number;
  nombre: string;
  usuarioId: number;
  ancho: number;
  largo: number;
  numeroPisos: number;
  puertas: number;
  ventanas: number;
  area: number;
  fecha: string;
  estado: EstadoProyectoEnum;
}

export enum EstadoProyectoEnum {
  PENDIENTE  = 'Pendiente',
  EN_PROCESO = 'En proceso',
  COMPLETADO = 'Completado',
  BORRADOR   = 'Borrador'
}