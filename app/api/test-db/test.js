import sgMail from "@sendgrid/mail";

sgMail.setApiKey("");

const testEmail = async () => {
  try {
    await sgMail.send({
      to: "sinhaaryan173@gmail.com", // Replace with your email
      from: "eventhub.company12@gmail.com", // Must match verified email
      subject: "Test Email",
      text: "This is a test email",
    });
    console.log("Email sent successfully");
  } catch (error) {
    console.error("SendGrid Error:", error.response.body);
  }
};

testEmail();
