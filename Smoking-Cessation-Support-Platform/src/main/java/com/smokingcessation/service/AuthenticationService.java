package com.smokingcessation.service;


import com.smokingcessation.entity.Account;
import com.smokingcessation.exception.AccountNotFoundException;
import com.smokingcessation.model.LoginRequest;
import com.smokingcessation.repository.AuthenticationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {
    //Xu ly logic, nghiep vu.....
    @Autowired
    AuthenticationRepository authenticationRepository;

    public Account register(Account account){
        Account newAccount = authenticationRepository.save(account);
        return newAccount;
    }
    public Account login(LoginRequest loginRequest){
        boolean isValid = true;
        if(isValid){

        }
        else {
            throw new AccountNotFoundException("Account not found");
        }
        return null;
    }
}
