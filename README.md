# SwasthyaRaksha

[![Website](https://img.shields.io/badge/Website-Live-brightgreen)](https://swasthyaraksha.onrender.com)
[![App](https://img.shields.io/badge/App-GitHub-blue)](https://github.com/your-repo-link)

## Project Description

In today's fast-paced world, efficient and secure management of health data is a significant challenge for both patients and healthcare providers. Traditional methods of storing medical records on paper or disparate digital systems lead to issues such as data fragmentation, lack of real-time access, and potential data loss. Patients often face difficulties in keeping track of their medical history, sharing essential health information with multiple doctors, and remembering upcoming appointments. Similarly, doctors struggle with accessing comprehensive patient histories during emergencies and managing patient data seamlessly.

**SwasthyaRaksha** addresses these critical challenges by providing an integrated Health Data Management Platform that ensures efficient, secure, and user-friendly management of health records for both patients and healthcare providers.

## Key Problems Solved by SwasthyaRaksha

- **Fragmented Medical Records:**
  - **Solution:** SwasthyaRaksha offers a centralized platform for storing and managing all medical data, eliminating the issues of fragmented and scattered records.

- **Emergency Situations:**
  - **Solution:** The Emergency Search feature enables doctors to quickly access a patient’s health card, which includes vital health issues and emergency contacts, facilitating timely and informed medical intervention.

- **Missed Appointments:**
  - **Solution:** The platform sends email reminders with all necessary details about scheduled appointments, reducing the chances of missed appointments and ensuring better patient compliance.

- **Data Sharing and Access Control:**
  - **Solution:** Users can easily share their medical data with healthcare providers, view access permissions, and revoke them anytime, ensuring complete control over their health information.

- **Real-Time Monitoring and Security:**
  - **Solution:** SwasthyaRaksha keeps a real-time log of who viewed the user's profile, providing transparency and enhancing the security of sensitive health data.

By leveraging modern technologies like React.js, React-Native, Tailwind.css, Node.js, Express.js, and MongoDB, SwasthyaRaksha delivers a robust and scalable solution to the critical problem of health data management, enhancing the efficiency and effectiveness of healthcare delivery for both patients and providers.

## Features

- **User Management:** Sign up and login functionality for users.
- **Profile Management:** Create and maintain personal health profiles.
- **Prescription Management:** Add, update, and delete prescriptions.
- **Lab Report Management:** Add and delete lab reports.
- **Appointment Reminder:** Set reminders for appointments via email.
- **Access Control:** Allow users to grant access to their health data to others.
- **Search Functionality:** Search for users by username.
- **Secure Authentication:** Authentication and authorization mechanisms to ensure data security.

## Technologies Used

- **Frontend:** React.js, Material UI
- **Backend:** Node.js with Express.js
- **Database:** MongoDB
- **Other Tools:** NodeMailer to send mail reminders of the appointment, bcrypt.js to encrypt the data, etc.

## API Endpoints

### User Routes

- **GET /api/user:** Get all users.
- **POST /api/user/signup:** Sign up a new user.
- **POST /api/user/login:** Login an existing user.
- **GET /api/user/searchUser:** Search for users by username.
- **POST /api/user/addAccess/:userId:** Grant access to user's health data.
- **PUT /api/user/removeAccess/:userId:** Remove access to user's health data.
- **GET /api/user/getAccessUsersInfo:** Fetch details of users with access.
- **GET /api/user/getAccessForData:** Fetch access granted for user's data.

### Health Profile Routes

- **GET /api/healthprofiles/:userId:** Get health profile by user ID.
- **POST /api/healthprofiles/create:** Create a new health profile.

### Prescription Routes

- **GET /api/prescription/:id:** Get all prescriptions for a user.
- **POST /api/prescription/add:** Add a new prescription.
- **PUT /api/prescription/update/:id:** Update a prescription.
- **GET /api/prescription/user/:id:** Get prescriptions by user ID.
- **DELETE /api/prescription/delete/:id:** Delete a prescription.

### Lab Report Routes

- **GET /api/labR/:id:** Get all lab reports for a user.
- **POST /api/labR/add:** Add a new lab report.
- **DELETE /api/labR/deleteLabR/:id:** Delete a lab report.

### Appointment Reminder Routes

- **POST /api/appoinmentreminder/setReminderMail:** Set an appointment reminder via email.

## Usage

1. **Sign Up or Log In:** After installing the application, sign up or log in to your account.
2. **Manage Health Data:** Navigate through the different sections to manage your health data, including health profiles, prescriptions, lab reports, and appointment reminders.
3. **Search Functionality:** Utilize the search functionality to find other users by username.
4. **Grant Access:** Grant access to your health data to trusted individuals if needed.
5. **Set Appointment Reminders:** Set appointment reminders for important events.

## Contributors

- [Himanshu Golani](https://github.com/HimanshuGolani)
