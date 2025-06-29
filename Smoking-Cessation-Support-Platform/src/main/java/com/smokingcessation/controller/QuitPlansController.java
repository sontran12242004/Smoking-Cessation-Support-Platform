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

    // AUTHENTICATED - Members (tạo quit plan cho mình), Admin (tạo cho bất kỳ ai)
    @PostMapping("/member/{memberId}")
    @PreAuthorize("hasAnyRole('MEMBERS', 'ADMIN')")
    public ResponseEntity<QuitPlansDTO> createQuitPlanForMember(
            @PathVariable Long memberId,
            @RequestBody QuitPlansDTO quitPlanDTO) {
        QuitPlansDTO createdPlan = quitPlansService.createQuitPlanForMember(memberId, quitPlanDTO);
        return ResponseEntity.ok(createdPlan);
    }

    // AUTHENTICATED - Members (xem quit plan của mình), Coach (xem assigned members), Admin (xem tất cả)
    @GetMapping("/member/{memberId}")
    @PreAuthorize("hasAnyRole('MEMBERS', 'COACH', 'ADMIN')")
    public ResponseEntity<QuitPlansDTO> getQuitPlan(@PathVariable Long memberId) {
        QuitPlansDTO quitPlan = quitPlansService.getQuitPlan(memberId);
        if (quitPlan == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(quitPlan);
    }

    // AUTHENTICATED - Members (cập nhật quit plan của mình), Admin (cập nhật tất cả)
    @PutMapping("/member/{memberId}")
    @PreAuthorize("hasAnyRole('MEMBERS', 'ADMIN')")
    public ResponseEntity<QuitPlansDTO> updateQuitPlan(
            @PathVariable Long memberId,
            @RequestBody QuitPlansDTO quitPlanDTO) {
        QuitPlansDTO updatedPlan = quitPlansService.updateQuitPlan(memberId, quitPlanDTO);
        return ResponseEntity.ok(updatedPlan);
    }

    // AUTHENTICATED - Members (xóa quit plan của mình), Admin (xóa tất cả)
    @DeleteMapping("/member/{memberId}")
    @PreAuthorize("hasAnyRole('MEMBERS', 'ADMIN')")
    public ResponseEntity<Void> deleteQuitPlan(@PathVariable Long memberId) {
        quitPlansService.deleteQuitPlan(memberId);
        return ResponseEntity.noContent().build();
    }
}