export interface ClienteRequest {
  id?: number;
  nome: string;
  email: string;
  telefone: string;
  cep?: string;
  coordenada_x?: number
  coordenada_y?: number
}

export interface ClienteResponse {
  id?: number;
  nome?: string;
  email?: string;
  telefone?: string;
  cep?: string;
  coordenada_x?: Number | null;
  coordenada_y?: Number | null;
}


export interface ClienteRequestQuery {
  nome?: string;
  email?: string;
  telefone?: string;
}

export interface Coordenadas {
  latitude?: string | number,
  longitude?: string | number,
}