package com.smokingcessation.controller;

import com.smokingcessation.dto.BadgedDTO;
import com.smokingcessation.entity.Members;
import com.smokingcessation.service.BadgedService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/badges")
public class BadgedController {

    @Autowired
    private BadgedService badgedService;

    // Lấy danh sách tất cả huy hiệu
    @GetMapping
    public ResponseEntity<List<BadgedDTO>> getAllBadges() {
        return ResponseEntity.ok(badgedService.getAllBadges());
    }

    // Lấy huy hiệu theo ID
    @GetMapping("/{id}")
    public ResponseEntity<BadgedDTO> getBadgeById(@PathVariable Long id) {
        return ResponseEntity.ok(badgedService.getBadgeById(id));
    }

    // Lấy danh sách huy hiệu của một người dùng
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<BadgedDTO>> getBadgesByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(badgedService.getBadgesByUserId(userId));
    }

    // Tạo huy hiệu mới (chỉ ADMIN)
    @PostMapping
    public ResponseEntity<BadgedDTO> createBadge(
            @RequestBody BadgedDTO badgedDTO,
            @RequestAttribute("user") Members admin) {
        return ResponseEntity.ok(badgedService.createBadge(badgedDTO, admin));
    }

    // Cập nhật thông tin huy hiệu (chỉ ADMIN)
    @PutMapping("/{id}")
    public ResponseEntity<BadgedDTO> updateBadge(
            @PathVariable Long id,
            @RequestBody BadgedDTO badgedDTO,
            @RequestAttribute("user") Members admin) {
        return ResponseEntity.ok(badgedService.updateBadge(id, badgedDTO, admin));
    }

    // Vô hiệu hóa huy hiệu (chỉ ADMIN)
    @PutMapping("/{id}/deactivate")
    public ResponseEntity<Void> deactivateBadge(
            @PathVariable Long id,
            @RequestAttribute("user") Members admin) {
        badgedService.deactivateBadge(id, admin);
        return ResponseEntity.ok().build();
    }

    // Kích hoạt lại huy hiệu (chỉ ADMIN)
    @PutMapping("/{id}/reactivate")
    public ResponseEntity<Void> reactivateBadge(
            @PathVariable Long id,
            @RequestAttribute("user") Members admin) {
        badgedService.reactivateBadge(id, admin);
        return ResponseEntity.ok().build();
    }

    // Xóa huy hiệu (chỉ ADMIN)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBadge(
            @PathVariable Long id,
            @RequestAttribute("user") Members admin) {
        badgedService.deleteBadge(id, admin);
        return ResponseEntity.ok().build();
    }
}
