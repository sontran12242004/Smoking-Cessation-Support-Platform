package com.smokingcessation.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
public class DailyProcess {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long processId;
    
    @ManyToOne
    @JoinColumn(name = "member_id")
    private Members member;
    
    private LocalDate date;
    
    private int cigarettesNotSmoked; // Number of cigarettes avoided today
    
    private double moneySaved; // Money saved today by not smoking
    
    private int cravingIntensity; // On a scale of 1-10, how strong were cravings
    
    private String mood; // Member's mood for the day
    
    private String notes; // Any additional notes for the day
}
