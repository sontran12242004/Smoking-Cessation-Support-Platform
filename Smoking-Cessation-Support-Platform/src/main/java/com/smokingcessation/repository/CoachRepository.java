package com.smokingcessation.repository;

import com.smokingcessation.entity.Coach;
import com.smokingcessation.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CoachRepository extends JpaRepository<Coach, Long> {
    
    // Tìm coach theo account
    @Query("SELECT c FROM Coach c WHERE c.account = :account")
    Coach findByAccount(@Param("account") Account account);

}
