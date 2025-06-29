package com.smokingcessation.controller;

import com.smokingcessation.entity.MembershipPlan;
import com.smokingcessation.service.MembershipPlanService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/membership-plans")
@SecurityRequirement(name = "api")
public class MembershipPlanController {

    @Autowired
    private MembershipPlanService membershipPlanService;

    // PUBLIC - Guest, Members, Coach, Admin đều có thể xem plans
    @GetMapping
    public List<MembershipPlan> getAllPlans() {
        return membershipPlanService.getAllPlans();
    }

    // PUBLIC - Guest, Members, Coach, Admin đều có thể xem plan chi tiết
    @GetMapping("/{id}")
    public Optional<MembershipPlan> getPlanById(@PathVariable Integer id) {
        return membershipPlanService.getPlanById(id);
    }

    // ADMIN - Chỉ admin mới có thể tạo plan mới
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public MembershipPlan createPlan(@RequestBody MembershipPlan plan) {
        return membershipPlanService.save(plan);
    }


    // ADMIN - Endpoint 1: Lấy tất cả các gói (cho admin quản lý)
    @GetMapping("/admin/all")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<MembershipPlan>> getAllPlansForAdmin() {
        List<MembershipPlan> plans = membershipPlanService.getAllPlansForAdmin();
        return ResponseEntity.ok(plans);
    }

    // ADMIN - Endpoint 2: Edit gói
    @PutMapping("/admin/{planId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<MembershipPlan> editPlan(
            @PathVariable Integer planId,
            @RequestBody MembershipPlan updatedPlan) {
        try {
            MembershipPlan editedPlan = membershipPlanService.editPlan(planId, updatedPlan);
            return ResponseEntity.ok(editedPlan);
        } catch (RuntimeException e) {
            if (e.getMessage().contains("Plan not found")) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.badRequest().body(null);
        }
    }

    // ADMIN - Endpoint 3: Xóa gói
    @DeleteMapping("/admin/{planId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deletePlanById(@PathVariable Integer planId) {
        try {
            boolean deleted = membershipPlanService.deletePlanById(planId);
            if (deleted) {
                return ResponseEntity.ok("Plan deleted successfully");
            } else {
                return ResponseEntity.badRequest().body("Failed to delete plan");
            }
        } catch (RuntimeException e) {
            if (e.getMessage().contains("Plan not found")) {
                return ResponseEntity.notFound().build();
            } else if (e.getMessage().contains("active subscriptions")) {
                return ResponseEntity.badRequest().body("Cannot delete plan. There are active subscriptions using this plan.");
            }
            return ResponseEntity.badRequest().body("Error deleting plan: " + e.getMessage());
        }
    }
}