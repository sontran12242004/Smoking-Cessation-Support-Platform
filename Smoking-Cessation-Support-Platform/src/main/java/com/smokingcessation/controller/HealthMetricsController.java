package com.smokingcessation.controller;

import com.smokingcessation.dto.HealthMetricsDTO;
import com.smokingcessation.entity.Members;
import com.smokingcessation.repository.MembersRepository;
import com.smokingcessation.service.HealthMetricsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/health-metrics")
public class HealthMetricsController {

    @Autowired
    private MembersRepository userRepository;

    @Autowired
    private HealthMetricsService healthMetricsService;

    @GetMapping("/{userId}")
    public ResponseEntity<HealthMetricsDTO> getHealthMetrics(@PathVariable Long userId) {
        Members user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng"));

        if (user.getQuitDate() == null) {
            throw new RuntimeException("Người dùng chưa thiết lập ngày bắt đầu cai thuốc");
        }
        if (user.getDailyCost() <= 0) {
            throw new RuntimeException("Người dùng chưa thiết lập số tiền hút thuốc mỗi ngày");
        }

        HealthMetricsDTO metrics = healthMetricsService.getOrCreateTodayMetrics(user);
        return ResponseEntity.ok(metrics);
    }
}
