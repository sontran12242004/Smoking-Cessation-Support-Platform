package com.smokingcessation.controller;

import com.smokingcessation.dto.DailyProcessDTO;
import com.smokingcessation.service.DailyProcessService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
