import { Router  } from 'express';
import { ClienteController } from '../controllers/cliente/ClienteController';

const router = Router();


router.get('/clientes', new ClienteController().listaClientes)

router.get('/clientesRota', new ClienteController().listaRota)

router.post('/clientes', new ClienteController().criarCliente)


export { router };