package com.smokingcessation.repository;

import com.smokingcessation.entity.HealthMetrics;
import com.smokingcessation.entity.Members;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.Optional;

@Repository
public interface HealthMetricsRepository extends JpaRepository<HealthMetrics, Long> {
    @Query("SELECT h FROM HealthMetrics h WHERE h.user = :user AND DATE(h.createdAt) = :date")
    Optional<HealthMetrics> findByUserAndDate(@Param("user") Members user, @Param("date") LocalDate date);
}
