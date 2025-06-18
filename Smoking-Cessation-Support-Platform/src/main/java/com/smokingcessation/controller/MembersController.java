package com.smokingcessation.controller;

import com.smokingcessation.entity.Account;
import com.smokingcessation.dto.DailyProcessDTO;
import com.smokingcessation.service.DailyProcessService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin("*")
public class MembersController {
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
