package com.smokingcessation.dto;

import com.smokingcessation.entity.Appointment;
import com.smokingcessation.entity.Rating;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;
@Data
public class MedicineServiceDTO {
    public long id;
    String name;
    String description;
    float price;
    boolean isAvailable = true;
    private LocalDateTime createdAt;
    private List<Rating> ratings;
    List<Appointment> appointments;
}
