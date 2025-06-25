package com.smokingcessation.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.smokingcessation.enums.Role;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "coach")
public class Coach {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String phone;
    private String password;

    @ManyToOne
    @JoinColumn(name = "admin_id")
    @JsonIgnore
    private Admin admin;

    // Relationship với Account entity
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "account_id")
    @JsonIgnore
    private Account account;

    private String specialization;
    
    private String experience;
    
    private boolean isActive = true;
    
    private LocalDateTime createdAt;
    
    @OneToMany(mappedBy = "coach")
    @JsonIgnore
    private List<Appointment> appointments;

    // Helper method để kiểm tra coach có active không
    public boolean isCoachActive() {
        return this.isActive && this.account != null;
    }

    // Helper method để get account cho slot registration
    public Account getAccount() {
        if (this.account == null) {
            // Tạo account nếu chưa có
            this.account = new Account();
            this.account.setEmail(this.email);
            this.account.setPhone(this.phone);
            this.account.setPassword(this.password);
            this.account.setFullName(this.name);
            this.account.setRole(Role.Coach);
        }
        return this.account;
    }
}
