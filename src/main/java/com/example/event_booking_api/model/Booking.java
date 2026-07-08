package com.example.event_booking_api.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "bookings")
public class Booking {

    @Id
    private String id;

    private String userId;

    private String eventId;

    private Integer numberOfSeats;

    private BigDecimal totalPrice;

    private BookingStatus bookingStatus;

    private LocalDateTime bookingDate;
}
