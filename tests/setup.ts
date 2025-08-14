import { TextEncoder, TextDecoder } from 'util';
import { fetch, Headers, Request, Response } from 'cross-fetch';
import { config } from './config';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder as any;
global.fetch = fetch;
global.Headers = Headers;
global.Request = Request;
global.Response = Response;

// Função para esperar o servidor estar pronto
async function waitForServer(timeout = 30000, interval = 1000): Promise<void> {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    try {
      const response = await fetch(config.baseUrl);
      if (response.ok) {
        console.log('Server is ready!');
        return;
      }
    } catch (error) {
      // Ignora erros e continua tentando
    }
    await new Promise(resolve => setTimeout(resolve, interval));
  }
  throw new Error('Server did not become ready in time');
}

// Espera o servidor estar pronto antes de rodar os testes
beforeAll(async () => {
  await waitForServer();
}); 