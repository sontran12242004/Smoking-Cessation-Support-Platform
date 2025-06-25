package com.smokingcessation.controller;

import com.smokingcessation.dto.DailyProcessDTO;
import com.smokingcessation.dto.HealthMetricsDTO;
import com.smokingcessation.service.DailyProcessService;
import com.smokingcessation.service.HealthMetricsService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/daily-process")

public class DailyProcessController {
    
    @Autowired
    private DailyProcessService dailyProcessService;
    
    @Autowired
    private HealthMetricsService healthMetricsService;
    
    // Submit daily form and update health metrics
    @PostMapping("/member/{memberId}/submit")
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
    
    // Get updated health metrics after submitting daily form
    @GetMapping("/member/{memberId}/health-metrics")
    public ResponseEntity<HealthMetricsDTO> getUpdatedHealthMetrics(@PathVariable Long memberId) {
        try {
            // Get member and calculate health metrics
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
    
    @PostMapping("/member/{memberId}")
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
    
    @GetMapping("/member/{memberId}")
    public ResponseEntity<List<DailyProcessDTO>> getAllProcessesForMember(@PathVariable Long memberId) {
        List<DailyProcessDTO> processes = dailyProcessService.getAllProcessesForMember(memberId);
        return ResponseEntity.ok(processes);
    }

    @GetMapping("/member/{memberId}/date/{date}")
    public ResponseEntity<DailyProcessDTO> getProcessForDate(
            @PathVariable Long memberId,
            @PathVariable String date) {
        LocalDate parsedDate = LocalDate.parse(date);
        Optional<DailyProcessDTO> processOpt = dailyProcessService.getProcessForDate(memberId, parsedDate);
        return processOpt
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/member/{memberId}/range")
    public ResponseEntity<List<DailyProcessDTO>> getProcessesForDateRange(
            @PathVariable Long memberId,
            @RequestParam String startDate,
            @RequestParam String endDate) {
        LocalDate parsedStartDate = LocalDate.parse(startDate);
        LocalDate parsedEndDate = LocalDate.parse(endDate);
        List<DailyProcessDTO> processes = dailyProcessService.getProcessesForDateRange(memberId, parsedStartDate, parsedEndDate);
        return ResponseEntity.ok(processes);
    }

    @DeleteMapping("/{processId}")
    public ResponseEntity<Void> deleteDailyProcess(@PathVariable Long processId) {
        dailyProcessService.deleteDailyProcess(processId);
        return ResponseEntity.noContent().build();
    }
}
