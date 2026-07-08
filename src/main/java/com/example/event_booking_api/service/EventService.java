package com.example.event_booking_api.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.event_booking_api.exception.EventNotFoundException;
import com.example.event_booking_api.model.Event;
import com.example.event_booking_api.model.EventStatus;
import com.example.event_booking_api.repository.EventRepository;

@Service
public class EventService {

    private final EventRepository eventRepository;

    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    public Event create(Event event) {

        event.setCreatedAt(LocalDateTime.now());

        if (event.getSeatsAvailable() == null) {
            event.setSeatsAvailable(event.getCapacity());
        }

        if (event.getStatus() == null) {
            event.setStatus(EventStatus.ACTIVE);
        }

        return eventRepository.save(event);
    }

    public List<Event> getAll() {
        return eventRepository.findAll();
    }

    public Event getById(String id) {
        return eventRepository.findById(id)
                .orElseThrow(()
                        -> new EventNotFoundException("Event not found"));
    }

    public Event update(String id, Event updatedEvent) {

        Event existingEvent = getById(id);

        existingEvent.setTitle(updatedEvent.getTitle());
        existingEvent.setDescription(updatedEvent.getDescription());
        existingEvent.setCategory(updatedEvent.getCategory());
        existingEvent.setVenue(updatedEvent.getVenue());
        existingEvent.setEventDate(updatedEvent.getEventDate());
        existingEvent.setPrice(updatedEvent.getPrice());
        existingEvent.setCapacity(updatedEvent.getCapacity());
        existingEvent.setSeatsAvailable(updatedEvent.getSeatsAvailable());
        existingEvent.setStatus(updatedEvent.getStatus());

        return eventRepository.save(existingEvent);
    }

    public void delete(String id) {

        Event event = getById(id);

        eventRepository.delete(event);
    }
}
