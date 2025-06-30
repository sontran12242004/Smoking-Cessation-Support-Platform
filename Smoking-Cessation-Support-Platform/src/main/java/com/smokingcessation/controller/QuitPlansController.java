package com.smokingcessation.controller;

import com.smokingcessation.dto.QuitPlansDTO;
import com.smokingcessation.service.QuitPlansService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/quit-plans")
@SecurityRequirement(name = "api")
public class QuitPlansController {

    @Autowired
    private QuitPlansService quitPlansService;

    // Tạo quit plan (chỉ 1 lần/1 member)
    @PostMapping("/member/{memberId}")
    @PreAuthorize("hasAnyRole('MEMBERS', 'ADMIN')")
    public ResponseEntity<?> createQuitPlanForMember(
            @PathVariable Long memberId,
            @RequestBody QuitPlansDTO quitPlanDTO) {
        try {
            QuitPlansDTO createdPlan = quitPlansService.createQuitPlanForMember(memberId, quitPlanDTO);
            return ResponseEntity.ok(createdPlan);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Lấy quit plan của member
    @GetMapping("/member/{memberId}")
    @PreAuthorize("hasAnyRole('MEMBERS', 'COACH', 'ADMIN')")
    public ResponseEntity<?> getQuitPlan(@PathVariable Long memberId) {
        QuitPlansDTO quitPlan = quitPlansService.getQuitPlan(memberId);
        if (quitPlan == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(quitPlan);
    }

    // Cập nhật quit plan (nếu cho phép)
    @PutMapping("/member/{memberId}")
    @PreAuthorize("hasAnyRole('MEMBERS', 'ADMIN')")
    public ResponseEntity<?> updateQuitPlan(
            @PathVariable Long memberId,
            @RequestBody QuitPlansDTO quitPlanDTO) {
        try {
            QuitPlansDTO updatedPlan = quitPlansService.updateQuitPlan(memberId, quitPlanDTO);
            return ResponseEntity.ok(updatedPlan);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Xóa quit plan
    @DeleteMapping("/member/{memberId}")
    @PreAuthorize("hasAnyRole('MEMBERS', 'ADMIN')")
    public ResponseEntity<?> deleteQuitPlan(@PathVariable Long memberId) {
        try {
            quitPlansService.deleteQuitPlan(memberId);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}