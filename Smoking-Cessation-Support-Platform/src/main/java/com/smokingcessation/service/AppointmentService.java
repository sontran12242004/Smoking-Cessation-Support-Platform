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
    public Appointment create(AppointmentDTO appointmentRequest) {

        Account coach = authenticationRepository.findById(appointmentRequest.getCoachId()).orElseThrow(()-> new BadRequestException("coach not found"));

        if(!coach.getRole().equals(Role.Coach)){
            throw new BadRequestException("account is not a coach");
        }


//        tim slot
        AccountSlot slot = accountSlotRepository.findAccountSlotBySlotIdAndAccountAndDate(
                appointmentRequest.getSlotId(),
                coach,
                appointmentRequest.getAppointmentDate()
        );
//        check xem slot do da dat hay chua
        if(!slot.isAvailable()){
            throw new BadRequestException("slot is not available");
        }


//        lay Services
        List<MedicineService> services = medicineServiceRepository.findByIdIn(appointmentRequest.getServicesId());


//        lay tai khoan hien tai
        Account currentAccount = authenticationService.getCurrentAccount();

//       appointment
        Appointment appointment = new Appointment();
        appointment.setCreateAt(LocalDate.now());
        appointment.setStatus(AppointmentEnum.PENDING);
        appointment.setAccount(currentAccount);
        appointment.setMedicineServices(services);
        appointmentRepository.save(appointment);
//        set slot do thanh da dat
        slot.setAvailable(false);

        return appointment;
    }
}