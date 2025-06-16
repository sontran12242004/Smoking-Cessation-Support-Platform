package com.smokingcessation.dto;

import lombok.Getter;
import lombok.Setter;
import java.math.BigDecimal;

@Setter
@Getter
public class MembershipPlanDTO {
    private Integer planID;
    private String name;
    private Integer duration; // Số ngày
    private BigDecimal price;
}
