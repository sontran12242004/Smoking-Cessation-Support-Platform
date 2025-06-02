package com.smokingcessation.repository;

import com.smokingcessation.entity.CigaretteLog;
import com.smokingcessation.dto.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Optional;

@Repository
public interface CigaretteLogRepository extends JpaRepository<CigaretteLog, Long> {
    Optional<CigaretteLog> findByUserAndLogDate(Users user, LocalDate logDate);
} 