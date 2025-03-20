package com.lukcorp.BookInn.controller;

import com.lukcorp.BookInn.dto.UserDTO;
import com.lukcorp.BookInn.entity.User;
import com.lukcorp.BookInn.service.IUserService;
import com.lukcorp.BookInn.service.impl.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {
    @Autowired
    private IUserService userService;

    @Autowired
    private EmailService emailService;

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody UserDTO userDTO) {
        boolean isRegistered = userService.registerUser(userDTO);

        if (!isRegistered) {
            return ResponseEntity.badRequest().body("El usuario ya existe.");
        }

        return ResponseEntity.ok("Usuario registrado exitosamente.");
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody UserDTO userDTO) {
        // Intentamos autenticar al usuario
        Optional<User> user = userService.authenticateUser(userDTO.getEmail(), userDTO.getPassword());

        if (user.isPresent()) {
            return ResponseEntity.ok(user.get()); // Si el usuario existe, devolver el usuario
        } else {
            return ResponseEntity.status(401).body("Credenciales incorrectas");
        }
    }

    @PostMapping("/resend-confirmation")
    public ResponseEntity<String> resendConfirmationEmail(@RequestParam String email) {
        Optional<User> user = userService.findByEmail(email);
        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario no encontrado");
        }

        emailService.sendConfirmationEmail(user.get().getEmail(), user.get().getUsername());
        return ResponseEntity.ok("Correo de confirmación reenviado con éxito.");
    }
}
