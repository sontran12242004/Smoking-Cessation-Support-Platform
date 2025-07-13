package com.smokingcessation.repository;

import com.smokingcessation.entity.Account;
import com.smokingcessation.enums.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AuthenticationRepository extends JpaRepository<Account, Long> {
    Account findAccountByEmail(String email);
    List<Account> findByRole (Role role);
    Optional<Account> findByfullName(String fullName);
}
