package com.example.event_booking_api.service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.event_booking_api.model.Booking;
import com.example.event_booking_api.model.BookingStatus;
import com.example.event_booking_api.model.Event;
import com.example.event_booking_api.repository.BookingRepository;
import com.example.event_booking_api.repository.EventRepository;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final EventRepository eventRepository;

    public BookingService(
            BookingRepository bookingRepository,
            EventRepository eventRepository) {

        this.bookingRepository = bookingRepository;
        this.eventRepository = eventRepository;
    }

    public Booking createBooking(
            String userId,
            String eventId,
            Integer numberOfSeats) {

        Event event = eventRepository.findById(eventId)
                .orElseThrow(()
                        -> new RuntimeException("Event not found"));

        if (event.getEventDate().isBefore(LocalDateTime.now())) {
            throw new RuntimeException(
                    "Cannot book past events");
        }

        if (event.getSeatsAvailable() < numberOfSeats) {
            throw new RuntimeException("Not enough seats available");
        }

        BigDecimal totalPrice
                = event.getPrice()
                        .multiply(BigDecimal.valueOf(numberOfSeats));

        event.setSeatsAvailable(
                event.getSeatsAvailable() - numberOfSeats);

        eventRepository.save(event);

        Booking booking = new Booking();

        booking.setUserId(userId);
        booking.setEventId(eventId);
        booking.setNumberOfSeats(numberOfSeats);
        booking.setTotalPrice(totalPrice);
        booking.setBookingStatus(BookingStatus.CONFIRMED);
        booking.setBookingDate(LocalDateTime.now());

        return bookingRepository.save(booking);
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public List<Booking> getBookingsByUser(String userId) {
        return bookingRepository.findByUserId(userId);
    }

    public Booking cancelBooking(String bookingId) {

        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(()
                        -> new RuntimeException("Booking not found"));

        if (booking.getBookingStatus() == BookingStatus.CANCELLED) {
            throw new RuntimeException(
                    "Booking already cancelled");
        }

        Event event = eventRepository.findById(
                booking.getEventId())
                .orElseThrow(()
                        -> new RuntimeException("Event not found"));

        event.setSeatsAvailable(
                event.getSeatsAvailable()
                + booking.getNumberOfSeats());

        eventRepository.save(event);

        booking.setBookingStatus(
                BookingStatus.CANCELLED);

        return bookingRepository.save(booking);
    }
}
