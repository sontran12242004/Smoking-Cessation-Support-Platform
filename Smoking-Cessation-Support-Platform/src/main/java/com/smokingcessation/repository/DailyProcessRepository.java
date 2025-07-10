package com.smokingcessation.repository;

import com.smokingcessation.entity.DailyProcess;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface DailyProcessRepository extends JpaRepository<DailyProcess, Long> {
    // Find process entries for a specific member
    List<DailyProcess> findByMember_MemberID(Long memberId);

    // Find process entry for a specific member on a specific date
    Optional<DailyProcess> findByMember_MemberIDAndDate(Long memberId, LocalDateTime date);

    // Find process entry for a specific member on a specific date (by date only)
    @Query("SELECT dp FROM DailyProcess dp WHERE dp.member.memberID = :memberId AND DATE(dp.date) = :date ORDER BY dp.date DESC")
    List<DailyProcess> findByMember_MemberIDAndDateOnly(@Param("memberId") Long memberId, @Param("date") LocalDate date);

    // Find process entries for a member within a date range
    List<DailyProcess> findByMember_MemberIDAndDateBetween(Long memberId, LocalDateTime startDate, LocalDateTime endDate);

    // Count total days smoke-free for a member (based on DailyProcess records)
    long countByMember_MemberID(Long memberId);

    // Find process entries for a member ordered by date ascending
    List<DailyProcess> findByMember_MemberIDOrderByDateAsc(Long memberId);
}
