package com.smokingcessation.controller;

import com.smokingcessation.repository.AuthReponsitory;
import com.smokingcessation.model.LoginRequest;
import com.smokingcessation.model.RegisterRequest;
import com.smokingcessation.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest request) {
        userService.register(request);
        return ResponseEntity.ok("User registered successfully");
    }

    @GetMapping("/login")
    public ResponseEntity<AuthReponsitory> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(userService.login(request));
    }
}
