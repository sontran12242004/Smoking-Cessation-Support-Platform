package com.smokingcessation.service;

import com.smokingcessation.dto.AppointmentDTO;
import com.smokingcessation.entity.*;
import com.smokingcessation.enums.AppointmentEnum;
import com.smokingcessation.enums.Role;
import com.smokingcessation.exception.exceptions.BadRequestException;
import com.smokingcessation.repository.AccountSlotRepository;
import com.smokingcessation.repository.AppointmentRepository;
import com.smokingcessation.repository.AuthenticationRepository;
import com.smokingcessation.repository.MedicineServiceRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class AppointmentService {
    @Autowired
    AppointmentRepository appointmentRepository;

    @Autowired
    AccountSlotRepository accountSlotRepository;

    @Autowired
    AuthenticationRepository authenticationRepository;

    @Autowired
    AuthenticationService authenticationService;

    @Autowired
    MedicineServiceRepository medicineServiceRepository;

    @Transactional
    public Appointment create(AppointmentDTO appointmentDTO) {
        //found coach
        Account coach = authenticationRepository.findById(appointmentDTO.getCoachId()).orElseThrow(()-> new BadRequestException("Coach not found"));
        if(coach.getRole().equals(Role.Coach)){
            throw new BadRequestException("Account is not a Coach");
        }
        //found slot
        AccountSlot slot = accountSlotRepository.findAccountSlotBySlotIdAndAccountAndDate(
                appointmentDTO.getSlotId(),
                coach,
                appointmentDTO.getAppointmentDate());

        if (!slot.isAvailable()){
            throw new BadRequestException("slot is not available");
        }

        List<MedicineService> services = medicineServiceRepository.findByIdIn(appointmentDTO.getServicesId());

        Account currentAccount = authenticationService.getCurrentAccount();

        Appointment appointment = new Appointment();
        appointment.setCreateAt(LocalDate.now());
        appointment.setStatus(AppointmentEnum.PENDING);
        appointment.setAccount(currentAccount);
        appointment.setMedicineServices(services);
        appointmentRepository.save(appointment);

        slot.setAvailable(false);

        return appointment;
    }
}
