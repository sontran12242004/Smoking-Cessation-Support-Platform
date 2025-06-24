package com.smokingcessation.dto;

import lombok.Data;

@Data
public class RatingDTO {
    int star;
    long serviceId;
    String comment;
}
