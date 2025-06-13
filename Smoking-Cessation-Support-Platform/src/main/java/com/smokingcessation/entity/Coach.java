package com.smokingcessation.entity;

import com.smokingcessation.enums.Role;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Entity
@Table(name = "coaches")
@Getter
@Setter
public class Coach {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String phone;
    private String password;
    
    @Enumerated(EnumType.STRING)
    private Role role = Role.Coach;
    
    private LocalDateTime createdAt;
    private boolean isActive = true;
    private String availability;      // Thời gian có thể tư vấn
    private String rating;           // Đánh giá

}
