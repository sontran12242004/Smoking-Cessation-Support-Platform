package com.smokingcessation.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.smokingcessation.enums.PaymentStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;

    LocalDateTime createdAt;
    @Enumerated(EnumType.STRING)
    PaymentStatus status;
    float amount;

    @ManyToOne
    @JoinColumn(name = "accountMemberShip_id")
    @JsonIgnore
    AccountMemberShip accountMemberShip;

}