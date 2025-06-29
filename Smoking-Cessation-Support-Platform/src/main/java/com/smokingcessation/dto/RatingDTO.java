package com.smokingcessation.dto;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class RatingDTO {
    public long id;
    int rating;
    long serviceId;
    private String memberName;
    String feedback;
    LocalDate createdAt;
}
