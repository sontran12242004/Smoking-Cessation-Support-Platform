package com.smokingcessation.dto;

import jakarta.persistence.Column;
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
    @Column(columnDefinition = "TEXT")
    private String description;
    private boolean isActive = true;
}
