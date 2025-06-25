package com.smokingcessation.controller;

import com.smokingcessation.dto.AssignRequest;
import com.smokingcessation.dto.CoachDTO;
import com.smokingcessation.entity.Coach;
import com.smokingcessation.service.CoachService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@SecurityRequirement(name = "api")
@RequestMapping("/api/coaches")
public class CoachController {

    @Autowired
    private CoachService coachService;

    @Autowired
    ModelMapper modelMapper;

    // AUTHENTICATED - Coach (xem tất cả), Admin (xem tất cả)
    @GetMapping
    @PreAuthorize("hasAnyRole('COACH', 'ADMIN')")
    public List<Coach> getAllCoaches() {
        return coachService.getAllCoaches();
    }

    // AUTHENTICATED - Coach (xem profile của mình), Admin (xem tất cả)
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('COACH', 'ADMIN')")
    public ResponseEntity<Coach> getCoachById(@PathVariable Long id) {
        return coachService.getCoachById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // ADMIN - Chỉ admin mới có thể tạo coach mới
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Coach createCoach(@RequestBody CoachDTO coachDTO) {
        Coach coach = modelMapper.map(coachDTO, Coach.class);
        return coachService.createCoach(coach);
    }

    // AUTHENTICATED - Coach (chỉ sửa profile của mình), Admin (sửa tất cả)
    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('COACH', 'ADMIN')")
    public ResponseEntity<Coach> updateCoach(@PathVariable Long id, @RequestBody Coach coach) {
        Coach updated = coachService.updateCoach(id, coach);
        if (updated != null) {
            return ResponseEntity.ok(updated);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // ADMIN - Chỉ admin mới có thể xóa coach
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteCoach(@PathVariable Long id) {
        if (coachService.deleteCoach(id)) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // ADMIN - Chỉ admin mới có thể assign coach
    @PostMapping("assign")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity assignCoach (@RequestBody AssignRequest assignRequest ) {
        Coach coach = coachService.assignCoach(assignRequest);
         return ResponseEntity.ok(coach);
    }
}
