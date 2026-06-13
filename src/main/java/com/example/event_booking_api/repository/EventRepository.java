package com.example.event_booking_api.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.event_booking_api.model.Event;

public interface EventRepository extends MongoRepository<Event, String> {
}