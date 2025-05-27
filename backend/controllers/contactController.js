
const nodemailer=require('nodemailer');
require('dotenv').config();

exports.contactEmail= async(req,res)=>{
const {name,email,message}=req.body;

if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please fill all fields' });
}

try {
    // Create transporter (use your SMTP details here)
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,       // your email address
        pass: process.env.EMAIL_PASS,       // your email app password
      },
    });

    // Setup email data
    let mailOptions = {
      from: `"${name}" <${email}>`,
      to: process.env.EMAIL_USER,
      subject: 'New Contact Form Message',
      text: message,
      html: `<p>${message}</p><p>From: ${name} - ${email}</p>`,
    };

    // Send mail
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to send message' });
  }
};



