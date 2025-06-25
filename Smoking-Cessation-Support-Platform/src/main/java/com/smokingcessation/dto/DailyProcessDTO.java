package com.smokingcessation.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DailyProcessDTO {
    private Long processId;
    private Long memberId;
    private LocalDate date;
    private int cigarettesNotSmoked;
    private int cigarettesSmokedToday;
    private double moneySaved;
    private int cravingIntensity;
    private String mood;
    private String notes;
}
