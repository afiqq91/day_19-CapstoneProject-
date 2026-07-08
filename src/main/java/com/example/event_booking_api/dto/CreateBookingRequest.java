package com.example.event_booking_api.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CreateBookingRequest {

    @NotBlank(message = "User ID is required")
    private String userId;

    @NotBlank(message = "Event ID is required")
    private String eventId;

    @NotNull(message = "Number of seats is required")
    @Min(value = 1, message = "At least 1 seat must be booked")
    private Integer numberOfSeats;
}