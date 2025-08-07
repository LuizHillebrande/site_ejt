import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Configuração do transporter do nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.SENHA_USER
  }
});

// Template HTML para o e-mail
const getEmailTemplate = (data: any) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: linear-gradient(135deg, #ff6b6b 0%, #ff8e53 100%);
      color: white;
      padding: 20px;
      border-radius: 8px 8px 0 0;
      text-align: center;
    }
    .content {
      background: #fff;
      padding: 20px;
      border-radius: 0 0 8px 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .field {
      margin-bottom: 15px;
    }
    .label {
      font-weight: bold;
      color: #666;
    }
    .value {
      color: #333;
    }
    .button {
      display: inline-block;
      padding: 10px 20px;
      background-color: #ff6b6b;
      color: white;
      text-decoration: none;
      border-radius: 5px;
      margin-top: 20px;
    }
    .footer {
      text-align: center;
      margin-top: 20px;
      color: #666;
      font-size: 0.9em;
    }
  </style>
</head>
<body>
  <div class="header">
    <h2>Nova Mensagem Recebida</h2>
  </div>
  <div class="content">
    <div class="field">
      <div class="label">Nome:</div>
      <div class="value">${data.name}</div>
    </div>
    <div class="field">
      <div class="label">E-mail:</div>
      <div class="value">${data.email}</div>
    </div>
    <div class="field">
      <div class="label">Assunto:</div>
      <div class="value">${data.subject}</div>
    </div>
    <div class="field">
      <div class="label">Mensagem:</div>
      <div class="value">${data.message}</div>
    </div>
    
    <a href="mailto:${process.env.EMAIL_USER}?subject=Re: ${encodeURIComponent(data.subject)}&body=Olá ${data.name},%0D%0A%0D%0AVi sua mensagem..." 
       class="button">
      Responder
    </a>
  </div>
  <div class="footer">
    <p>Esta mensagem foi enviada através do formulário de contato do site.</p>
  </div>
</body>
</html>
`;

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Validação básica
    if (!data.name || !data.email || !data.subject || !data.message) {
      return NextResponse.json(
        { error: 'Todos os campos são obrigatórios' },
        { status: 400 }
      );
    }

    // Configuração do e-mail
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `Contato via Site: ${data.subject}`,
      html: getEmailTemplate(data)
    };

    // Envia o e-mail
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Erro ao enviar mensagem' },
      { status: 500 }
    );
  }
} 