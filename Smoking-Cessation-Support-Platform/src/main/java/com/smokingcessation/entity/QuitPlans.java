package com.smokingcessation.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "quit_plans")
public class QuitPlans {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @OneToOne
    @JoinColumn(name = "member_id")
    private Members member;
    
    // Thông tin hút thuốc hiện tại
    private String dailyCigarettes; // "6-10"
    private String firstCigaretteAfterWaking; // "6-30 minutes"
    private String weeklySpending; // "$10-$25"
    
    // Thông tin động lực và lịch sử
    private String motivation; // "Health reasons"
    private String triedBefore; // "No"
    
    // Lưu triggers dưới dạng JSON string
    @Column(columnDefinition = "TEXT")
    private String triggers; // JSON array: ["Morning coffee", "Stressful situations"]
    
    // Thông tin mục tiêu
    private String quitGoal; // Mục tiêu cai thuốc
    private Integer targetDays; // Số ngày mục tiêu
    
    // Trạng thái
    private boolean isActive = true;
    private LocalDateTime createdAt;
    
    @PrePersist
    protected void onCreate() {
        if (createdAt == null) {
            createdAt = LocalDateTime.now();
        }
    }
}
