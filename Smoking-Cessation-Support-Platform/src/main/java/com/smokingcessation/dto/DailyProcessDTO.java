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
    private Integer cigaretteStrength; // Độ mạnh (1-10), null nếu không hút
    private Integer priceSmoked;
    private boolean smoked;
    private String mood;
    private String cravingTrigger;
    private String confidence;
    private int cigarettesSmokedToday; // Số điếu đã hút hôm nay
}
