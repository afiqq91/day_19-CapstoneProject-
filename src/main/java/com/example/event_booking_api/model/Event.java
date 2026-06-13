package com.example.event_booking_api.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "events")
public class Event {

    @Id
    private String id;

    private String title;

    private String description;

    private String category;

    private String venue;

    private LocalDateTime eventDate;

    private BigDecimal price;

    private Integer capacity;

    private Integer seatsAvailable;

    private EventStatus status;

    private LocalDateTime createdAt;
}