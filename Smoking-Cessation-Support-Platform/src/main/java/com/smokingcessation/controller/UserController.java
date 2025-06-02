package com.smokingcessation.controller;

import com.smokingcessation.entity.Account;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping("/api/student")
@CrossOrigin("*")
public class UserController {
    ArrayList<Account> accounts = new ArrayList<>();

    @GetMapping
    public ResponseEntity getListStudent(){
        System.out.println("trả về danh sách sinh viên");
        return ResponseEntity.ok(accounts);
    }

    @PostMapping
    public ResponseEntity createNewStudent(@Valid @RequestBody Account user){
        // student => FE cho ng dùng điền r đẩy xuống cho BE
        accounts.add(user);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/api/student/id")
    public void getStudentById(){

    }
}
