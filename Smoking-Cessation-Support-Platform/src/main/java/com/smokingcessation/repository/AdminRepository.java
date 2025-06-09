package com.smokingcessation.repository;

import com.smokingcessation.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {
    Admin findAccountByEmail(String email);
    Optional<Admin> findByEmailAndIsActiveTrue(String email);
}