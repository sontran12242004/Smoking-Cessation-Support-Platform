package com.smokingcessation.dto;

import lombok.Data;

@Data
public class SubscriptionStatusDTO {
    private boolean hasActiveSubscription;
    private boolean isExpired;
    private long daysRemaining;
    private boolean canRenew;
    private boolean canCancel;
    private String statusMessage;
}