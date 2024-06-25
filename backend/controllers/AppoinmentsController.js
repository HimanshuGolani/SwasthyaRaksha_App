import User from '../model/User.js';
import Appointments from '../model/Appointments.js';
import nodemailer from 'nodemailer';
import schedule from 'node-schedule';

// Create a transporter using Ethereal email service for testing purposes
const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: 'floyd37@ethereal.email',
    pass: '6nKwpQTvue4fBRcKhz',
  },
});

// Function to send email reminder
const sendAppointmentReminder = async (
  email,
  hospitalName,
  doctorName,
  reasonForVisit,
  appointmentDate,
) => {
  try {
    const scheduledDate = new Date(appointmentDate + 'T08:00:00');
    schedule.scheduleJob(scheduledDate, async () => {
      try {
        let info = await transporter.sendMail({
          from: '"HealthTracker_Reminder" <maddison53@ethereal.email>',
          to: email,
          subject: `Appointment Reminder: ${hospitalName} with Dr. ${doctorName}`,
          text: `You have an appointment at ${hospitalName} with Dr. ${doctorName} for ${reasonForVisit} on ${appointmentDate}.`,
          html: `<p>You have an appointment at ${hospitalName} with Dr. ${doctorName} for ${reasonForVisit} on ${appointmentDate}.</p>`,
        });

        console.log('Message sent: %s', info.messageId);
      } catch (error) {
        console.error('Error occurred while sending email:', error);
      }
    });
  } catch (error) {
    console.error('Error occurred while scheduling reminder:', error);
  }
};

export const createAppointments = async (req, res) => {
  const {email, hospitalName, doctorName, reasonForVisit, appointmentDate} =
    req.body;

  try {
    const user = await User.findOne({email});
    // If the user is not present
    if (!user) {
      return res.status(404).send({
        message: 'User not found.',
        success: false,
      });
    }

    // Create the appointment
    const newAppointment = await Appointments.create({
      email,
      hospitalName,
      doctorName,
      reasonForVisit,
      appointmentDate,
    });

    // Update the user's appointments
    user.Appointments.push(newAppointment._id);
    await user.save();

    // Schedule the email reminder
    await sendAppointmentReminder(
      email,
      hospitalName,
      doctorName,
      reasonForVisit,
      appointmentDate,
    );

    res.status(200).send({
      message: 'Appointment created and reminder scheduled successfully.',
      appointment: newAppointment,
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(400).send({
      message: error.message,
      success: false,
    });
  }
};

export const getAppointments = async (req, res) => {
  const {id} = req.params;
  console.log(id);

  try {
    const user = await User.findById(id).populate('Appointments');
    console.log(user);
    // If the user does not exist
    if (!user) {
      return res.status(404).send({
        message: 'User not found',
        success: false,
      });
    }

    // const currDate = new Date();
    // const appointments = user.Appointments;
    // const upcomingAppointments = appointments.filter(
    //   appointment => new Date(appointment.appointmentDate) >= currDate,
    // );

    res.send({
      Appointments: user.Appointments,
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: 'An error occurred while retrieving appointments.',
      success: false,
    });
  }
};
