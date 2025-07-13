package com.smokingcessation.dto;

import lombok.Data;
import jakarta.validation.constraints.NotNull;

@Data
public class SubscriptionRequestDTO {
    @NotNull(message = "Plan ID is required")
    private Long planId;
    private String paymentMethod;
    private String notes;
}