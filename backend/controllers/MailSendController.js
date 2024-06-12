import nodemailer from "nodemailer";
import schedule from "node-schedule";

// Create a transporter using Ethereal email service for testing purposes
const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "your_ethereal_username",
    pass: "your_ethereal_password",
  },
});

export const sendMail = async (req, res) => {
  const { email, hospitalName, doctorName, reasonForVisit, appointmentDate } =
    req.body;
  try {
    // Schedule the email to be sent at the appointment date and time
    const scheduledDate = new Date(appointmentDate + "T08:00:00");
    schedule.scheduleJob(scheduledDate, async () => {
      try {
        let info = await transporter.sendMail({
          from: '"HEalthTracker_Reminder" <maddison53@ethereal.email>',
          to: email,
          subject: `Appointment Reminder: ${hospitalName} with Dr. ${doctorName}`,
          text: `You have an appointment at ${hospitalName} with Dr. ${doctorName} for ${reasonForVisit} on ${appointmentDate}.`,
          html: `<p>You have an appointment at ${hospitalName} with Dr. ${doctorName} for ${reasonForVisit} on ${appointmentDate}.</p>`,
        });

        console.log("Message sent: %s", info.messageId);
      } catch (error) {
        console.error("Error occurred while sending email:", error);
      }
    });

    res.status(200).json({ message: "Reminder scheduled successfully!" });
  } catch (error) {
    console.error("Error occurred while scheduling reminder:", error);
    res
      .status(500)
      .json({ error: "An error occurred while scheduling the reminder." });
  }
};
