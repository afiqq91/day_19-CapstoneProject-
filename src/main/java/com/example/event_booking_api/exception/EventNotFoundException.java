package com.example.event_booking_api.exception;

public class EventNotFoundException
        extends RuntimeException {

    public EventNotFoundException(String message) {
        super(message);
    }
}