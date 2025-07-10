package com.smokingcessation.controller;

import com.smokingcessation.service.StatisticsService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/statistics")
@SecurityRequirement(name = "api")
public class StatisticsController {

    @Autowired
    private StatisticsService statisticsService;

    // API tổng hợp thống kê cốt lõi cho Admin Dashboard
    @GetMapping("/dashboard")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> getAdminDashboardStatistics(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        return ResponseEntity.ok(statisticsService.getComprehensiveDashboardStatistics(startDate, endDate, 0));
    }

    // API đơn giản chỉ cho tổng quan nhanh (optional - nếu cần lightweight)
    @GetMapping("/overview")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> getQuickOverview() {
        return ResponseEntity.ok(statisticsService.getSystemOverview());
    }
}