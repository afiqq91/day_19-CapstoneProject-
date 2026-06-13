package com.example.event_booking_api.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.event_booking_api.model.Event;
import com.example.event_booking_api.service.EventService;

@RestController
@RequestMapping("/api/events")
public class EventController {

    private final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @PostMapping
    public Event createEvent(
            @RequestBody Event event) {

        return eventService.create(event);
    }

    @GetMapping
    public List<Event> getAllEvents() {

        return eventService.getAll();
    }

    @GetMapping("/{id}")
    public Event getEventById(
            @PathVariable String id) {

        return eventService.getById(id);
    }

    @PutMapping("/{id}")
    public Event updateEvent(
            @PathVariable String id,
            @RequestBody Event event) {

        return eventService.update(id, event);
    }

    @DeleteMapping("/{id}")
    public void deleteEvent(
            @PathVariable String id) {

        eventService.delete(id);
    }
}
