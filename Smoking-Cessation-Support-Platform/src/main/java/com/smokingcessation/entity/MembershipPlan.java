package com.smokingcessation.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
@Data
@Entity
public class MembershipPlan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "plan_id")
    private Integer planID;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false)
    private Integer duration; // Số ngày hiệu lực

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;


}
