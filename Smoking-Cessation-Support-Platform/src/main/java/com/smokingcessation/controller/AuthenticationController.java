package com.smokingcessation.controller;


import com.smokingcessation.dto.AccountDTO;
import com.smokingcessation.dto.ForgotPasswordDTO;
import com.smokingcessation.dto.LoginDTO;
import com.smokingcessation.dto.ResetPasswordDTO;
import com.smokingcessation.entity.Account;
import com.smokingcessation.service.AuthenticationService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public ResponseEntity login(@RequestBody LoginDTO loginRequest){

        AccountDTO account = authenticationService.login(loginRequest);

        return ResponseEntity.ok(account);
    }
    @PostMapping("/api/forgot-password")
    public  ResponseEntity forgotPassword(@RequestBody ForgotPasswordDTO forgotPasswordRequest){
        authenticationService.forgotPassword(forgotPasswordRequest);
        return ResponseEntity.ok("Forgot Password successful");
    }

    @SecurityRequirement(name = "api")
    @PostMapping("/reset-password")
    public ResponseEntity resetPassword(@RequestBody ResetPasswordDTO resetPasswordDTO ){
        authenticationService.resetPassword(resetPasswordDTO);
        return ResponseEntity.ok("Reset Password Successfuly");
    }

//    @GetMapping("/doctors")
//    public ResponseEntity getDoctors(){
//        List<Account> doctors = authenticationService.getDoctors();
//        return ResponseEntity.ok(doctors);
//    }

}