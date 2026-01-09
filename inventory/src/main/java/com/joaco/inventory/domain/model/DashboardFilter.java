package com.joaco.inventory.domain.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardFilter {
    @Builder.Default
    private String period = "day";

    private LocalDate from;
    private LocalDate to;

    @Builder.Default
    private String sort = "desc";

    public boolean isCustomPeriod() {
        return "custom".equalsIgnoreCase(period);
    }
}

