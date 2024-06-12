import express from "express";
import { sendMail } from "../controllers/MailSendController.js";

const MailRouter = express.Router();

MailRouter.post("/setReminderMail", sendMail);

export default MailRouter;
