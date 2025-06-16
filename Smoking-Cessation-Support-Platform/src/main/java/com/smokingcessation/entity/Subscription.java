package com.smokingcessation.entity;

import jakarta.persistence.*;
import lombok.Data;


import java.time.LocalDate;

@Data
@Entity
public class Subscription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer subscriptionID;

    @ManyToOne
    @JoinColumn(name = "memberID", nullable = false)
    private Members members;

    @ManyToOne
    @JoinColumn(name = "planID", nullable = false)
    private MembershipPlan membershipPlan;

    private LocalDate startDate;

    private LocalDate endDate;

    private boolean isActive;


}
