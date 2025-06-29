package com.smokingcessation.dto;


import com.smokingcessation.enums.AppointmentEnum;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class AppointmentDTO {
    public long id;
    Long slotId;
    Long coachId;
    LocalDate appointmentDate;
    private String memberName;
    List<Long> servicesId;
    private String sessionType;
    LocalDate createAt;
    AppointmentEnum status;
}
