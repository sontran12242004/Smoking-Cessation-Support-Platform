package com.smokingcessation.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "health_metrics")
public class HealthMetrics {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private Members user;

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
    private LocalDateTime createdAt = LocalDateTime.now();
}