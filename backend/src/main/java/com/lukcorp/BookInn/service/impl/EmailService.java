package com.lukcorp.BookInn.service.impl;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;


@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendConfirmationEmail(String to, String username) {
        String subject = "Bienvenido a BookInn 🎉";
        String content = """
                <h1>Hola, %s!</h1>
                <p>Tu registro ha sido exitoso. Estos son tus datos:</p>
                <ul>
                    <li><strong>Usuario:</strong> %s</li>
                    <li><strong>Email:</strong> %s</li>
                </ul>
                <p>Puedes iniciar sesión aquí:</p>
                <a href="http://localhost:5173/login" style="padding: 10px; background-color: #28a745; color: white; text-decoration: none;">Iniciar Sesión</a>
                """.formatted(username, username, to);

        sendEmail(to, subject, content);
    }

    private void sendEmail(String to, String subject, String content) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(content, true);
            mailSender.send(message);
        } catch (MessagingException e) {
            throw new RuntimeException("Error al enviar el correo de confirmación", e);
        }
    }
}