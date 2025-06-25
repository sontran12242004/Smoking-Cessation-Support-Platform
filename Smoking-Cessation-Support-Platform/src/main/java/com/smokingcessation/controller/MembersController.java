package com.smokingcessation.controller;

import com.smokingcessation.dto.*;
import com.smokingcessation.entity.Members;
import com.smokingcessation.entity.MembershipPlan;
import com.smokingcessation.entity.Subscription;
import com.smokingcessation.service.*;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/members")

public class MembersController {

    @Autowired
    private MembersService membersService;

    @Autowired
    private SubscriptionService subscriptionService;

    @Autowired
    private MembershipPlanService membershipPlanService;

    // MEMBER CRUD ENDPOINTS
    @GetMapping
    public ResponseEntity<List<Members>> getAllMembers() {
        List<Members> members = membersService.getAllMembers();
        return ResponseEntity.ok(members);
    }

    @PostMapping
    public ResponseEntity<Members> createMember(@Valid @RequestBody Members member) {
        Members newMember = membersService.createMember(member);
        return ResponseEntity.ok(newMember);
    }

    @GetMapping("/{memberId}")
    public ResponseEntity<Members> getMemberById(@PathVariable Long memberId) {
        Members member = membersService.getMemberById(memberId);
        return ResponseEntity.ok(member);
    }

    @PutMapping("/{memberId}")
    public ResponseEntity<Members> updateMember(@PathVariable Long memberId, @RequestBody Members member) {
        Members updatedMember = membersService.updateMember(memberId, member);
        return ResponseEntity.ok(updatedMember);
    }

    // MEMBER PROFILE ENDPOINTS
    @GetMapping("/{memberId}/profile")
    public ResponseEntity<MemberProfileDTO> getMemberProfile(@PathVariable Long memberId) {
        MemberProfileDTO profile = membersService.getMemberProfile(memberId);
        return ResponseEntity.ok(profile);
    }

    // SUBSCRIPTION MANAGEMENT ENDPOINTS
    @GetMapping("/{memberId}/subscription")
    public ResponseEntity<MemberSubscriptionDTO> getCurrentSubscription(@PathVariable Long memberId) {
        MemberSubscriptionDTO subscriptionInfo = subscriptionService.getMemberSubscriptionInfo(memberId);
        return ResponseEntity.ok(subscriptionInfo);
    }

    @GetMapping("/{memberId}/subscription/history")
    public ResponseEntity<List<SubscriptionDTO>> getSubscriptionHistory(@PathVariable Long memberId) {
        List<Subscription> history = subscriptionService.getSubscriptionHistory(memberId);
        List<SubscriptionDTO> responseDTOs = history.stream()
                .map(subscriptionService::convertToDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responseDTOs);
    }

    @PostMapping("/{memberId}/subscribe")
    @SecurityRequirement(name = "api")
    public ResponseEntity<SubscriptionDTO> subscribeToPlan(
            @PathVariable Long memberId,
            @Valid @RequestBody SubscriptionRequestDTO request) {
        Subscription subscription = subscriptionService.subscribeToPlan(memberId, request);
        SubscriptionDTO responseDTO = subscriptionService.convertToDTO(subscription);
        return ResponseEntity.ok(responseDTO);
    }

    @PutMapping("/{memberId}/subscription/renew")
    public ResponseEntity<SubscriptionDTO> renewSubscription(
            @PathVariable Long memberId,
            @Valid @RequestBody SubscriptionRenewalDTO request) {
        Subscription subscription = subscriptionService.renewSubscription(memberId, request);
        SubscriptionDTO responseDTO = subscriptionService.convertToDTO(subscription);
        return ResponseEntity.ok(responseDTO);
    }

    @DeleteMapping("/{memberId}/subscription/cancel")
    public ResponseEntity<Void> cancelSubscription(@PathVariable Long memberId) {
        subscriptionService.cancelSubscription(memberId);
        return ResponseEntity.noContent().build();
    }

    // SUBSCRIPTION STATUS ENDPOINTS
    @GetMapping("/{memberId}/subscription/status")
    public ResponseEntity<SubscriptionStatusDTO> getSubscriptionStatus(@PathVariable Long memberId) {
        SubscriptionStatusDTO status = subscriptionService.getSubscriptionStatus(memberId);
        return ResponseEntity.ok(status);
    }

    @GetMapping("/{memberId}/subscription/can-renew")
    public ResponseEntity<Boolean> canRenewSubscription(@PathVariable Long memberId) {
        boolean canRenew = subscriptionService.canRenewSubscription(memberId);
        return ResponseEntity.ok(canRenew);
    }

    @GetMapping("/{memberId}/subscription/can-cancel")
    @SecurityRequirement(name = "api")
    public ResponseEntity<Boolean> canCancelSubscription(@PathVariable Long memberId) {
        boolean canCancel = subscriptionService.canCancelSubscription(memberId);
        return ResponseEntity.ok(canCancel);
    }

    // AVAILABLE PLANS ENDPOINT
    @GetMapping("/{memberId}/available-plans")
    public ResponseEntity<List<MembershipPlan>> getAvailablePlans(@PathVariable Long memberId) {
        List<MembershipPlan> plans = membershipPlanService.getAvailablePlansForMember(memberId);
        return ResponseEntity.ok(plans);
    }
}