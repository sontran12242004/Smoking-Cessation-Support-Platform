package com.smokingcessation.repository;

import com.smokingcessation.entity.Coach;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CoachRepository extends JpaRepository<Coach, Long> {
    static Optional<Coach> findByEmail(String email);
    boolean existsByEmail(String email);
    List<Coach> findByIsActiveTrue();
    Optional<Coach> findByEmailAndIsActiveTrue(String email);
} 