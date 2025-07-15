package com.smokingcessation.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class Rating {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public long id;

    int rating;

    @Column(name = "feedback")
    private String feedback;

    LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "coach_id")
    private Coach coach;

    @ManyToOne
    @JoinColumn(name = "account_id")
    @JsonIgnore
    Account account;

    @ManyToOne
    @JoinColumn(name = "member_id") // hoặc "account_id" tùy thiết kế
    private Members member;

    @ManyToOne
    @JoinColumn(name = "medicine_service_id")
    @JsonIgnore
    MedicineService medicineService;

    @ManyToOne
    @JoinColumn(name = "appointment_id")
    @JsonIgnore
    private Appointment appointment;

}