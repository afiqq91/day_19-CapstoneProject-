package com.example.event_booking_api.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.event_booking_api.model.Booking;

public interface BookingRepository extends MongoRepository<Booking, String> {

    List<Booking> findByUserId(String userId);

    List<Booking> findByEventId(String eventId);
}