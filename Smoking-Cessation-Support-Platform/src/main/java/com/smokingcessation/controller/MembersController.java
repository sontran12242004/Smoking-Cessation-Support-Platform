package com.smokingcessation.controller;

import com.smokingcessation.entity.Account;
import com.smokingcessation.dto.DailyProcessDTO;
import com.smokingcessation.service.DailyProcessService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin("*")
public class MembersController {
    ArrayList<Account> accounts = new ArrayList<>();
    
    @Autowired
    private DailyProcessService dailyProcessService;

    @GetMapping
    public ResponseEntity getListUser(){
        System.out.println("trả về danh sách người dùng");
        return ResponseEntity.ok(accounts);
    }

    @PostMapping
    public ResponseEntity createNewUser(@Valid @RequestBody Account account){
        // student => FE cho ng dùng điền r đẩy xuống cho BE
        accounts.add(account);
        return ResponseEntity.ok(account);
    }

    @GetMapping("/api/users/id")
    public void getUserById(){
        
    }
    
    // Daily Process endpoints
    
    @PostMapping("/{memberId}/daily-process")
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

    @GetMapping("/{memberId}/daily-process")
    public ResponseEntity<List<DailyProcessDTO>> getAllProcessesForMember(@PathVariable Long memberId) {
        List<DailyProcessDTO> processes = dailyProcessService.getAllProcessesForMember(memberId);
        return ResponseEntity.ok(processes);
    }

    @GetMapping("/{memberId}/daily-process/date/{date}")
    public ResponseEntity<DailyProcessDTO> getProcessForDate(
            @PathVariable Long memberId,
            @PathVariable String date) {
        LocalDate parsedDate = LocalDate.parse(date);
        Optional<DailyProcessDTO> processOpt = dailyProcessService.getProcessForDate(memberId, parsedDate);
        return processOpt
                .map(process -> ResponseEntity.ok(process))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{memberId}/daily-process/range")
    public ResponseEntity<List<DailyProcessDTO>> getProcessesForDateRange(
            @PathVariable Long memberId,
            @RequestParam String startDate,
            @RequestParam String endDate) {
        LocalDate parsedStartDate = LocalDate.parse(startDate);
        LocalDate parsedEndDate = LocalDate.parse(endDate);
        List<DailyProcessDTO> processes = dailyProcessService.getProcessesForDateRange(memberId, parsedStartDate, parsedEndDate);
        return ResponseEntity.ok(processes);
    }

    @DeleteMapping("/daily-process/{processId}")
    public ResponseEntity<Void> deleteDailyProcess(@PathVariable Long processId) {
        dailyProcessService.deleteDailyProcess(processId);
        return ResponseEntity.noContent().build();
    }
}
