package com.smokingcessation.dto;

import com.smokingcessation.entity.Members;
import lombok.Data;

@Data
public class MemberProfileDTO {
    private Members member;
    private MemberSubscriptionDTO subscriptionInfo;
}