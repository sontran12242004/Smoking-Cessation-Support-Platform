package com.smokingcessation.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.smokingcessation.enums.Role;
import lombok.Data;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@Data
@Table(name = "coach")
public class Coach {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Chỉ giữ lại name, các field khác lấy từ Account
    private String name;

    @ManyToOne
    @JoinColumn(name = "admin_id")
    @JsonIgnore
    private Admin admin;

    // Relationship với Account entity - sử dụng mappedBy để tránh circular cascade
    @OneToOne(mappedBy = "coach")
    @JsonIgnore
    private Account account;

    private String specialization;
    private String experience;
    private String title;
    private String bio;
    private String certifications;
    private Double hourlyRate;
    private boolean isActive = true;
    
    private LocalDateTime createdAt;
    
    @OneToMany(mappedBy = "coach")
    @JsonIgnore
    private List<Appointment> appointments;

    // Helper method để kiểm tra coach có active không
    public boolean isCoachActive() {
        return this.isActive && this.account != null;
    }
}
