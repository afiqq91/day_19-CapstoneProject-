package com.example.event_booking_api.controller;

import org.springframework.web.bind.annotation.*;

import com.example.event_booking_api.dto.AuthResponse;
import com.example.event_booking_api.dto.LoginRequest;
import com.example.event_booking_api.dto.RegisterRequest;
import com.example.event_booking_api.model.User;
import com.example.event_booking_api.service.AuthService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public User register(
            @RequestBody RegisterRequest request) {

        return authService.register(request);
    }

    @PostMapping("/login")
    public AuthResponse login(
            @RequestBody LoginRequest request) {

        return authService.login(request);
    }
}