package com.smokingcessation.controller;

import com.smokingcessation.dto.RegisterSlotDTO;
import com.smokingcessation.entity.AccountSlot;
import com.smokingcessation.entity.Slot;
import com.smokingcessation.service.SlotService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/slot")
@SecurityRequirement(name = "api")
public class SlotController
{
    @Autowired

    SlotService slotService;
    @PostMapping
    public void generateSlot()
    {
        slotService.generateSlots();
    }
    @GetMapping
    public ResponseEntity getSlots()
    {
        List<Slot> slots = slotService.get();
        return ResponseEntity.ok(slots);
    }
    @PostMapping("register")
    public ResponseEntity registerSlot(@RequestBody RegisterSlotDTO registerSlotDTO )
    {
        List<AccountSlot>  accountSlots = slotService.registerSlot(registerSlotDTO);
        return ResponseEntity.ok(accountSlots);
    }
}