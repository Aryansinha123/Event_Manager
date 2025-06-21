import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendEmail = async ({ to, subject, text, html }) => {
  try {
    const msg = {
      to,
      from: "eventhub.company12@gmail.com", // Verified sender email
      subject,
      text,
      html,
    };

    await sgMail.send(msg);
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error.response.body);
    throw new Error("Failed to send email");
  }
};
