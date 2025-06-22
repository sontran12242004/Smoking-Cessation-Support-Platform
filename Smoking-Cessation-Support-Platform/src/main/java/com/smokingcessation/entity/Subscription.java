package com.smokingcessation.entity;

import jakarta.persistence.*;
import lombok.Data;


import java.time.LocalDate;

@Data
@Entity
@Table(name = "subscription")
public class Subscription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "subscription_id")
    private Integer subscriptionid;

    @ManyToOne
    @JoinColumn(name = "member_id", nullable = false)
    private Members member;

    @ManyToOne
    @JoinColumn(name = "plan_id", nullable = false)
    private MembershipPlan membershipPlan;

    private LocalDate startDate;

    private LocalDate endDate;

    private boolean isActive;


}
