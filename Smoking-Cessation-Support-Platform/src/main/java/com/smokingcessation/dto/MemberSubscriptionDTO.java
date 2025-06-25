package com.smokingcessation.dto;

import com.smokingcessation.entity.MembershipPlan;
import com.smokingcessation.entity.Subscription;
import lombok.Data;
import java.util.List;

@Data
public class MemberSubscriptionDTO {
    private Subscription currentSubscription;
    private MembershipPlan currentPlan;
    private boolean isExpired;
    private long daysRemaining;
    private List<Subscription> history;
    private boolean canRenew;
    private boolean canCancel;
    private List<MembershipPlan> availablePlans;
}