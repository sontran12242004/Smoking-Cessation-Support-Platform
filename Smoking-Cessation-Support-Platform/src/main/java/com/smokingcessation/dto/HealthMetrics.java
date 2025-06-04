package com.smokingcessation.dto;
import com.smokingcessation.entity.Users;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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
    private Users user;

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
    private java.time.LocalDateTime createdAt = java.time.LocalDateTime.now();
}