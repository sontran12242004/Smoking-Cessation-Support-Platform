package com.smokingcessation.repository;

import com.smokingcessation.dto.HealthMetricsDTO;
import com.smokingcessation.entity.Members;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Optional;

@Repository
public interface HealthMetricsRepository extends JpaRepository<HealthMetricsDTO, Long> {
    @Query("SELECT h FROM HealthMetricsDTO h WHERE h.user = :user AND DATE(h.createdAt) = :date")
    Optional<HealthMetricsDTO> findByUserAndDate(@Param("user") Members user, @Param("date") LocalDate date);
}
