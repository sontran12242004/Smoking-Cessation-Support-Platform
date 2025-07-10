package com.smokingcessation.controller;


import com.smokingcessation.dto.AppointmentDTO;
import com.smokingcessation.dto.WorkScheduleRequestDTO;
import com.smokingcessation.entity.Appointment;
import com.smokingcessation.service.AppointmentService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointment")
@SecurityRequirement(name = "api")
public class AppointmentController {
    @Autowired
    AppointmentService appointmentService;

    // AUTHENTICATED - Members (tạo appointment cho mình), Admin (tạo cho bất kỳ ai)
    @PostMapping("/members/appointment")
    @PreAuthorize("hasAnyRole('MEMBERS', 'ADMIN')")
    public ResponseEntity<Appointment> create(@RequestBody AppointmentDTO appointmentDTO){
        Appointment appointment = appointmentService.create(appointmentDTO);
        return ResponseEntity.ok(appointment);
    }

    // API mới: Lấy danh sách session sắp tới cho coach (chỉ 3 trường)
    @GetMapping("/upcoming/coach/{coachId}")
    @PreAuthorize("hasAnyRole('COACH')")
    public ResponseEntity<List<AppointmentDTO>> getUpcomingSessionsForCoach(@PathVariable Long coachId) {
        List<AppointmentDTO> sessions = appointmentService.getUpcomingSessionsForCoach(coachId);
        return ResponseEntity.ok(sessions);
    }

    // COACH - Lấy lịch đã được Member book
    @GetMapping("/booked/coach/{coachId}")
    @PreAuthorize("hasAnyRole('COACH', 'ADMIN')")
    public ResponseEntity<?> getBookedAppointmentsForCoach(
            @PathVariable Long coachId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) java.time.LocalDate from,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) java.time.LocalDate to) {
        return ResponseEntity.ok(appointmentService.getBookedAppointmentsForCoach(coachId, from, to));
    }
    // ADMIN - Lấy lịch coach theo tuần (group by ngày)
    @GetMapping("/weekly-schedule")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getWeeklySchedule(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) java.time.LocalDate from,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) java.time.LocalDate to,
            @RequestParam(required = false) Long coachId) {
        return ResponseEntity.ok(appointmentService.getWeeklySchedule(from, to, coachId));
    }

    // ADMIN - Lấy danh sách lịch chờ approve từ Coach
    @GetMapping("/pending-approval")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getPendingApprovalSchedules(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) java.time.LocalDate from,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) java.time.LocalDate to,
            @RequestParam(required = false) Long coachId) {
        return ResponseEntity.ok(appointmentService.getPendingApprovalSchedules(from, to, coachId));
    }

    // MEMBERS - Lấy lịch Coach đã được Admin approve để book
    @GetMapping("/available-schedules")
    @PreAuthorize("hasAnyRole('MEMBERS', 'ADMIN')")
    public ResponseEntity<?> getAvailableSchedules(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) java.time.LocalDate from,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) java.time.LocalDate to,
            @RequestParam(required = false) Long coachId) {
        return ResponseEntity.ok(appointmentService.getAvailableSchedulesForMembers(from, to, coachId));
    }

    // ADMIN - Xác nhận appointment
    @PostMapping("/{appointmentId}/confirm")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> confirmAppointment(@PathVariable Long appointmentId) {
        return ResponseEntity.ok(appointmentService.confirmAppointment(appointmentId));
    }

    // ADMIN - Từ chối appointment
    @PostMapping("/{appointmentId}/reject")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> rejectAppointment(@PathVariable Long appointmentId) {
        return ResponseEntity.ok(appointmentService.rejectAppointment(appointmentId));
    }

    // COACH - Đăng ký lịch làm việc cả tuần (nhiều ngày, nhiều slot)
    @PostMapping("/work/register-week")
    @PreAuthorize("hasRole('COACH')")
    public ResponseEntity<?> registerWorkSchedule(@RequestBody WorkScheduleRequestDTO request) {
        appointmentService.registerWorkSchedule(request);
        return ResponseEntity.ok().build();
    }

    // COACH - Xem lịch làm việc với thông tin slot status (để disable nút)
    @GetMapping("/coach/schedule-status")
    @PreAuthorize("hasRole('COACH')")
    public ResponseEntity<?> getCoachScheduleWithSlotStatus(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) java.time.LocalDate from,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) java.time.LocalDate to,
            @RequestParam(required = false) Long coachId) {
        return ResponseEntity.ok(appointmentService.getCoachScheduleWithSlotStatus(from, to, coachId));
    }

    // COACH - Hoàn thành appointment
    @PostMapping("/{appointmentId}/complete")
    @PreAuthorize("hasRole('COACH')")
    public ResponseEntity<?> completeAppointment(@PathVariable Long appointmentId) {
        return ResponseEntity.ok(appointmentService.completeAppointment(appointmentId));
    }

    // COACH - Hủy appointment
    @PostMapping("/{appointmentId}/cancel")
    @PreAuthorize("hasRole('COACH')")
    public ResponseEntity<?> cancelAppointment(@PathVariable Long appointmentId) {
        return ResponseEntity.ok(appointmentService.cancelAppointment(appointmentId));
    }
}
