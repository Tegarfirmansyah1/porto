
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { name, email, message } = await request.json();

    // Kirim email menggunakan Resend
    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact Form <onboarding@resend.dev>', 
      to: ['tegarf881@gmail.com'], 
      subject: `Pesan Baru dari Portofolio - ${name}`,
      reply_to: email, 
      html: `
        <h1>Pesan dari Formulir Kontak</h1>
        <p><strong>Nama:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Pesan:</strong></p>
        <p>${message}</p>
      `,
    });


    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }


    return NextResponse.json({ message: 'Email sent successfully!', data });

  } catch (error) {

    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}