package com.smokingcessation.service;

import com.smokingcessation.dto.AppointmentDTO;
import com.smokingcessation.entity.*;
import com.smokingcessation.enums.AppointmentEnum;
import com.smokingcessation.enums.Role;
import com.smokingcessation.exception.exceptions.BadRequestException;
import com.smokingcessation.repository.AccountSlotRepository;
import com.smokingcessation.repository.AppointmentRepository;
import com.smokingcessation.repository.AuthenticationRepository;
import com.smokingcessation.repository.CoachRepository;
import com.smokingcessation.repository.MedicineServiceRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
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
    CoachRepository coachRepository;

    @Autowired
    AuthenticationService authenticationService;

    @Autowired
    MedicineServiceRepository medicineServiceRepository;

    @Transactional
    public Appointment create(AppointmentDTO appointmentRequest) {
        // Tìm coach theo ID
        Coach coach = coachRepository.findById(appointmentRequest.getCoachId())
                .orElseThrow(() -> new BadRequestException("Coach not found"));
        if (!coach.isCoachActive()) {
            throw new BadRequestException("Coach is not active");
        }
        // Tìm slot
        AccountSlot slot = accountSlotRepository.findAccountSlotBySlotIdAndAccountAndDate(
                appointmentRequest.getSlotId(),
                coach.getAccount(),
                appointmentRequest.getAppointmentDate()
        );
        // Check xem slot do da dat hay chua
        if (!slot.isAvailable()) {
            throw new BadRequestException("Slot is not available");
        }
        // Lấy tài khoản hiện tại
        Account currentAccount = authenticationService.getCurrentAccount();
        // Tạo appointment
        Appointment appointment = new Appointment();
        appointment.setCreateAt(LocalDate.now());
        appointment.setStatus(AppointmentEnum.PENDING);
        appointment.setAccount(currentAccount);
        appointment.setCoach(coach);
        appointment.setSlotId(appointmentRequest.getSlotId());
        appointment.setAppointmentDate(appointmentRequest.getAppointmentDate());
        appointmentRepository.save(appointment);
        // Set slot do thanh da dat
        slot.setAvailable(false);
        return appointment;
    }

    public List<AppointmentDTO> getUpcomingSessionsForCoach(Long coachId) {
        List<Appointment> appointments = appointmentRepository.findUpcomingByCoachId(coachId);
        List<AppointmentDTO> result = new ArrayList<>();
        for (Appointment appt : appointments) {
            AppointmentDTO dto = new AppointmentDTO();
            dto.setCreateAt(appt.getCreateAt());
            dto.setMemberName(appt.getMember().getName());
            dto.setStatus(AppointmentEnum.valueOf(appt.getStatus().toString()));
            result.add(dto);
        }
        return result;
    }


}