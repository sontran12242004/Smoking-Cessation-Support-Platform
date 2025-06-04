package com.smokingcessation.controller;

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

    @PostMapping("/api/register")
    public ResponseEntity register(@RequestBody Account account){

        Account newAccount = authenticationService.register(account);
        return ResponseEntity.ok(newAccount);
    }
}
