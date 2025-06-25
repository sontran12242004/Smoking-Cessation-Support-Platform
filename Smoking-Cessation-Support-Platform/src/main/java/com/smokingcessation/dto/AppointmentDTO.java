package com.smokingcessation.dto;


import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class AppointmentDTO {
    Long slotId;
    Long coachId;
    LocalDate appointmentDate;
    List<Long> servicesId;
}
