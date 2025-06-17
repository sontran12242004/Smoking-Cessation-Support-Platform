package com.smokingcessation.repository;

import com.smokingcessation.entity.DailyProcess;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface DailyProcessRepository extends JpaRepository<DailyProcess, Long> {
    // Find process entries for a specific member
    List<DailyProcess> findByMember_MemberID(Long memberId);
    
    // Find process entry for a specific member on a specific date
    Optional<DailyProcess> findByMember_MemberIDAndDate(Long memberId, LocalDate date);
    
    // Find process entries for a member within a date range
    List<DailyProcess> findByMember_MemberIDAndDateBetween(Long memberId, LocalDate startDate, LocalDate endDate);
}
