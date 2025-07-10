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
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/members")
@SecurityRequirement(name = "api")
public class MembersController {

    @Autowired
    private MembersService membersService;

    @Autowired
    private SubscriptionService subscriptionService;

    @Autowired
    private MembershipPlanService membershipPlanService;

    @Autowired
    private AuthenticationService authenticationService;

    @Autowired
    private DailyProcessService dailyProcessService;

    // ADMIN - Chỉ admin mới có thể xem tất cả members
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")

    public ResponseEntity<List<Members>> getAllMembers() {
        List<Members> members = membersService.getAllMembers();
        return ResponseEntity.ok(members);
    }

    // ADMIN - Chỉ admin mới có thể tạo member mới
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Members> createMember(@Valid @RequestBody Members member) {
        Members newMember = membersService.createMember(member);
        return ResponseEntity.ok(newMember);
    }

    // MEMBERS - Member chỉ xem profile của mình, Coach xem assigned members, Admin xem tất cả
    @GetMapping("/{memberId}")
    @PreAuthorize("hasAnyRole('MEMBERS')")
    public ResponseEntity<Members> getMemberById(@PathVariable Long memberId) {
        Members member = membersService.getMemberById(memberId);
        return ResponseEntity.ok(member);
    }

    // MEMBERS - Member chỉ xem profile của mình, Coach xem assigned members, Admin xem tất cả

    // AUTHENTICATED - Members (chỉ xem subscription của mình), Coach (xem assigned members), Admin (xem tất cả)
    @GetMapping("/{memberId}/subscription")
    @PreAuthorize("hasAnyRole('MEMBERS')")
    public ResponseEntity<MemberSubscriptionDTO> getCurrentSubscription(@PathVariable Long memberId) {
        MemberSubscriptionDTO subscriptionInfo = subscriptionService.getMemberSubscriptionInfo(memberId);
        return ResponseEntity.ok(subscriptionInfo);
    }

    // AUTHENTICATED - Members (chỉ xem history của mình), Coach (xem assigned members), Admin (xem tất cả)
    @GetMapping("/{memberId}/subscription/history")
    @PreAuthorize("hasAnyRole('MEMBERS')")
    public ResponseEntity<List<SubscriptionDTO>> getSubscriptionHistory(@PathVariable Long memberId) {
        List<Subscription> history = subscriptionService.getSubscriptionHistory(memberId);
        List<SubscriptionDTO> responseDTOs = history.stream()
                .map(subscriptionService::convertToDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responseDTOs);
    }

    // AUTHENTICATED - Members (chỉ subscribe cho mình), Admin (subscribe cho bất kỳ ai)
    @PostMapping("/{memberId}/subscribe")
    @PreAuthorize("hasAnyRole('MEMBERS')")
    @SecurityRequirement(name = "api")
    public ResponseEntity<SubscriptionDTO> subscribeToPlan(
            @PathVariable Long memberId,
            @Valid @RequestBody SubscriptionRequestDTO request) {
        Subscription subscription = subscriptionService.subscribeToPlan(memberId, request);
        SubscriptionDTO responseDTO = subscriptionService.convertToDTO(subscription);
        return ResponseEntity.ok(responseDTO);
    }

    // AUTHENTICATED - Members (chỉ renew cho mình), Admin (renew cho bất kỳ ai)
    @PutMapping("/{memberId}/subscription/renew")
    @PreAuthorize("hasAnyRole('MEMBERS')")
    public ResponseEntity<SubscriptionDTO> renewSubscription(
            @PathVariable Long memberId,
            @Valid @RequestBody SubscriptionRenewalDTO request) {
        Subscription subscription = subscriptionService.renewSubscription(memberId, request);
        SubscriptionDTO responseDTO = subscriptionService.convertToDTO(subscription);
        return ResponseEntity.ok(responseDTO);
    }

    // AUTHENTICATED - Members (chỉ cancel cho mình), Admin (cancel cho bất kỳ ai)
    @DeleteMapping("/{memberId}/subscription/cancel")
    @PreAuthorize("hasAnyRole('MEMBERS')")
    public ResponseEntity<Void> cancelSubscription(@PathVariable Long memberId) {
        subscriptionService.cancelSubscription(memberId);
        return ResponseEntity.noContent().build();
    }

    // AUTHENTICATED - Members (chỉ xem status của mình), Coach (xem assigned members), Admin (xem tất cả)
    @GetMapping("/{memberId}/subscription/status")
    @PreAuthorize("hasAnyRole('MEMBERS', 'COACH', 'ADMIN')")
    public ResponseEntity<SubscriptionStatusDTO> getSubscriptionStatus(@PathVariable Long memberId) {
        SubscriptionStatusDTO status = subscriptionService.getSubscriptionStatus(memberId);
        return ResponseEntity.ok(status);
    }

    // AUTHENTICATED - Members (chỉ check cho mình), Admin (check cho bất kỳ ai)
    @GetMapping("/{memberId}/subscription/can-renew")
    @PreAuthorize("hasAnyRole('MEMBERS')")
    public ResponseEntity<Boolean> canRenewSubscription(@PathVariable Long memberId) {
        boolean canRenew = subscriptionService.canRenewSubscription(memberId);
        return ResponseEntity.ok(canRenew);
    }

    // AUTHENTICATED - Members (chỉ check cho mình), Admin (check cho bất kỳ ai)
    @GetMapping("/{memberId}/subscription/can-cancel")
    @PreAuthorize("hasAnyRole('MEMBERS')")
    @SecurityRequirement(name = "api")
    public ResponseEntity<Boolean> canCancelSubscription(@PathVariable Long memberId) {
        boolean canCancel = subscriptionService.canCancelSubscription(memberId);
        return ResponseEntity.ok(canCancel);
    }

    // PUBLIC - Guest có thể xem available plans
    @GetMapping("/{memberId}/available-plans")
    public ResponseEntity<List<MembershipPlan>> getAvailablePlans(@PathVariable Long memberId) {
        List<MembershipPlan> plans = membershipPlanService.getAvailablePlansForMember(memberId);
        return ResponseEntity.ok(plans);
    }

    // ADMIN - Chỉ admin mới có thể xem danh sách members cho trang quản lý
    @GetMapping("/admin/list")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<MembersDTO>> getAdminMemberList() {
        List<MembersDTO> memberList = membersService.getAdminMemberList();
        return ResponseEntity.ok(memberList);
    }


    // Lưu thông tin edit
    @PutMapping("/{memberId}/edit-profile")
    public ResponseEntity<MembersDTO> updateMemberProfile(
            @PathVariable Long memberId,
            @RequestBody MembersDTO memberDTO) {
        MembersDTO updatedProfile = membersService.updateMemberProfile(memberId, memberDTO);
        return ResponseEntity.ok(updatedProfile);
    }


    // ADMIN - Admin quản lý member cụ thể - cập nhật thông tin
    @PutMapping("/admin/{memberId}/manage")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<MembersDTO> updateAdminMemberManage(
            @PathVariable Long memberId,
            @RequestBody MembersDTO memberDTO) {
        MembersDTO updatedMember = membersService.updateAdminMemberManage(memberId, memberDTO);
        return ResponseEntity.ok(updatedMember);
    }

}