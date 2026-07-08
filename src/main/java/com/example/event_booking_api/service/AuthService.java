package com.example.event_booking_api.service;

import java.time.LocalDateTime;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.event_booking_api.dto.AuthResponse;
import com.example.event_booking_api.dto.LoginRequest;
import com.example.event_booking_api.dto.RegisterRequest;
import com.example.event_booking_api.exception.UserNotFoundException;
import com.example.event_booking_api.model.Role;
import com.example.event_booking_api.model.User;
import com.example.event_booking_api.repository.UserRepository;
import com.example.event_booking_api.security.JwtService;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public User register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        User user = new User();

        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());

        user.setPassword(
                passwordEncoder.encode(
                        request.getPassword()));

        user.setRole(Role.USER);
        user.setCreatedAt(LocalDateTime.now());

        return userRepository.save(user);
    }

    public AuthResponse login(LoginRequest request) {

        System.out.println("AUTH SERVICE LOGIN START");

        User user = userRepository
                .findByEmail(request.getEmail())
                .orElseThrow(()
                        -> new UserNotFoundException(
                        "User not found"));

        System.out.println("USER FOUND");

        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword())) {

            System.out.println("PASSWORD INVALID");

            throw new RuntimeException("Invalid password");
        }

        System.out.println("PASSWORD VALID");

        String token = jwtService.generateToken(
                user.getEmail());

        return new AuthResponse(
                token,
                user.getId(),
                user.getEmail(),
                user.getRole().name());
    }
}
