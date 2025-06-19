package com.smokingcessation.entity;

import com.smokingcessation.enums.AppointmentEnum;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Entity
@Getter
@Setter
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public long id;

    LocalDate createAt;

    AppointmentEnum status;

    @ManyToOne
    @JoinColumn(name = "account_id")
    Account account;

    @ManyToMany(cascade = CascadeType.ALL)
            @JoinTable(
                    name = "appointment_service",
                    joinColumns = @JoinColumn(name = "appointment_id"),
                    inverseJoinColumns = @JoinColumn(name = "service_id")
            )
    List<MedicineService> medicineServices;
}
