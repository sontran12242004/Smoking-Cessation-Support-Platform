package com.smokingcessation.dto;

import lombok.Data;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

@Data
public class SubscriptionRenewalDTO {
    @NotNull(message = "Plan ID is required")
    private Long planId;

    private LocalDate renewalDate;
    private String paymentMethod;
}