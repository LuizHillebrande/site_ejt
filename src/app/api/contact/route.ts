import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Função para sanitizar input
function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '') // Remove tags HTML
    .replace(/javascript:/gi, '') // Remove javascript:
    .replace(/on\w+=/gi, '') // Remove event handlers
    .replace(/data:/gi, '') // Remove data: URLs
    .trim();
}

// Função para validar email
function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

export async function POST(request: Request) {
  try {
    // Validar Content-Type
    const contentType = request.headers.get('content-type');
    if (!contentType?.includes('application/json')) {
      return NextResponse.json(
        { error: 'Content-Type deve ser application/json' },
        { status: 400 }
      );
    }

    let body;
    try {
      body = await request.json();
    } catch (e) {
      return NextResponse.json(
        { error: 'JSON inválido' },
        { status: 400 }
      );
    }

    const { name, email, message } = body;

    // Validação básica
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Todos os campos são obrigatórios' },
        { status: 400 }
      );
    }

    // Validar tamanho dos campos
    if (name.length > 100 || message.length > 1000) {
      return NextResponse.json(
        { error: 'Campos excedem o tamanho máximo permitido' },
        { status: 400 }
      );
    }

    // Validar email
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      );
    }

    // Sanitizar inputs
    const sanitizedName = sanitizeInput(name);
    const sanitizedMessage = sanitizeInput(message);

    // Verificar se os dados foram alterados pela sanitização
    if (sanitizedName !== name || sanitizedMessage !== message) {
      return NextResponse.json(
        { error: 'Dados contêm caracteres não permitidos' },
        { status: 400 }
      );
    }

    // Verificar se as credenciais do email estão configuradas
    if (!process.env.SENHA_USER) {
      console.error('Credenciais de email não configuradas');
      return NextResponse.json(
        { error: 'Erro na configuração do servidor' },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'empresajrtoledo@gmail.com',
        pass: process.env.SENHA_USER
      }
    });

    const emailTemplate = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #FF6B00;">Nova mensagem do site EJT</h2>
        <p><strong>Nome:</strong> ${sanitizedName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensagem:</strong></p>
        <p style="background-color: #f5f5f5; padding: 15px; border-radius: 5px;">${sanitizedMessage}</p>
        <div style="margin-top: 20px;">
          <a href="mailto:${email}" style="background-color: #FF6B00; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Responder</a>
        </div>
      </div>
    `;

    const mailOptions = {
      from: 'empresajrtoledo@gmail.com',
      to: 'empresajrtoledo@gmail.com',
      subject: `Contato via Site - ${sanitizedName}`,
      html: emailTemplate
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Erro ao enviar email:', error);
      return NextResponse.json(
        { error: 'Erro ao enviar email. Por favor, tente novamente mais tarde.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: 'Email enviado com sucesso!' });
  } catch (error) {
    console.error('Erro inesperado:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
} 