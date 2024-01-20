import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors';
import cros from 'cors';

import { router } from './routes/Cliente.routes';

// Rodar o projeto: npm run dev
const app = express();
app.use(express.json())
app.use(cros())

app.use(router)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    return res.status(400).json({
      error: err.message
    })
  }
  return res.status(500).json({
    status: 'error',
    message: 'Internal server error.'
  })
})

app.listen(3333, () => console.log(`Servidor Online! - acesse: http://localhost:3333/clientes`))
