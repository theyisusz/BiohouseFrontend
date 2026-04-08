export interface LoginRequest {
  correo: string;
  password: string;
}

export interface RegisterRequest {
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  usuario: {
    id: number;
    nombre: string;
    apellido: string;
    correo: string;
    rol: string;
  };
}