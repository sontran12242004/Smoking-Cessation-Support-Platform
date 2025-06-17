package com.smokingcessation.controller;

import com.smokingcessation.dto.AccountDTO;
import com.smokingcessation.dto.LoginDTO;
import com.smokingcessation.entity.Account;
import com.smokingcessation.service.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthenticationController {

    @Autowired
    AuthenticationService authenticationService;

    // api > service > repository

    @PostMapping("/api/register")
    public ResponseEntity register(@RequestBody Account account){
        Account newAccount = authenticationService.register(account);
        return ResponseEntity.ok(newAccount);
    }
    @PostMapping("/api/login")
    public ResponseEntity login(@RequestBody LoginDTO loginDTO){

        AccountDTO account = authenticationService.login(loginDTO);

        return ResponseEntity.ok(account);
    }
}
