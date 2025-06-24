package com.smokingcessation.repository;

import com.smokingcessation.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface    AppointmentRepository extends JpaRepository<Appointment, Long> {
}
