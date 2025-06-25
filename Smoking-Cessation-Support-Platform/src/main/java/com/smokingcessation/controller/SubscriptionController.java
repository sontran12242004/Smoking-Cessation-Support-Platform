package com.smokingcessation.controller;

import com.smokingcessation.dto.SubscriptionDTO;
import com.smokingcessation.dto.SubscriptionStatusDTO;
import com.smokingcessation.entity.Subscription;
import com.smokingcessation.service.SubscriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/subscriptions")
public class SubscriptionController {

    private final SubscriptionService subscriptionService;

    @Autowired
    public SubscriptionController(SubscriptionService subscriptionService) {
        this.subscriptionService = subscriptionService;
    }

    // ADMIN - Chỉ admin mới có thể xem tất cả subscriptions
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<SubscriptionDTO>> getAll() {
        List<Subscription> subscriptions = subscriptionService.getAllSubscriptions();
        List<SubscriptionDTO> responseDTOs = subscriptions.stream()
                .map(subscriptionService::convertToDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responseDTOs);
    }

    // ADMIN - Chỉ admin mới có thể xem subscription theo ID
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<SubscriptionDTO> getById(@PathVariable Integer id) {
        Subscription subscription = subscriptionService.getSubscriptionById(id);
        SubscriptionDTO responseDTO = subscriptionService.convertToDTO(subscription);
        return ResponseEntity.ok(responseDTO);
    }

    // AUTHENTICATED - Members (chỉ xem của mình), Coach (xem assigned members), Admin (xem tất cả)
    @GetMapping("/member/{memberId}")
    @PreAuthorize("hasAnyRole('MEMBERS', 'COACH', 'ADMIN')")
    public ResponseEntity<List<SubscriptionDTO>> getByMemberId(@PathVariable Long memberId) {
        List<Subscription> subscriptions = subscriptionService.getSubscriptionsByMemberId(memberId);
        List<SubscriptionDTO> responseDTOs = subscriptions.stream()
                .map(subscriptionService::convertToDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responseDTOs);
    }

    // ADMIN - Chỉ admin mới có thể tạo subscription mới
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<SubscriptionDTO> create(@RequestBody Subscription subscription) {
        Subscription created = subscriptionService.createSubscription(subscription);
        SubscriptionDTO responseDTO = subscriptionService.convertToDTO(created);
        return ResponseEntity.ok(responseDTO);
    }

    // ADMIN - Chỉ admin mới có thể cập nhật subscription
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<SubscriptionDTO> update(@PathVariable Integer id, @RequestBody Subscription subscription) {
        Subscription updated = subscriptionService.updateSubscription(id, subscription);
        SubscriptionDTO responseDTO = subscriptionService.convertToDTO(updated);
        return ResponseEntity.ok(responseDTO);
    }

    // ADMIN - Chỉ admin mới có thể hủy kích hoạt subscription
    @PutMapping("/{id}/deactivate")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deactivate(@PathVariable Integer id) {
        subscriptionService.deactivateSubscription(id);
        return ResponseEntity.noContent().build();
    }

    // AUTHENTICATED - Members (chỉ xem của mình), Coach (xem assigned members), Admin (xem tất cả)
    @GetMapping("/member/{memberId}/active")
    @PreAuthorize("hasAnyRole('MEMBERS', 'COACH', 'ADMIN')")
    public ResponseEntity<SubscriptionDTO> getActiveSubscription(@PathVariable Long memberId) {
        Subscription activeSubscription = subscriptionService.getActiveSubscriptionForMember(memberId);
        if (activeSubscription == null) {
            return ResponseEntity.notFound().build();
        }
        SubscriptionDTO responseDTO = subscriptionService.convertToDTO(activeSubscription);
        return ResponseEntity.ok(responseDTO);
    }

    // AUTHENTICATED - Members (chỉ xem của mình), Coach (xem assigned members), Admin (xem tất cả)
    @GetMapping("/member/{memberId}/status")
    @PreAuthorize("hasAnyRole('MEMBERS', 'COACH', 'ADMIN')")
    public ResponseEntity<SubscriptionStatusDTO> getSubscriptionStatus(@PathVariable Long memberId) {
        SubscriptionStatusDTO status = subscriptionService.getSubscriptionStatus(memberId);
        return ResponseEntity.ok(status);
    }
}