package com.smokingcessation.controller;

import com.smokingcessation.dto.ReportDTO;
import com.smokingcessation.entity.Report;
import com.smokingcessation.service.ReportService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@SecurityRequirement(name = "api")
@RequestMapping("/api/report")
public class ReportController {
    @Autowired
    private ReportService reportService;

    @PostMapping
    public ResponseEntity createReport(ReportDTO reportRequest) {
        Report newReport = reportService.create(reportRequest);
        return ResponseEntity.ok(newReport);
    }
}