package com.smokingcessation.dto;

import com.smokingcessation.enums.AppointmentEnum;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class AppointmentDTO {
    public long id;
    private Long appointmentId; // ID của appointment muốn book (từ available-schedules)
    private Long memberId; // Thêm memberId để xác định member tạo appointment
    private Long slotId;
    private Long coachId;
    private LocalDate appointmentDate;
    private String memberName;
    List<Long> servicesId;
    LocalDate createAt;
    AppointmentEnum status;
}