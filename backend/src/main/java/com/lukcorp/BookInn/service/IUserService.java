package com.lukcorp.BookInn.service;

import com.lukcorp.BookInn.dto.UserDTO;
import com.lukcorp.BookInn.entity.User;

import java.util.List;
import java.util.Optional;

public interface IUserService {
    boolean registerUser(UserDTO userDTO);
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
    Optional<User> authenticateUser(String email, String password);
    User save(User user);
    Optional<User> findById(Long id);
    List<User> getAllUsers();
}