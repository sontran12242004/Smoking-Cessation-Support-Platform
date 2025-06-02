package com.smokingcessation.controller;

import com.smokingcessation.dto.HealthMetrics;
import com.smokingcessation.dto.Users;
import com.smokingcessation.repository.UserRepository;
import com.smokingcessation.service.HealthMetricsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/health-metrics")
public class HealthMetricsController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private HealthMetricsService healthMetricsService;

    @GetMapping("/{userId}")
    public ResponseEntity<HealthMetrics> getHealthMetrics(@PathVariable Long userId) {
        Users user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng"));

        if (user.getQuitDate() == null) {
            throw new RuntimeException("Người dùng chưa thiết lập ngày bắt đầu cai thuốc");
        }
        if (user.getDailyCost() <= 0) {
            throw new RuntimeException("Người dùng chưa thiết lập số tiền hút thuốc mỗi ngày");
        }

        HealthMetrics metrics = healthMetricsService.getOrCreateTodayMetrics(user);
        return ResponseEntity.ok(metrics);
    }
}
    