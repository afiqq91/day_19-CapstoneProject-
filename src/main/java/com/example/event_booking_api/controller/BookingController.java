package com.example.event_booking_api.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.event_booking_api.dto.BookingReportResponse;
import com.example.event_booking_api.dto.CreateBookingRequest;
import com.example.event_booking_api.model.Booking;
import com.example.event_booking_api.service.BookingService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(
            BookingService bookingService) {

        this.bookingService = bookingService;
    }

    @PostMapping
    public Booking createBooking(
            @Valid @RequestBody CreateBookingRequest request) {

        System.out.println("BOOKING CONTROLLER HIT");

        return bookingService.createBooking(
                request.getUserId(),
                request.getEventId(),
                request.getNumberOfSeats());
    }

    @GetMapping
    public List<Booking> getAllBookings() {

        return bookingService.getAllBookings();
    }

    @GetMapping("/user/{userId}")
    public List<Booking> getUserBookings(
            @PathVariable String userId) {

        return bookingService.getBookingsByUser(userId);
    }

    @PutMapping("/{id}/cancel")
    public Booking cancelBooking(
            @PathVariable String id) {

        return bookingService.cancelBooking(id);
    }

    @GetMapping("/report")
    public BookingReportResponse getBookingReport() {

        return bookingService.getBookingReport();
    }
}