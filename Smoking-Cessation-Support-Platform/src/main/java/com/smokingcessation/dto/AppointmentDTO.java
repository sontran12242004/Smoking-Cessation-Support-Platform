package com.smokingcessation.dto;


import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class AppointmentDTO {
    long slotId;
    long coachId;
    LocalDate appointmentDate;
    List<Long> servicesId;
}
