package com.smokingcessation.repository;

import com.smokingcessation.entity.Account;
import com.smokingcessation.entity.AccountSlot;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;

public interface AccountSlotRepository extends JpaRepository<AccountSlot,Long> {

    List<AccountSlot> findAccountSlotsByAccountAndDate(Account account, LocalDate date);

    AccountSlot findAccountSlotBySlotIdAndAccountAndDate(long slotId, Account account, LocalDate date);

}
