package com.smokingcessation.controller;

import com.smokingcessation.dto.GoogleCalendarEventDTO;
import com.smokingcessation.entity.Appointment;
import com.smokingcessation.service.GoogleCalendarService;
import com.smokingcessation.repository.AppointmentRepository;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@SecurityRequirement(name = "api")
@RequestMapping("/api/calendar")
public class GoogleCalendarController {

    @Autowired
    private GoogleCalendarService googleCalendarService;

    @Autowired
    private AppointmentRepository appointmentRepository;

    /**
     * Tạo sự kiện Google Calendar cho cuộc hẹn
     */
    @PostMapping("/events/create/{appointmentId}")
    public ResponseEntity<String> createEvent(@PathVariable Long appointmentId) {
        try {
            String eventId = googleCalendarService.createCalendarEvent(appointmentId);
            return ResponseEntity.ok("Sự kiện đã được tạo với ID: " + eventId);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Lỗi tạo sự kiện: " + e.getMessage());
        }
    }

    /**
     * Cập nhật sự kiện Google Calendar
     */
    @PutMapping("/events/update/{eventId}")
    public ResponseEntity updateEvent(@PathVariable String eventId) {
        try {
            googleCalendarService.updateCalendarEvent(eventId);
            return ResponseEntity.ok("Sự kiện đã được cập nhật thành công");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Lỗi cập nhật sự kiện: " + e.getMessage());
        }
    }

    /**
     * Xóa sự kiện Google Calendar
     */
    @DeleteMapping("/events/{eventId}")
    public ResponseEntity deleteEvent(@PathVariable String eventId) {
        try {
            googleCalendarService.deleteCalendarEvent(eventId);
            return ResponseEntity.ok("Sự kiện đã được xóa thành công");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Lỗi xóa sự kiện: " + e.getMessage());
        }
    }

    /**
     * Lấy chi tiết sự kiện Google Calendar
     */
    @GetMapping("/events/{eventId}/profileEvents")
    public ResponseEntity<GoogleCalendarEventDTO> getEventDetails(@PathVariable String eventId) {
        try {
            GoogleCalendarEventDTO event = googleCalendarService.getEventDetails(eventId);
            return ResponseEntity.ok(event);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * Lấy tất cả sự kiện theo coach
     */
    @GetMapping("/coach/{coachId}/events")
    public ResponseEntity<List<GoogleCalendarEventDTO>> getEventsByCoach(@PathVariable Long coachId) {
        try {
            List<GoogleCalendarEventDTO> events = googleCalendarService.getEventsByCoach(coachId);
            return ResponseEntity.ok(events);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * Lấy tất cả sự kiện theo member
     */
    @GetMapping("/member/{memberId}/getAllAvents")
    public ResponseEntity<List<GoogleCalendarEventDTO>> getEventsByMember(@PathVariable Long memberId) {
        try {
            List<GoogleCalendarEventDTO> events = googleCalendarService.getEventsByMember(memberId);
            return ResponseEntity.ok(events);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * Lấy sự kiện theo khoảng thời gian
     */
    @GetMapping("/events/range")
    public ResponseEntity<List<GoogleCalendarEventDTO>> getEventsByDateRange(
            @RequestParam LocalDate startDate,
            @RequestParam LocalDate endDate) {
        try {
            List<GoogleCalendarEventDTO> events = googleCalendarService.getEventsByDateRange(startDate, endDate);
            return ResponseEntity.ok(events);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * Kiểm tra trạng thái kết nối Google Calendar
     */
    @GetMapping("/events/status")
    public ResponseEntity<String> checkConnection() {
        try {
            boolean isConnected = googleCalendarService.checkConnection();
            if (isConnected) {
                return ResponseEntity.ok("Kết nối Google Calendar thành công");
            } else {
                return ResponseEntity.status(500).body("Kết nối Google Calendar thất bại");
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Lỗi kiểm tra kết nối: " + e.getMessage());
        }
    }

    /**
     * Lấy Google Meet link cho cuộc hẹn
     */
    @GetMapping("/appointments/{appointmentId}/meet-link")
    public ResponseEntity<String> getMeetLink(@PathVariable Long appointmentId) {
        try {
            // Lấy appointment
            Appointment appointment = appointmentRepository.findById(appointmentId)
                    .orElseThrow(() -> new RuntimeException("Appointment not found"));

            // Tạo Google Meet link
            String meetLink = generateMeetLink(appointment);

            return ResponseEntity.ok(meetLink);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Lỗi tạo Google Meet link: " + e.getMessage());
        }
    }

    /**
     * Tạo Google Meet link cho cuộc hẹn
     */
    private String generateMeetLink(Appointment appointment) {
        try {
            // Tạo meeting ID duy nhất dựa trên appointment
            String meetingId = "smoking-cessation-" + appointment.getId() + "-" +
                    appointment.getAppointmentDate().toString().replace("-", "") + "-" +
                    appointment.getSlotId();

            // Tạo Google Meet link
            String meetLink = "https://meet.google.com/" + meetingId;

            System.out.println("=== TẠO GOOGLE MEET LINK ===");
            System.out.println("Appointment ID: " + appointment.getId());
            System.out.println("Meeting ID: " + meetingId);
            System.out.println("Meet Link: " + meetLink);
            System.out.println("Coach: " + appointment.getCoach().getName());
            System.out.println("Member: " + (appointment.getMember() != null ? appointment.getMember().getName() : "N/A"));
            System.out.println("=============================");

            return meetLink;

        } catch (Exception e) {
            System.err.println("Lỗi tạo Google Meet link: " + e.getMessage());
            return "https://meet.google.com/smoking-cessation-default";
        }
    }

    /**
     * Tạo sự kiện Google Calendar thực sự và trả về Google Meet link hợp lệ
     */
    @PostMapping("/events/create-meet/{appointmentId}")
    public ResponseEntity<String> createEventWithMeet(@PathVariable Long appointmentId) {
        try {
            String meetLink = googleCalendarService.createGoogleCalendarEventWithMeet(appointmentId);
            return ResponseEntity.ok("Google Meet link: " + meetLink);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Lỗi tạo sự kiện Google Calendar có Google Meet: " + e.getMessage());
        }
    }
}