package com.smokingcessation.controller;

import com.smokingcessation.dto.DailyProcessDTO;
import com.smokingcessation.dto.HealthMetricsDTO;
import com.smokingcessation.service.DailyProcessService;
import com.smokingcessation.service.HealthMetricsService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/daily-process")
@CrossOrigin("*")
public class DailyProcessController {
    
    @Autowired
    private DailyProcessService dailyProcessService;
    
    @Autowired
    private HealthMetricsService healthMetricsService;
    
    // AUTHENTICATED - Members (chỉ submit cho mình), Admin (submit cho bất kỳ ai)
    @PostMapping("/member/{memberId}/submit")
    @PreAuthorize("hasAnyRole('MEMBERS', 'ADMIN')")
    public ResponseEntity<DailyProcessDTO> submitDailyForm(
            @PathVariable Long memberId,
            @Valid @RequestBody DailyProcessDTO dailyProcessDTO) {
        dailyProcessDTO.setMemberId(memberId);
        if (dailyProcessDTO.getDate() == null) {
            dailyProcessDTO.setDate(LocalDate.now());
        }
        DailyProcessDTO savedProcess = dailyProcessService.saveDailyProcess(dailyProcessDTO);
        return ResponseEntity.ok(savedProcess);
    }
    
    // AUTHENTICATED - Members (chỉ xem metrics của mình), Coach (xem assigned members), Admin (xem tất cả)
    @GetMapping("/member/{memberId}/health-metrics")
    @PreAuthorize("hasAnyRole('MEMBERS', 'COACH', 'ADMIN')")
    public ResponseEntity<HealthMetricsDTO> getUpdatedHealthMetrics(@PathVariable Long memberId) {
        try {
            var member = dailyProcessService.getMemberById(memberId);
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
    @PreAuthorize("hasAnyRole('MEMBERS', 'ADMIN')")
    public ResponseEntity<DailyProcessDTO> addDailyProcess(
            @PathVariable Long memberId,
            @Valid @RequestBody DailyProcessDTO dailyProcessDTO) {
        dailyProcessDTO.setMemberId(memberId);
        if (dailyProcessDTO.getDate() == null) {
            dailyProcessDTO.setDate(LocalDate.now());
        }
        DailyProcessDTO savedProcess = dailyProcessService.saveDailyProcess(dailyProcessDTO);
        return ResponseEntity.ok(savedProcess);
    }
    
    // AUTHENTICATED - Members (chỉ xem của mình), Coach (xem assigned members), Admin (xem tất cả)
    @GetMapping("/member/{memberId}")
    @PreAuthorize("hasAnyRole('MEMBERS', 'COACH', 'ADMIN')")
    public ResponseEntity<List<DailyProcessDTO>> getAllProcessesForMember(@PathVariable Long memberId) {
        List<DailyProcessDTO> processes = dailyProcessService.getAllProcessesForMember(memberId);
        return ResponseEntity.ok(processes);
    }

    // AUTHENTICATED - Members (chỉ xem của mình), Coach (xem assigned members), Admin (xem tất cả)
    @GetMapping("/member/{memberId}/date/{date}")
    @PreAuthorize("hasAnyRole('MEMBERS', 'COACH', 'ADMIN')")
    public ResponseEntity<DailyProcessDTO> getProcessForDate(
            @PathVariable Long memberId,
            @PathVariable String date) {
        LocalDate parsedDate = LocalDate.parse(date);
        Optional<DailyProcessDTO> processOpt = dailyProcessService.getProcessForDate(memberId, parsedDate);
        return processOpt
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // AUTHENTICATED - Members (chỉ xem của mình), Coach (xem assigned members), Admin (xem tất cả)
    @GetMapping("/member/{memberId}/range")
    @PreAuthorize("hasAnyRole('MEMBERS', 'COACH', 'ADMIN')")
    public ResponseEntity<List<DailyProcessDTO>> getProcessesForDateRange(
            @PathVariable Long memberId,
            @RequestParam String startDate,
            @RequestParam String endDate) {
        LocalDate parsedStartDate = LocalDate.parse(startDate);
        LocalDate parsedEndDate = LocalDate.parse(endDate);
        List<DailyProcessDTO> processes = dailyProcessService.getProcessesForDateRange(memberId, parsedStartDate, parsedEndDate);
        return ResponseEntity.ok(processes);
    }

    // AUTHENTICATED - Members (chỉ xóa của mình), Admin (xóa bất kỳ ai)
    @DeleteMapping("/{processId}")
    @PreAuthorize("hasAnyRole('MEMBERS', 'ADMIN')")
    public ResponseEntity<Void> deleteDailyProcess(@PathVariable Long processId) {
        dailyProcessService.deleteDailyProcess(processId);
        return ResponseEntity.noContent().build();
    }
}
