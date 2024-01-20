import prismaClient from '../../prisma'
import { ClienteRequest, ClienteRequestQuery, ClienteResponse, Coordenadas } from '../../models/Cliente';
import { buscarEnderecoPorCep, encontrarProximoCliente, geocodificarEndereco, validarEmail } from '../../utils/utils';
import RotaBaseCD from '../../enum/RotaBase';

class ClienteService {

  async criarCliente(clienteRequest: ClienteRequest) {


    if (!clienteRequest.cep) {
      throw new Error("Insira cep");
    }


    if (clienteRequest.cep.length != 8) {
      throw new Error("Insira cep válido");
    }

    const coordenadasPadrao: Coordenadas = { latitude: 0, longitude: 0 };

    const retornoCoordenadas: Coordenadas = await buscarEnderecoPorCep(clienteRequest.cep)
      .then(endereco => geocodificarEndereco(endereco))
      .then(coordenadas => {
        const { latitude, longitude } = coordenadas;
        return { latitude, longitude }
      })
      .catch(erro => {
        console.error(erro);
        return coordenadasPadrao;
      });


    if (retornoCoordenadas.latitude == 0) {
      throw new Error("Insira cep válido");
    }


    if (!clienteRequest.email) {
      throw new Error("Insira um e-mail");
    }

    if (!validarEmail(clienteRequest.email)) {
      throw new Error("Insira um e-mail válido");
    }

    const clienteExistente = await prismaClient.cliente.findFirst({
      where: {
        email: clienteRequest.email
      }
    })

    if (clienteExistente) {
      throw new Error("Esse e-mail já existe");
    }



    const coordenadaY = retornoCoordenadas.latitude != null ? parseFloat(retornoCoordenadas.latitude.toString()) : null;
    const coordenadaX = retornoCoordenadas.longitude != null ? parseFloat(retornoCoordenadas.longitude.toString()) : null;


    const cliente = await prismaClient.cliente.create({
      data: {
        nome: clienteRequest.nome,
        email: clienteRequest.email,
        telefone: clienteRequest.telefone,
        coordenada_x: coordenadaX,
        coordenada_y: coordenadaY
      },
      select: {
        nome: true,
        email: true,
        telefone: true,
        coordenada_x: true,
        coordenada_y: true
      }
    })

    return cliente
  }

  async listaClientes(clientesRequestQuery: ClienteRequestQuery) {

    if (clientesRequestQuery) {
      let query: any = {};

      if (clientesRequestQuery.nome) {
        query.nome = {
          contains: clientesRequestQuery.nome,
        };
      }

      if (clientesRequestQuery.email) {
        query.email = {
          contains: clientesRequestQuery.email,
        };
      }

      if (clientesRequestQuery.telefone) {
        query.telefone = {
          contains: clientesRequestQuery.telefone,
        };
      }

      const clientes = await prismaClient.cliente.findMany({
        where: query,
        select: {
          id: true,
          nome: true,
          email: true,
          telefone: true
        }
      });

      return clientes;

    }


    const clientes = await prismaClient.cliente.findMany({
      select: {
        id: true,
        nome: true,
        email: true,
        telefone: true
      }
    })

    return clientes;
  }


  async listaRota() {
    const clientes: ClienteResponse[] = await prismaClient.cliente.findMany({
      select: {
        id: true,
        nome: true,
        email: true,
        telefone: true,
        coordenada_x: true,
        coordenada_y: true
      }
    })


    function calcularRota(clientes: ClienteResponse[]): ClienteResponse[] {
      const RotaBase: ClienteResponse = RotaBaseCD

      let rota = [];
      let atual: ClienteResponse = RotaBase;
      let clientesRestantes = [...clientes];

      console.log(clientesRestantes)

      while (clientesRestantes.length > 0) {
        let proximo = encontrarProximoCliente(atual, clientesRestantes);
        if (proximo !== null) {
          const proximoCliente = proximo
          rota.push(proximoCliente);
          clientesRestantes = clientesRestantes.filter(cliente => cliente.id !== proximoCliente.id);
          atual = proximoCliente
        }
      }

      rota.push();

      return rota;
    }

    const listaDeClientesRota = calcularRota(clientes)



    return listaDeClientesRota;
  }
}

export { ClienteService }