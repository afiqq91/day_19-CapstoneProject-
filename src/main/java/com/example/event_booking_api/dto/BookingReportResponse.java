package com.example.event_booking_api.dto;

import java.math.BigDecimal;

public class BookingReportResponse {

    private long totalBookings;
    private BigDecimal totalRevenue;
    private int totalSeatsBooked;

    public BookingReportResponse(
            long totalBookings,
            BigDecimal totalRevenue,
            int totalSeatsBooked) {

        this.totalBookings = totalBookings;
        this.totalRevenue = totalRevenue;
        this.totalSeatsBooked = totalSeatsBooked;
    }

    public long getTotalBookings() {
        return totalBookings;
    }

    public BigDecimal getTotalRevenue() {
        return totalRevenue;
    }

    public int getTotalSeatsBooked() {
        return totalSeatsBooked;
    }
}