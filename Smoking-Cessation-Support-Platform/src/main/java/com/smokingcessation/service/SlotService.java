package com.smokingcessation.service;

import com.smokingcessation.dto.RegisterSlotDTO;
import com.smokingcessation.entity.Account;
import com.smokingcessation.entity.AccountSlot;
import com.smokingcessation.entity.Slot;
import com.smokingcessation.exception.exceptions.BadRequestException;
import com.smokingcessation.repository.AccountSlotRepository;
import com.smokingcessation.repository.AuthenticationRepository;
import com.smokingcessation.repository.SlotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class SlotService
{
    @Autowired
    SlotRepository slotRepository;
    @Autowired
    AuthenticationRepository authenticationRepository;
    @Autowired
    AccountSlotRepository accountSlotRepository;


    public List<Slot> get()
    {
        return slotRepository.findAll();
    }
    public List<AccountSlot> registerSlot(RegisterSlotDTO registerSlotDTO)
    {
        Account account = authenticationRepository.findById(registerSlotDTO.getAccountId()).get();
        List<AccountSlot>  accountSlots = new ArrayList<>();
        List<AccountSlot> oldAccountSlot= accountSlotRepository.findAccountSlotsByAccountAndDate(account,registerSlotDTO.getDate());

        if(!oldAccountSlot.isEmpty())
        {
            //=> da co lich roi
            throw new BadRequestException("Already registed!!!");
        }

        for(Slot slot : slotRepository.findAll())
        {
            AccountSlot accountSlot = new AccountSlot();
            accountSlot.setSlot(slot);
            accountSlot.setAccount(account);
            accountSlot.setDate(registerSlotDTO.getDate());
            accountSlots.add(accountSlot);
        }

        return  accountSlotRepository.saveAll(accountSlots);
    }



    public void generateSlots() {
        //generate tu 7h sang toi 17h
        LocalTime start = LocalTime.of(7, 0);
        LocalTime end = LocalTime.of(17, 0);
        List<Slot> slots = new ArrayList<>();

        while(start.isBefore(end)) {
            Slot slot = new Slot();
            slot.setStart(start);
            slot.setLabel(start.toString());
            slot.setEnd(start.plusHours(30));

            slots.add(slot);
            start = start.plusMinutes(30);
        }
        slotRepository.saveAll(slots);
    }
}