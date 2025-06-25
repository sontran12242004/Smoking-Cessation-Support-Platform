package com.smokingcessation.controller;

import com.smokingcessation.dto.ReportDTO;
import com.smokingcessation.entity.Report;
import com.smokingcessation.service.ReportService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@SecurityRequirement(name = "api")
@RequestMapping("/api/report")
public class ReportController {
    @Autowired
    private ReportService reportService;

    // AUTHENTICATED - Members (chỉ report cho mình), Admin (report cho bất kỳ ai)
    @PostMapping
    @PreAuthorize("hasAnyRole('MEMBERS', 'ADMIN')")
    public ResponseEntity createReport(@RequestBody ReportDTO reportRequest) {
        Report newReport = reportService.create(reportRequest);
        return ResponseEntity.ok(newReport);
    }
}