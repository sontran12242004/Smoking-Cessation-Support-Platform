package com.smokingcessation.entity;

import com.smokingcessation.enums.AppointmentEnum;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;


@Entity
@Getter
@Setter
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public long id;

    LocalDate createAt;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Members member;

    @Enumerated(EnumType.STRING)
    AppointmentEnum status;

    @ManyToOne
    @JoinColumn(name = "account_id")
    Account account;

    @ManyToOne
    @JoinColumn(name = "coach_id")
    Coach coach;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "appointment_services",
            joinColumns = @JoinColumn(name = "appointment_id"),
            inverseJoinColumns =@JoinColumn(name = "service_id")
    )
    List<MedicineService> medicineServices;
    private LocalDate appointmentDate;
    private String sessionType;

    private Long slotId;
    @OneToMany(mappedBy = "appointment")
    List<Report> reports;

}
