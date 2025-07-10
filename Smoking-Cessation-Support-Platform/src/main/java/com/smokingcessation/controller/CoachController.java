package com.smokingcessation.controller;

import com.smokingcessation.dto.AppointmentDTO;
import com.smokingcessation.dto.AssignRequest;
import com.smokingcessation.dto.CoachDTO;
import com.smokingcessation.entity.Appointment;
import com.smokingcessation.entity.Coach;
import com.smokingcessation.service.CoachService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.HashMap;
import java.util.stream.Collectors;
import com.smokingcessation.enums.AppointmentEnum;
import com.smokingcessation.entity.Rating;
import com.smokingcessation.repository.AppointmentRepository;
import com.smokingcessation.repository.RatingRepository;


@RestController
@RequestMapping("/api/coaches")
public class CoachController {

    @Autowired
    private CoachService coachService;

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private RatingRepository ratingRepository;

    @Autowired
    ModelMapper modelMapper;

    // PUBLIC - Ai cũng có thể xem danh sách coaches
    @GetMapping
    public List<Coach> getAllCoaches() {
        return coachService.getAllCoaches();
    }

    // PUBLIC - Ai cũng có thể xem thông tin coach theo ID
    @GetMapping("/{id}")
    public ResponseEntity<Coach> getCoachById(@PathVariable Long id) {
        return coachService.getCoachById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // PUBLIC - Ai cũng có thể tạo coach mới
    @PostMapping
    public ResponseEntity<Coach> createCoach(@RequestBody CoachDTO coachDTO) {
        Coach coach = coachService.createCoach(coachDTO);
        return ResponseEntity.ok(coach);
    }

    // PUBLIC - Ai cũng có thể cập nhật thông tin coach
    @PutMapping("/{id}")
    public ResponseEntity<Coach> updateCoach(@PathVariable Long id, @RequestBody Coach coach) {
        Coach updated = coachService.updateCoach(id, coach);
        if (updated != null) {
            return ResponseEntity.ok(updated);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // PUBLIC - Ai cũng có thể xóa coach
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCoach(@PathVariable Long id) {
        if (coachService.deleteCoach(id)) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // PUBLIC - Ai cũng có thể assign coach
    @PostMapping("assign")
    public ResponseEntity assignCoach(@RequestBody AssignRequest assignRequest) {
        Coach coach = coachService.assignCoach(assignRequest);
        return ResponseEntity.ok(coach);
    }

    // PUBLIC - Ai cũng có thể xem dashboard coaches
    @GetMapping("/dashboard")
    public ResponseEntity<Map<String, Object>> getCoachDashboardData() {
        Map<String, Object> dashboardData = coachService.getCoachDashboardData();
        return ResponseEntity.ok(dashboardData);
    }

    // PUBLIC - Ai cũng có thể edit coach (admin style)
    @PutMapping("/admin/{id}/edit")
    public ResponseEntity<Coach> adminEditCoach(@PathVariable Long id, @RequestBody CoachDTO coachDTO) {
        Coach updated = coachService.adminEditCoach(id, coachDTO);
        if (updated != null) {
            return ResponseEntity.ok(updated);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{id}/profile")
    public ResponseEntity<CoachDTO> getCoachProfile(@PathVariable Long id) {
        CoachDTO profile = coachService.getCoachProfile(id);
        return ResponseEntity.ok(profile);
    }

}