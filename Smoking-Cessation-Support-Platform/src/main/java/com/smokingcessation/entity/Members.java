package com.smokingcessation.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.smokingcessation.enums.Role;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
public class Members {
    @Column(name = "member_id")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberID;

    private String name;
    private String email;
    private String phone;
    private String password;
    private LocalDate quitDate;
    @Enumerated(EnumType.STRING)
    private Role role;
    private LocalDateTime createdAt;
    private String address;
    private LocalDate dateOfBirth;
    private String gender;
    private boolean isActive = true;
    private String primaryMotivation;
    @OneToMany(mappedBy = "member")
    @JsonIgnore
    private List<Subscription> subscriptions;
    @OneToMany(mappedBy = "member")
    @JsonIgnore
    private List<DailyProcess> dailyProcesses;
    @OneToMany(mappedBy = "user")
    @JsonIgnore
    private List<CigaretteLog> cigaretteLogs;
    @OneToOne(mappedBy = "member", cascade = CascadeType.ALL)
    @JsonIgnore
    private QuitPlans quitPlan;
    @JsonProperty("formerDailyUsage")
    private Integer formerDailyUsage;
    // Relationship với Account entity
    @OneToOne
    @JoinColumn(name = "account_id")
    @JsonIgnore
    private Account account;
}
