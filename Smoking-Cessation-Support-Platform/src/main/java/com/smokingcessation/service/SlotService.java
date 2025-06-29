package com.smokingcessation.service;
import com.smokingcessation.dto.RegisterSlotDTO;
import com.smokingcessation.entity.Account;
import com.smokingcessation.entity.AccountSlot;
import com.smokingcessation.entity.Coach;
import com.smokingcessation.entity.Slot;
import com.smokingcessation.exception.exceptions.BadRequestException;
import com.smokingcessation.repository.AccountSlotRepository;
import com.smokingcessation.repository.AuthenticationRepository;
import com.smokingcessation.repository.SlotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class SlotService {
    @Autowired
    SlotRepository slotRepository;
    @Autowired
    AuthenticationRepository authenticationRepository;
    @Autowired
    AccountSlotRepository accountSlotRepository;


    public List<Slot> get() {
        return slotRepository.findAll();
    }

    public List<AccountSlot> registerSlot(RegisterSlotDTO registerSlotDTO) {
        Account account = authenticationRepository.findById(registerSlotDTO.getAccountId()).get();
        List<AccountSlot> accountSlots = new ArrayList<>();
        List<AccountSlot> oldAccountSlot = accountSlotRepository.findAccountSlotsByAccountAndDate(account, registerSlotDTO.getDate());

        if (!oldAccountSlot.isEmpty()) {
            //=> da co lich roi
            throw new BadRequestException("........");
        }

        for (Slot slot : slotRepository.findAll()) {
            AccountSlot accountSlot = new AccountSlot();
            accountSlot.setSlot(slot);
            accountSlot.setAccount(account);
            accountSlot.setDate(registerSlotDTO.getDate());
            accountSlots.add(accountSlot);
        }

        return accountSlotRepository.saveAll(accountSlots);
    }


    public void generateSlots() {
        // Bắt đầu từ 9:00 sáng đến 16:30 chiều
        LocalTime start = LocalTime.of(9, 0);
        LocalTime end = LocalTime.of(16, 30);
        List<Slot> slots = new ArrayList<>();

        while (start.plusMinutes(45).isBefore(end) || start.plusMinutes(45).equals(end)) {
            Slot slot = new Slot();
            slot.setStart(start);
            slot.setLabel(start.toString());
            slot.setEnd(start.plusMinutes(45));

            slots.add(slot);
            start = start.plusMinutes(45); // Di chuyển sang slot kế tiếp
        }

        slotRepository.saveAll(slots);
    }


    public List<AccountSlot> getRegisteredSlots(Long coachId, LocalDate date) {
        Account coach = authenticationRepository.findById(coachId)
                .orElseThrow(() -> new BadRequestException("Coach not found"));

        List<AccountSlot> accountSlots = accountSlotRepository.findAccountSlotsByAccountAndDate(coach,date);
        List<AccountSlot> slotsAvailable = new ArrayList<>();
        for(AccountSlot accountSlot : accountSlots){
            if(accountSlot.isAvailable()){
                slotsAvailable.add(accountSlot);
            }

        }
        return  slotsAvailable;
    }
}


