package com.example.event_booking_api.dto;

import lombok.Data;

@Data
public class CreateBookingRequest {

    private String userId;

    private String eventId;

    private Integer numberOfSeats;
}