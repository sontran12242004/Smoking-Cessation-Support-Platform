package com.smokingcessation.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Setter
@Getter
public class SubscriptionDTO {

    private Integer subscriptionid;
    private Integer memberID;
    private Integer planID;
    private LocalDate startDate;
    private LocalDate endDate;
    private boolean isActive;

}
