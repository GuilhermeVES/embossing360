import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { nome, email } = req.body;

  if (!nome || !email) {
    return res.status(400).json({ error: "Nome e email são obrigatórios." });
  }

  // 🔐 Configuração do Gmail
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "controledechapinhas@gmail.com",
      pass: "ucfs nfio ndmf divg" // sua senha de app do Gmail
    }
  });

  try {
    await transporter.sendMail({
      from: "Valmet Embossing 360 <controledechapinhas@gmail.com>",
      to: "guilherme.faria@valmet.com",
      subject: "Bem-vindo ao Embossing 360",
      html: `
        <h2>Olá, ${nome}!</h2>
        <p>Seu cadastro foi realizado com sucesso no sistema <strong>Valmet Embossing 360</strong>.</p>
        <p>Agradecemos sua confiança.</p>
        <br>
        <p>Em breve você receberá novidades e atualizações.</p>
        <br><br>
        <p><strong>Valmet Embossing 360</strong></p>
      `
    });

    return res.status(200).json({ success: true });

  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
    return res.status(500).json({ error: "Erro ao enviar e-mail." });
  }
}
