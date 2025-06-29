package com.smokingcessation.controller;

import com.smokingcessation.dto.DailyProcessDTO;
import com.smokingcessation.dto.HealthMetricsDTO;
import com.smokingcessation.service.DailyProcessService;
import com.smokingcessation.service.HealthMetricsService;
import com.smokingcessation.service.MembersService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/daily-process")
public class DailyProcessController {
    
    @Autowired
    private DailyProcessService dailyProcessService;
    
    @Autowired
    private HealthMetricsService healthMetricsService;
    
    @Autowired
    private MembersService membersService;
    
    // AUTHENTICATED - Members (chỉ submit cho mình), Admin (submit cho bất kỳ ai)
    @PostMapping("/member/{memberId}/submit")
    @SecurityRequirement(name = "api")
    public ResponseEntity<DailyProcessDTO> submitDailyForm(
            @PathVariable Long memberId,
            @Valid @RequestBody DailyProcessDTO dailyProcessDTO) {
        dailyProcessDTO.setMemberId(memberId);
        if (dailyProcessDTO.getDate() == null) {
            dailyProcessDTO.setDate(LocalDateTime.now());
        }
        DailyProcessDTO savedProcess = dailyProcessService.saveDailyProcess(dailyProcessDTO);
        return ResponseEntity.ok(savedProcess);
    }
    
    // AUTHENTICATED - Members (chỉ xem metrics của mình), Coach (xem assigned members), Admin (xem tất cả)
    @GetMapping("/member/{memberId}/health-metrics")
    @SecurityRequirement(name = "api")
    @PreAuthorize("hasAnyRole('MEMBERS', 'COACH', 'ADMIN')")
    public ResponseEntity<HealthMetricsDTO> getUpdatedHealthMetrics(@PathVariable Long memberId) {
        try {
            var member = membersService.getMemberById(memberId);
            if (member == null) {
                return ResponseEntity.notFound().build();
            }
            
            HealthMetricsDTO metrics = healthMetricsService.getOrCreateTodayMetrics(member);
            return ResponseEntity.ok(metrics);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    // AUTHENTICATED - Members (chỉ thêm cho mình), Admin (thêm cho bất kỳ ai)
    @PostMapping("/member/{memberId}")
    @SecurityRequirement(name = "api")
    public ResponseEntity<DailyProcessDTO> addDailyProcess(
            @PathVariable Long memberId,
            @Valid @RequestBody DailyProcessDTO dailyProcessDTO) {
        
        // Validate memberId
        if (memberId == null) {
            return ResponseEntity.badRequest().build();
        }
        
        dailyProcessDTO.setMemberId(memberId);
        if (dailyProcessDTO.getDate() == null) {
            dailyProcessDTO.setDate(LocalDateTime.now());
        }
        
        try {
            DailyProcessDTO savedProcess = dailyProcessService.saveDailyProcess(dailyProcessDTO);
            return ResponseEntity.ok(savedProcess);
        } catch (RuntimeException e) {
            if (e.getMessage().contains("Member not found")) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.badRequest().build();
        }
    }
    
    // AUTHENTICATED - Members (chỉ xem của mình), Coach (xem assigned members), Admin (xem tất cả)
    @GetMapping("/member/{memberId}")
    @SecurityRequirement(name = "api")
    @PreAuthorize("hasAnyRole('MEMBERS', 'COACH', 'ADMIN')")
    public ResponseEntity<List<DailyProcessDTO>> getAllProcessesForMember(@PathVariable Long memberId) {
        List<DailyProcessDTO> processes = dailyProcessService.getAllProcessesForMember(memberId);
        return ResponseEntity.ok(processes);
    }

    // AUTHENTICATED - Members (chỉ xem của mình), Coach (xem assigned members), Admin (xem tất cả)
    @GetMapping("/member/{memberId}/date/{date}")
    @SecurityRequirement(name = "api")
    @PreAuthorize("hasAnyRole('MEMBERS', 'COACH', 'ADMIN')")
    public ResponseEntity<DailyProcessDTO> getProcessForDate(
            @PathVariable Long memberId,
            @PathVariable LocalDateTime date) {
        Optional<DailyProcessDTO> processOpt = dailyProcessService.getProcessForDate(memberId, date);
        return processOpt
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // AUTHENTICATED - Members (chỉ xem của mình), Coach (xem assigned members), Admin (xem tất cả)
    @GetMapping("/member/{memberId}/range")
    @SecurityRequirement(name = "api")
    @PreAuthorize("hasAnyRole('MEMBERS', 'COACH', 'ADMIN')")
    public ResponseEntity<List<DailyProcessDTO>> getProcessesForDateRange(
            @PathVariable Long memberId,
            @RequestParam LocalDateTime startDate,
            @RequestParam LocalDateTime endDate) {
        List<DailyProcessDTO> processes = dailyProcessService.getProcessesForDateRange(memberId, startDate, endDate);
        return ResponseEntity.ok(processes);
    }

    // AUTHENTICATED - Members (chỉ xóa của mình), Admin (xóa bất kỳ ai)
    @DeleteMapping("/{processId}")
    @SecurityRequirement(name = "api")
    @PreAuthorize("hasAnyRole('MEMBERS', 'ADMIN')")
    public ResponseEntity<Void> deleteDailyProcess(@PathVariable Long processId) {
        dailyProcessService.deleteDailyProcess(processId);
        return ResponseEntity.noContent().build();
    }


    // AUTHENTICATED - Members (chỉ xem milestone đơn giản của mình), Coach, Admin đều xem được
    @GetMapping("/member/{memberId}/milestone-simple")
    @SecurityRequirement(name = "api")
    @PreAuthorize("hasAnyRole('MEMBERS', 'COACH', 'ADMIN')")
    public ResponseEntity<?> getSimpleMilestone(@PathVariable Long memberId) {
        Map<String, Object> result = dailyProcessService.getAllMilestoneAndProgressInfo(memberId);
        if (result == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(result);
    }
}
