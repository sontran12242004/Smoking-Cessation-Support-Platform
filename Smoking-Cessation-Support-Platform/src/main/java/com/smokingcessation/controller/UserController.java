package com.smokingcessation.controller;

import com.smokingcessation.entity.Account;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping("/api/users")
@CrossOrigin("*")
public class UserController {
    ArrayList<Account> accounts = new ArrayList<>();

    @GetMapping
    public ResponseEntity getListUser(){
        System.out.println("trả về danh sách người dùng");
        return ResponseEntity.ok(accounts);
    }

    @PostMapping
    public ResponseEntity createNewUser(@Valid @RequestBody Account account){
        // student => FE cho ng dùng điền r đẩy xuống cho BE
        accounts.add(account);
        return ResponseEntity.ok(account);
    }

    @GetMapping("/api/users/id")
    public void getUserById(){

    }
}
