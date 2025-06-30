package com.smokingcessation.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DailyProcessDTO {
    private Long processId;
    private Long memberId;
    private LocalDateTime date;
    private String cigaretteStrength; // Độ mạnh của thuốc lá (Light/Medium/Strong)
    private int cigarettesSmokedToday;
    private double moneySaved;
    private int cravingIntensity;
    private String mood;
    private String notes;
}
