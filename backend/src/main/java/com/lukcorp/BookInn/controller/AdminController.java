package com.lukcorp.BookInn.controller;

import com.lukcorp.BookInn.dto.UserDTO;
import com.lukcorp.BookInn.entity.User;
import com.lukcorp.BookInn.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

    @Autowired
    private IUserService userService;

    @PutMapping("/change-role/{id}")
    public ResponseEntity<String> changeRole(@PathVariable Long id, @PathVariable String role) {
        User user = userService.findById(id).orElse(null);
        if (user == null) {
            return ResponseEntity.badRequest().body("Usuario no encontrado.");
        }
        if (!role.equals("admin") && !role.equals("user")) {
            return ResponseEntity.badRequest().body("Rol inválido.");
        }
        user.setRole(role);
        userService.save(user);
        return ResponseEntity.ok("Se actualizó el rol del usuario: " + user.getUsername());
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users); // Devuelve la lista de usuarios
    }
}