package com.smokingcessation.entity;

import com.smokingcessation.enums.Role;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Getter
@Setter
public class Members {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String phone;
    private String password;
    private int dailyCost;
    private LocalDate quitDate;
    
    @Enumerated(EnumType.STRING)
    private Role role;
    
    private LocalDateTime createdAt;

}
