package com.smokingcessation.controller;

import com.smokingcessation.dto.AdminDTO;
import com.smokingcessation.entity.Admin;
import com.smokingcessation.service.AdminService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/admins")
@SecurityRequirement(name = "api")

public class AdminController {

    @Autowired
    private AdminService adminService;
    // ADMIN - Chỉ admin mới có thể xem danh sách admin
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<Admin> getAllAdmins() {
        return adminService.getAllAdmins();
    }


    // ADMIN - Chỉ admin mới có thể xem thông tin admin khác
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Admin> getAdminById(@PathVariable Long id) {
        return adminService.getAdminById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // ADMIN - Chỉ admin mới có thể tạo admin mới
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Admin createAdmin(@RequestBody AdminDTO adminDTO) {
        return adminService.createAdmin(adminDTO);
    }

    // ADMIN - Chỉ admin mới có thể cập nhật admin khác
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Admin> updateAdmin(@PathVariable Long id, @RequestBody Admin admin) {
        Admin updated = adminService.updateAdmin(id, admin);
        if (updated != null) {
            return ResponseEntity.ok(updated);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // ADMIN - Chỉ admin mới có thể xóa admin khác
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteAdmin(@PathVariable Long id) {
        if (adminService.deleteAdmin(id)) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
