package com.smokingcessation.repository;

import com.smokingcessation.entity.CigaretteLog;
import com.smokingcessation.entity.Members;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Optional;

@Repository
public interface CigaretteLogRepository extends JpaRepository<CigaretteLog, Long> {
    Optional<CigaretteLog> findByUserAndLogDate(Members user, LocalDate logDate);
} 