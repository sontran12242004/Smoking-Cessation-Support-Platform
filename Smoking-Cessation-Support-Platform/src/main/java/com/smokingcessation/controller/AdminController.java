package com.smokingcessation.controller;

import com.smokingcessation.dto.AdminDTO;
import com.smokingcessation.entity.Account;
import com.smokingcessation.entity.Admin;
import com.smokingcessation.entity.Members;
import com.smokingcessation.enums.Role;
import com.smokingcessation.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin("*")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping("/login")
    public ResponseEntity<AdminDTO> login(@RequestBody Admin admin) {
        AdminDTO adminDTO = adminService.login(admin.getEmail(), admin.getPassword());
        if (adminDTO != null) {
            return ResponseEntity.ok(adminDTO);
        }
        return ResponseEntity.badRequest().build();
    }


    @GetMapping("/{email}")
    public ResponseEntity<Admin> getAdminByEmail(@PathVariable String email) {
        Admin admin = adminService.getAdminByEmail(email);
        if (admin != null) {
            return ResponseEntity.ok(admin);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/users")
    public ResponseEntity<List<Members>> getAllUsers() {
        return ResponseEntity.ok(adminService.getAllUsers());
    }

    @GetMapping("/accounts")
    public ResponseEntity<List<Account>> getAllAccounts() {
        return ResponseEntity.ok(adminService.getAllAccounts());
    }

    @PutMapping("/users/{email}/role")
    public ResponseEntity<Account> updateUserRole(
            @PathVariable String email,
            @RequestParam Role newRole) {
        Account updatedAccount = adminService.updateUserRole(email, newRole);
        if (updatedAccount != null) {
            return ResponseEntity.ok(updatedAccount);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/users/{email}")
    public ResponseEntity<Void> deleteUser(@PathVariable String email) {
        if (adminService.deleteUser(email)) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/statistics/users")
    public ResponseEntity<Long> getTotalUsers() {
        return ResponseEntity.ok(adminService.getTotalUsers());
    }

    @GetMapping("/users/{email}")
    public ResponseEntity<Members> getUserByEmail(@PathVariable String email) {
        Members user = adminService.findUserByEmail(email);
        if (user != null) {
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.notFound().build();
    }
}