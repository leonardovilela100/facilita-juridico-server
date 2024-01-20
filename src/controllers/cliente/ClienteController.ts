import { Request, Response } from 'express';
import { ClienteService } from '../../services/cliente/ClienteService';
import { ClienteRequest, ClienteRequestQuery } from '../../models/Cliente';

class ClienteController {

  async criarCliente(req: Request, res: Response) {
    const clientesRequest: ClienteRequest = req.body

    const clienteService = new ClienteService();

    const cliente = await clienteService.criarCliente(clientesRequest);

    return res.json(cliente)
  }

  async listaClientes(req: Request, res: Response) {

    const clientesRequestQuery: ClienteRequestQuery = req.query

    const clienteService = new ClienteService();

    const clientes = await clienteService.listaClientes(clientesRequestQuery);

    return res.json(clientes);
  }

  async listaRota(req: Request, res: Response) {
    const clienteService = new ClienteService();

    const listaRota = await clienteService.listaRota();

    return res.json(listaRota)

  }
}

export { ClienteController }