package com.smokingcessation.controller;


import com.smokingcessation.dto.ReminderDTO;
import com.smokingcessation.service.ReminderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/reminders")
public class ReminderController {
    @Autowired
    private ReminderService reminderService;

    @PostMapping("/all-members")
    public ResponseEntity<String> createForAllMembers(@RequestBody ReminderDTO dto) {
        reminderService.createReminderForAllMembers(dto.getContent());
        return ResponseEntity.ok("Reminders sent to all members!");
    }
}
