package com.smokingcessation.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Setter
@Getter
public class SubscriptionDTO {
    private Integer subscriptionId;
    private Long memberId;
    private String memberName;
    private String memberEmail;
    private Integer planId;
    private String planName;
    private Integer planDuration;
    private LocalDate startDate;
    private LocalDate endDate;
    private boolean isActive;
    private String paymentMethod;
    private String notes;

}
