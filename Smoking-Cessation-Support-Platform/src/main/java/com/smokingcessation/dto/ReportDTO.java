package com.smokingcessation.dto;

import lombok.Data;

@Data
public class ReportDTO {
    long appointmentId;
    String reason;
    String description;
}
