package com.smokingcessation.repository;

import com.smokingcessation.entity.Coach;
import com.smokingcessation.enums.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CoachRepository extends JpaRepository<Coach, Long> {
    List<Coach> findByIsActiveTrue();
    Optional<Coach> findByIdAndRole(Long id, Role role);
   Optional<Coach> findByEmail(String email);
    boolean existsByEmail(String email);
} 