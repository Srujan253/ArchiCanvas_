const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMPT_HOST,
    port: process.env.SMPT_PORT,
    secure: true,
    auth: {
      user: process.env.SMPT_USER,
      pass: process.env.SMPT_PASSWORD,
    },
  });

  const mailOptions = {
    from: "Pathfinder@gmail.com",
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    // Log the response for debugging purposes
    console.log("Email sent successfully:", info.response);
    return info;
  } catch (error) {
    // Log the error in case of failure
    console.error("Error occurred while sending email:", error);
    throw error;
  }
};

module.exports = sendEmail;
