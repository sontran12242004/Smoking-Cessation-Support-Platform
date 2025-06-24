package com.smokingcessation.controller;


import com.smokingcessation.dto.AppointmentDTO;
import com.smokingcessation.entity.Appointment;
import com.smokingcessation.service.AppointmentService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/appointment")
@SecurityRequirement(name = "api")
public class AppointmentController {
    @Autowired
     AppointmentService appointmentService;

    @PostMapping
    public ResponseEntity<Appointment> create(@RequestBody AppointmentDTO appointmentDTO){
        Appointment appointment = appointmentService.create(appointmentDTO);
        return ResponseEntity.ok(appointment);
    }
}
