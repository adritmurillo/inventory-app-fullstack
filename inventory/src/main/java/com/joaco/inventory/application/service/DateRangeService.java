package com.joaco.inventory.application.service;

import com.joaco.inventory.domain.exception.InvalidDateRangeException;
import com.joaco.inventory.domain.model.DashboardFilter;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.temporal.TemporalAdjusters;

@Service
public class DateRangeService {

    public record DateRange(LocalDateTime start, LocalDateTime end) {}

    public DateRange calculateRange(DashboardFilter filter) {
        if (filter == null) {
            filter = DashboardFilter.builder().build();
        }

        LocalDate today = LocalDate.now();
        LocalDate startDate;
        LocalDate endDate;

        String period = filter.getPeriod() != null ? filter.getPeriod().toLowerCase() : "day";

        switch (period) {
            case "week" -> {
                startDate = today.with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY));
                endDate = today.with(TemporalAdjusters.nextOrSame(DayOfWeek.SUNDAY));
            }
            case "month" -> {
                startDate = today.with(TemporalAdjusters.firstDayOfMonth());
                endDate = today.with(TemporalAdjusters.lastDayOfMonth());
            }
            case "custom" -> {
                startDate = filter.getFrom();
                endDate = filter.getTo();
            }
            default -> {
                startDate = today;
                endDate = today;
            }
        }

        return new DateRange(
            startDate.atStartOfDay(),
            endDate.atTime(LocalTime.MAX)
        );
    }

    public void validateFilter(DashboardFilter filter) {
        if (filter == null) {
            return;
        }

        if (filter.isCustomPeriod()) {
            if (filter.getFrom() == null || filter.getTo() == null) {
                throw new InvalidDateRangeException("For period=custom, 'from' and 'to' are mandatory");
            }
            if (filter.getFrom().isAfter(filter.getTo())) {
                throw new InvalidDateRangeException("'from' can't be posterior to 'to'");
            }
        }
    }
}

