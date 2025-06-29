package com.smokingcessation.dto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class HealthMetricsDTO {
    private Long id;
    private Long userId;
    private int daysSmokeFree;
    private int moneySaved;
    private double healthImprovedPercent;
    private double heartAttackRisk;
    private double lungCancerRisk;
    private double heartDiseaseRisk;
    private double immuneFunction;
    private double teethWhitening;
    private double breathFreshness;
    private double tasteAndSmell;
    private double coLevels;
    private double oxygenLevels;
    private LocalDateTime createdAt;
}