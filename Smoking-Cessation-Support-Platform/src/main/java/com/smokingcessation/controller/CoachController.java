package com.smokingcessation.controller;

import com.smokingcessation.entity.Coach;
import com.smokingcessation.service.CoachService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/coaches")
public class CoachController {

    private final CoachService coachService;

    @Autowired
    public CoachController(CoachService coachService) {
        this.coachService = coachService;
    }

    // Lấy danh sách tất cả coach đang hoạt động
    @GetMapping
    public ResponseEntity<List<Coach>> getAllActiveCoaches() {
        return ResponseEntity.ok(coachService.getAllActiveCoaches());
    }

    // Tìm coach theo ID
    @GetMapping("/{id}")
    public ResponseEntity<Coach> getCoachById(@PathVariable Long id) {
        return ResponseEntity.ok(coachService.findCoachById(id));
    }

    // Tìm coach theo email
    @GetMapping("/email")
    public ResponseEntity<Coach> getCoachByEmail(@RequestParam String email) {
        return ResponseEntity.ok(coachService.findCoachByEmail(email));
    }

    // Tạo coach mới
    @PostMapping
    public ResponseEntity<Coach> createCoach(@RequestBody Coach coach) {
        return ResponseEntity.ok(coachService.createCoach(coach));
    }

    // Cập nhật coach theo ID
    @PutMapping("/{id}")
    public ResponseEntity<Coach> updateCoach(@PathVariable Long id, @RequestBody Coach updatedCoach) {
        return ResponseEntity.ok(coachService.updateCoach(id, updatedCoach));
    }

    // Vô hiệu hóa coach
    @PutMapping("/{id}/deactivate")
    public ResponseEntity<Void> deactivateCoach(@PathVariable Long id) {
        coachService.deactivateCoach(id);
        return ResponseEntity.noContent().build();
    }

    // Kích hoạt coach
    @PutMapping("/{id}/activate")
    public ResponseEntity<Void> activateCoach(@PathVariable Long id) {
        coachService.activateCoach(id);
        return ResponseEntity.noContent().build();
    }
}
