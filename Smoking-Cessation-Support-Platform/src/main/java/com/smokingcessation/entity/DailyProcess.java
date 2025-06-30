package com.smokingcessation.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.time.LocalDate;

@Entity
@Getter
@Setter
public class DailyProcess {
    public static Object getDate;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long processId;
    @ManyToOne
    @JoinColumn(name = "member_id")
    private Members member;
    private LocalDateTime date;
    private boolean smoked; // Đã hút hôm nay chưa
    private Integer cigaretteStrength; // Độ mạnh (1-10), null nếu không hút
    private Integer priceSmoked;
    private String mood; // Cảm xúc cuối ngày
    private String cravingTrigger; // Tác nhân gây thèm
    private String confidence; // Độ tự tin bỏ thuốc ngày mai
    private int cigarettesSmokedToday; // Số điếu đã hút hôm nay
}
