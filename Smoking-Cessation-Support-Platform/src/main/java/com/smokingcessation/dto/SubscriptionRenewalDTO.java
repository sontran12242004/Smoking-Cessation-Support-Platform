package com.smokingcessation.dto;

import lombok.Data;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

@Data
public class SubscriptionRenewalDTO {
    @NotNull(message = "Plan ID is required")
    private Integer planId;

    private LocalDate renewalDate;
    private String paymentMethod;
}