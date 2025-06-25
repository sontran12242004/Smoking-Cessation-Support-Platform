package com.smokingcessation.controller;

import com.smokingcessation.entity.MembershipPlan;
import com.smokingcessation.service.MembershipPlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/membership-plans")
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

    // ADMIN - Chỉ admin mới có thể xóa plan
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deletePlan(@PathVariable Integer id) {
        membershipPlanService.deletePlan(id);
    }

    // PUBLIC - Guest có thể xem available plans cho member
    @GetMapping("/member/{memberId}/available")
    public List<MembershipPlan> getAvailablePlansForMember(@PathVariable Long memberId) {
        return membershipPlanService.getAvailablePlansForMember(memberId);
    }
}