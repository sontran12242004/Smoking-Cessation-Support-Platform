package com.smokingcessation.repository;

import com.smokingcessation.entity.Account;
import com.smokingcessation.entity.AccountSlot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.time.LocalDate;
import java.util.List;

public interface AccountSlotRepository extends JpaRepository<AccountSlot,Long> {

    List<AccountSlot> findAccountSlotsByAccountAndDate(Account account, LocalDate date);

    // Sửa method để sử dụng slot.id thay vì slotId trực tiếp
    @Query("SELECT as FROM AccountSlot as WHERE as.slot.id = :slotId AND as.account = :account AND as.date = :date")
    AccountSlot findAccountSlotBySlotIdAndAccountAndDate(@Param("slotId") long slotId, @Param("account") Account account, @Param("date") LocalDate date);

}