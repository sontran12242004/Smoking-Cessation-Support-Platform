package com.smokingcessation.repository;

import com.smokingcessation.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AuthenticationRepository extends JpaRepository<Account, Long> {
    Account findAccountByEmail(String email);

//    List<Account> findAccounts();
}
