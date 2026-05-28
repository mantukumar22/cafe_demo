import { Router } from "express";
import { SubmitContactBody } from "@workspace/api-zod";
import { logger } from "../lib/logger";

const router = Router();

router.post("/contact", async (req, res) => {
  const parse = SubmitContactBody.safeParse(req.body);

  if (!parse.success) {
    res.status(400).json({ error: "Invalid request body" });
    return;
  }

  const { name, email, message } = parse.data;

  req.log.info({ name, email }, "Contact form submission received");

  const emailUser = process.env["EMAIL_USER"];
  const emailPass = process.env["EMAIL_PASS"];
  const receiverEmail = process.env["RECEIVER_EMAIL"] ?? emailUser;

  if (emailUser && emailPass) {
    try {
      const nodemailer = await import("nodemailer");
      const transporter = nodemailer.default.createTransport({
        service: "gmail",
        auth: {
          user: emailUser,
          pass: emailPass,
        },
      });

      await transporter.sendMail({
        from: `"${name}" <${emailUser}>`,
        to: receiverEmail,
        replyTo: email,
        subject: `New contact from ${name} via Brewed Bliss Café`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <h3>Message:</h3>
          <p>${message.replace(/\n/g, "<br>")}</p>
        `,
      });

      logger.info({ name, email }, "Contact email sent successfully");
    } catch (err) {
      logger.error({ err }, "Failed to send contact email");
      res.status(500).json({ error: "Failed to send message. Please try again." });
      return;
    }
  } else {
    logger.info(
      { name, email },
      "Email not configured — contact form received but not delivered"
    );
  }

  res.json({
    success: true,
    message: "Thank you for your message! We'll be in touch soon.",
  });
});

export default router;
