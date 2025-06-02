package com.smokingcessation.repository;

import com.smokingcessation.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthenticationRepository extends JpaRepository<Account, Long> {
}
