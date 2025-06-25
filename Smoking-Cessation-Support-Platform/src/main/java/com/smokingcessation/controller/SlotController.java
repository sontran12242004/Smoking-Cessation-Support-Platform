package com.smokingcessation.controller;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.smokingcessation.dto.RegisterSlotDTO;
import com.smokingcessation.entity.AccountSlot;
import com.smokingcessation.entity.Slot;
import com.smokingcessation.service.SlotService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/slot")
@SecurityRequirement(name = "api")
public class SlotController
{
    @Autowired
    SlotService slotService;
    
    // ADMIN - Chỉ admin mới có thể generate slots
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public void generateSlot()
    {
        slotService.generateSlots();
    }
    
    // AUTHENTICATED - Members, Coach, Admin đều có thể xem slots
    @GetMapping
    @PreAuthorize("hasAnyRole('MEMBERS', 'COACH', 'ADMIN')")
    public ResponseEntity getSlots()
    {
        List<Slot> slots = slotService.get();
        return ResponseEntity.ok(slots);
    }
    
    // AUTHENTICATED - Members (đăng ký slot cho mình), Admin (đăng ký cho bất kỳ ai)
    @PostMapping("register")
    @PreAuthorize("hasAnyRole('MEMBERS', 'ADMIN')")
    public ResponseEntity registerSlot(@RequestBody RegisterSlotDTO registerSlotDTO )
    {
        List<AccountSlot>  accountSlots = slotService.registerSlot(registerSlotDTO);
        return ResponseEntity.ok(accountSlots);
    }

    // AUTHENTICATED - Coach (xem slots đã đăng ký), Admin (xem tất cả)
    @GetMapping("/registered")
    @PreAuthorize("hasAnyRole('COACH', 'ADMIN')")
    public ResponseEntity getRegisteredSlots(
            @RequestParam Long Coach,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date)
    {
        List<AccountSlot> slots = slotService.getRegisteredSlots(Coach,date);
        return ResponseEntity.ok(slots);
    }
}

