import { ClienteResponse } from '../models/Cliente';

export function validarEmail(email: string): boolean {
  return email.includes('@');
}

export async function buscarEnderecoPorCep(cep: string) {
  const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
  const endereco = await response.json();
  return `${endereco.logradouro}, ${endereco.localidade}, ${endereco.uf}`;
}

export async function geocodificarEndereco(endereco: string) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(endereco)}`;
  const response = await fetch(url);
  const dados = await response.json();
  if (dados.length > 0) {
    return {
      latitude: dados[0].lat,
      longitude: dados[0].lon
    };
  } else {
    throw new Error("Endereço não encontrado.");
  }
}


 function calcularDistancia(a: ClienteResponse, b: ClienteResponse): number {
  const ax = +(a.coordenada_x ?? 0);
  const ay = +(a.coordenada_y ?? 0);
  const bx = +(b.coordenada_x ?? 0);
  const by = +(b.coordenada_y ?? 0);

  return Math.sqrt(Math.pow(ax - bx, 2) + Math.pow(ay - by, 2));
}




export function encontrarProximoCliente(atual: ClienteResponse, clientes: ClienteResponse[]): ClienteResponse | null {
  let proximo = null;
  let menorDistancia = Number.MAX_VALUE;

  clientes.forEach(cliente => {
    if (cliente.id !== atual.id) {
      const distancia = calcularDistancia(atual, cliente);
      if (distancia < menorDistancia) {
        menorDistancia = distancia;
        proximo = cliente;
      }
    }
  });
  return proximo;
}