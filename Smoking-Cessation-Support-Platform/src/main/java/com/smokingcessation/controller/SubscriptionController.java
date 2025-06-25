package com.smokingcessation.controller;

import com.smokingcessation.dto.SubscriptionDTO;
import com.smokingcessation.dto.SubscriptionStatusDTO;
import com.smokingcessation.entity.Subscription;
import com.smokingcessation.service.SubscriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

    // EXISTING ENDPOINTS - Updated to return DTOs
    @GetMapping
    public ResponseEntity<List<SubscriptionDTO>> getAll() {
        List<Subscription> subscriptions = subscriptionService.getAllSubscriptions();
        List<SubscriptionDTO> responseDTOs = subscriptions.stream()
                .map(subscriptionService::convertToDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responseDTOs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SubscriptionDTO> getById(@PathVariable Integer id) {
        Subscription subscription = subscriptionService.getSubscriptionById(id);
        SubscriptionDTO responseDTO = subscriptionService.convertToDTO(subscription);
        return ResponseEntity.ok(responseDTO);
    }

    @GetMapping("/member/{memberId}")
    public ResponseEntity<List<SubscriptionDTO>> getByMemberId(@PathVariable Long memberId) {
        List<Subscription> subscriptions = subscriptionService.getSubscriptionsByMemberId(memberId);
        List<SubscriptionDTO> responseDTOs = subscriptions.stream()
                .map(subscriptionService::convertToDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responseDTOs);
    }

    @PostMapping
    public ResponseEntity<SubscriptionDTO> create(@RequestBody Subscription subscription) {
        Subscription created = subscriptionService.createSubscription(subscription);
        SubscriptionDTO responseDTO = subscriptionService.convertToDTO(created);
        return ResponseEntity.ok(responseDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<SubscriptionDTO> update(@PathVariable Integer id, @RequestBody Subscription subscription) {
        Subscription updated = subscriptionService.updateSubscription(id, subscription);
        SubscriptionDTO responseDTO = subscriptionService.convertToDTO(updated);
        return ResponseEntity.ok(responseDTO);
    }

    @PutMapping("/{id}/deactivate")
    public ResponseEntity<Void> deactivate(@PathVariable Integer id) {
        subscriptionService.deactivateSubscription(id);
        return ResponseEntity.noContent().build();
    }

    // NEW ENDPOINTS - Updated to return DTOs
    @GetMapping("/member/{memberId}/active")
    public ResponseEntity<SubscriptionDTO> getActiveSubscription(@PathVariable Long memberId) {
        Subscription activeSubscription = subscriptionService.getActiveSubscriptionForMember(memberId);
        if (activeSubscription == null) {
            return ResponseEntity.notFound().build();
        }
        SubscriptionDTO responseDTO = subscriptionService.convertToDTO(activeSubscription);
        return ResponseEntity.ok(responseDTO);
    }

    @GetMapping("/member/{memberId}/status")
    public ResponseEntity<SubscriptionStatusDTO> getSubscriptionStatus(@PathVariable Long memberId) {
        SubscriptionStatusDTO status = subscriptionService.getSubscriptionStatus(memberId);
        return ResponseEntity.ok(status);
    }
}