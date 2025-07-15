package com.smokingcessation.dto;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class RatingDTO {
    public long id;
    int rating;
    Long serviceId; // Đổi thành Long để có thể null (optional)
    Long coachId; // ID của coach được rating
    Long appointmentId; // ID của appointment để liên kết rating với cuộc hẹn hoàn thành
    private String memberName;
    private String coachName; // Tên coach được rating
    String feedback;
    LocalDate createdAt;
}
