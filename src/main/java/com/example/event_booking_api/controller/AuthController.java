package com.example.event_booking_api.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.event_booking_api.dto.AuthResponse;
import com.example.event_booking_api.dto.LoginRequest;
import com.example.event_booking_api.dto.RegisterRequest;
import com.example.event_booking_api.model.User;
import com.example.event_booking_api.service.AuthService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public User register(
            @Valid@RequestBody RegisterRequest request) {

        return authService.register(request);
    }

    @PostMapping("/login")
    public AuthResponse login(
            @Valid@RequestBody LoginRequest request) {

        System.out.println("LOGIN ENDPOINT HIT");
        System.out.println(request.getEmail());

        return authService.login(request);
    }
}
