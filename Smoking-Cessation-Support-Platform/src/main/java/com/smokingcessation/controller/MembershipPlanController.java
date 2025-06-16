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

    @GetMapping
    public List<MembershipPlan> getAllPlans() {
        return membershipPlanService.getAllPlans();
    }

    @GetMapping("/{id}")
    public Optional<MembershipPlan> getPlanById(@PathVariable Integer id) {
        return membershipPlanService.getPlanById(id);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public MembershipPlan createPlan(@RequestBody MembershipPlan plan) {
        return membershipPlanService.save(plan);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deletePlan(@PathVariable Integer id) {
        membershipPlanService.deletePlan(id);
    }
}
