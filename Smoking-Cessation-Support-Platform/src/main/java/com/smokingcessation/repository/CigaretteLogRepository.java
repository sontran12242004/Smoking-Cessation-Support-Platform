package com.smokingcessation.repository;

import com.smokingcessation.entity.CigaretteLog;
import com.smokingcessation.entity.Members;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Optional;

@Repository
public interface CigaretteLogRepository extends JpaRepository<CigaretteLog, Long> {
    Optional<CigaretteLog> findByUserAndLogDate(Members user, LocalDate logDate);
    
    // Tính tổng số điếu thuốc trong khoảng thời gian
    @Query("SELECT COALESCE(SUM(c.cigarettesSmoked), 0) FROM CigaretteLog c " +
           "WHERE c.user = :user AND c.logDate BETWEEN :startDate AND :endDate")
    Integer sumCigarettesByUserAndDateRange(@Param("user") Members user, 
                                           @Param("startDate") LocalDate startDate, 
                                           @Param("endDate") LocalDate endDate);
} 