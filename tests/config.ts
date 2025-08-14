interface Config {
  baseUrl: string;
}

export const config: Config = {
  baseUrl: process.env.NODE_ENV === 'production' 
    ? 'https://www.empresajuniortoledo.com.br'
    : 'http://localhost:3000'
}; 