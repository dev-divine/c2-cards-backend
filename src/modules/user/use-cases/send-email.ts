import sgMail from '@sendgrid/mail'

import { env } from '@infra/env'

interface Input {
  name: string
  email: string
  code: string
}

export async function sendMail({ name, email, code }: Input) {
  try {
    sgMail.setApiKey(env.SENDGRID_API_KEY)

    const msg = {
      to: email,
      from: 'gerenciamentoesporte@gmail.com',
      subject: 'Código de recuperação de senha - Secretaria de esportes',
      html: `<!DOCTYPE html><html><head><title>Recuperação de Senha</title><style>body {font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;} .container {max-width: 600px; margin: 20px auto; padding: 20px; background-color: #ffffff; border: 1px solid #ddd; border-radius: 5px; box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);} .header {background-color: #007bff; color: #ffffff; padding: 10px; text-align: center; border-radius: 5px 5px 0 0;} .content {padding: 20px; text-align: center;} .footer {margin-top: 20px; text-align: center; font-size: 12px; color: #888;} .button {display: inline-block; background-color: #007bff; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-top: 20px;}</style></head><body><div class="container"><div class="header"><h2>Recuperação de Senha</h2></div><div class="content"><p>Olá, ${name}!</p><p>Você solicitou a recuperação de sua senha na Secretaria de Esportes. Use o código abaixo para prosseguir com a redefinição:</p><p><strong>Código:</strong> ${code}</p><a href="http://example.com/reset-password?code=${code}" class="button">Redefinir Senha</a><p>Se você não solicitou a recuperação de senha, por favor ignore este e-mail.</p></div><div class="footer">Secretaria de Esportes<br>Não responda a este e-mail. Esta é uma mensagem automática.</div></div></body></html>`,
    }

    await sgMail.send(msg)
    console.log('E-mail enviado com sucesso!')
  } catch (error) {
    console.error(error)
  }
}
