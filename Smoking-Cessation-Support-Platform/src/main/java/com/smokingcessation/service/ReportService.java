package com.smokingcessation.service;

import com.smokingcessation.dto.ReportDTO;
import com.smokingcessation.entity.Account;
import com.smokingcessation.entity.Appointment;
import com.smokingcessation.entity.Report;
import com.smokingcessation.exception.exceptions.BadRequestException;
import com.smokingcessation.repository.AppointmentRepository;
import com.smokingcessation.repository.ReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;

@Service
public class ReportService {
    @Autowired
    ReportRepository reportRepository;
    @Autowired
    AuthenticationService authenticationService;
    @Autowired
    AppointmentRepository appointmentRepository;

    public Report create(ReportDTO reportRequest) {
        Account currentAccount = authenticationService.getCurrentAccount();

        Appointment appointment = appointmentRepository.findById(reportRequest.getAppointmentId())
                .orElseThrow( () -> new BadRequestException("Appointment not found"));

        // check xem appointment nay co phai cua account nay hay ko
        if(appointment.getAccount().getId() != currentAccount.getId()){
            throw new BadRequestException("This appointment ko phai cua ban");
        }else{
            Report report = new Report();
            report.setAppointment(appointment);
            report.setAccount(currentAccount);
            report.setReason(reportRequest.getReason());
            report.setCreatedAt(LocalDateTime.now());
            report.setDescription(reportRequest.getDescription());
            return reportRepository.save(report);
        }


    }
}
