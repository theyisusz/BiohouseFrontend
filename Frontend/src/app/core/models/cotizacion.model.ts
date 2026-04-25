export interface Cotizacion {
  id: number;
  estructuraId: number;
  usuarioId: number;
  totalMateriales: number;
  costoTotal: number;
  fecha: string;
  estado: EstadoCotizacionEnum;
}

export enum EstadoCotizacionEnum {
  PENDIENTE      = 'Pendiente',
  EN_CONTACTO    = 'En contacto',
  EN_NEGOCIACION = 'En negociación',
  CERRADO        = 'Cerrado',
  RECHAZADO      = 'Rechazado'
}