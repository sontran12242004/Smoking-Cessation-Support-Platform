package com.smokingcessation.repository;

import com.smokingcessation.entity.Admin;
import com.smokingcessation.enums.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {
    Admin findAdminAccountByEmail(String email);
    Optional<Admin> findByEmail(String email);
    List<Admin> role(Role role);
}