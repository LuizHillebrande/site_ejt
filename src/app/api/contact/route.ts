import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'empresajrtoledo@gmail.com',
        pass: process.env.EMAIL_PASSWORD
      }
    });

    const emailTemplate = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #FF6B00;">Nova mensagem do site EJT</h2>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensagem:</strong></p>
        <p style="background-color: #f5f5f5; padding: 15px; border-radius: 5px;">${message}</p>
        <div style="margin-top: 20px;">
          <a href="mailto:${email}" style="background-color: #FF6B00; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Responder</a>
        </div>
      </div>
    `;

    const mailOptions = {
      from: 'empresajrtoledo@gmail.com',
      to: 'empresajrtoledo@gmail.com',
      subject: `Contato via Site - ${name}`,
      html: emailTemplate
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Email enviado com sucesso!' });
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    return NextResponse.json({ error: 'Erro ao enviar email' }, { status: 500 });
  }
} 