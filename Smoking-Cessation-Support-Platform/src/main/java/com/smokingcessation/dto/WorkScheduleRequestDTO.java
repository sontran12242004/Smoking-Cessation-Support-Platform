package com.smokingcessation.dto;
import java.util.List;
import lombok.Data;

@Data
public class WorkScheduleRequestDTO {
    private String date; // yyyy-MM-dd (ngày bắt đầu tuần)
    private List<String> daysOfWeek; // ["MONDAY", "TUESDAY", ...]
}