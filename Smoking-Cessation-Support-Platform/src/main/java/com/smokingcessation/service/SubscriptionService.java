package com.smokingcessation.service;

import com.smokingcessation.dto.*;
import com.smokingcessation.entity.Members;
import com.smokingcessation.entity.MembershipPlan;
import com.smokingcessation.entity.Subscription;
import com.smokingcessation.exception.exceptions.BadRequestException;
import com.smokingcessation.repository.MembersRepository;
import com.smokingcessation.repository.MembershipPlanRepository;
import com.smokingcessation.repository.SubscriptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SubscriptionService {

    private final SubscriptionRepository subscriptionRepository;
    private final MembersRepository membersRepository;
    private final MembershipPlanRepository membershipPlanRepository;
    private final MembershipPlanService membershipPlanService;

    @Autowired
    public SubscriptionService(SubscriptionRepository subscriptionRepository,
                               MembersRepository membersRepository,
                               MembershipPlanRepository membershipPlanRepository,
                               MembershipPlanService membershipPlanService) {
        this.subscriptionRepository = subscriptionRepository;
        this.membersRepository = membersRepository;
        this.membershipPlanRepository = membershipPlanRepository;
        this.membershipPlanService = membershipPlanService;
    }

    // EXISTING METHODS
    public List<Subscription> getAllSubscriptions() {
        return subscriptionRepository.findAll();
    }

    public Subscription getSubscriptionById(Integer id) {
        return subscriptionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy subscription"));
    }

    public List<Subscription> getSubscriptionsByMemberId(Long memberId) {
        return subscriptionRepository.findByMember_MemberID(memberId);
    }

    public Subscription createSubscription(Subscription subscription) {
        if (subscription.getCreatedAt() == null) {
            subscription.setCreatedAt(LocalDateTime.now());
        }
        subscription.setActive(true);
        return subscriptionRepository.save(subscription);
    }

    public Subscription updateSubscription(Integer id, Subscription updated) {
        Subscription existing = getSubscriptionById(id);
        existing.setMembershipPlan(updated.getMembershipPlan());
        existing.setStartDate(updated.getStartDate());
        existing.setEndDate(updated.getEndDate());
        existing.setActive(updated.isActive());
        return subscriptionRepository.save(existing);
    }

    public void deactivateSubscription(Integer id) {
        Subscription subscription = getSubscriptionById(id);
        subscription.setActive(false);
        subscriptionRepository.save(subscription);
    }

    // NEW METHODS FOR MEMBER MANAGEMENT
    public Subscription getActiveSubscriptionForMember(Long memberId) {
        List<Subscription> subscriptions = subscriptionRepository.findByMember_MemberID(memberId);
        return subscriptions.stream()
                .filter(Subscription::isActive)
                .findFirst()
                .orElse(null);
    }

    public MemberSubscriptionDTO getMemberSubscriptionInfo(Long memberId) {
        Subscription currentSubscription = getActiveSubscriptionForMember(memberId);
        List<Subscription> history = getSubscriptionHistory(memberId);
        List<MembershipPlan> availablePlans = membershipPlanService.getAvailablePlansForMember(memberId);

        MemberSubscriptionDTO dto = new MemberSubscriptionDTO();
        dto.setCurrentSubscription(currentSubscription);

        if (currentSubscription != null) {
            dto.setCurrentPlan(currentSubscription.getMembershipPlan());
            dto.setExpired(isSubscriptionExpired(memberId));
            dto.setDaysRemaining(getDaysRemaining(memberId));
            dto.setCanRenew(canRenewSubscription(memberId));
            dto.setCanCancel(canCancelSubscription(memberId));
        }

        dto.setHistory(history);
        dto.setAvailablePlans(availablePlans);

        return dto;
    }

    public SubscriptionStatusDTO getSubscriptionStatus(Long memberId) {
        Subscription activeSubscription = getActiveSubscriptionForMember(memberId);
        SubscriptionStatusDTO status = new SubscriptionStatusDTO();

        if (activeSubscription != null) {
            status.setHasActiveSubscription(true);
            status.setExpired(isSubscriptionExpired(memberId));
            status.setDaysRemaining(getDaysRemaining(memberId));
            status.setCanRenew(canRenewSubscription(memberId));
            status.setCanCancel(canCancelSubscription(memberId));

            if (status.isExpired()) {
                status.setStatusMessage("Subscription has expired");
            } else if (status.getDaysRemaining() <= 7) {
                status.setStatusMessage("Subscription expires soon");
            } else {
                status.setStatusMessage("Subscription is active");
            }
        } else {
            status.setHasActiveSubscription(false);
            status.setStatusMessage("No active subscription");
        }

        return status;
    }

    @Transactional
    public Subscription subscribeToPlan(Long memberId, SubscriptionRequestDTO request) {
        // Validate request
        validateSubscriptionRequest(memberId, request.getPlanId());

        Members member = membersRepository.findById(memberId)
                .orElseThrow(() -> new BadRequestException("Member not found"));

        MembershipPlan plan = membershipPlanRepository.findById(request.getPlanId())
                .orElseThrow(() -> new BadRequestException("Plan not found"));

        // Create new subscription
        Subscription subscription = new Subscription();
        subscription.setMember(member);
        subscription.setMembershipPlan(plan);
        subscription.setStartDate(LocalDate.now());
        subscription.setEndDate(LocalDate.now().plusDays(plan.getDuration()));
        subscription.setActive(true);
        subscription.setCreatedAt(LocalDateTime.now());
        subscription.setPaymentMethod(request.getPaymentMethod());
        subscription.setNotes(request.getNotes());
        return subscriptionRepository.save(subscription);
    }

    @Transactional
    public Subscription renewSubscription(Long memberId, SubscriptionRenewalDTO request) {
        // Check if member has active subscription
        Subscription currentSubscription = getActiveSubscriptionForMember(memberId);
        if (currentSubscription == null) {
            throw new BadRequestException("No active subscription found");
        }

        // Deactivate current subscription
        currentSubscription.setActive(false);
        subscriptionRepository.save(currentSubscription);

        // Create new subscription
        SubscriptionRequestDTO newRequest = new SubscriptionRequestDTO();
        newRequest.setPlanId(request.getPlanId());
        newRequest.setPaymentMethod(request.getPaymentMethod());

        return subscribeToPlan(memberId, newRequest);
    }

    @Transactional
    public void cancelSubscription(Long memberId) {
        Subscription activeSubscription = getActiveSubscriptionForMember(memberId);
        if (activeSubscription == null) {
            throw new BadRequestException("No active subscription found");
        }

        activeSubscription.setActive(false);
        subscriptionRepository.save(activeSubscription);
    }

    public List<Subscription> getSubscriptionHistory(Long memberId) {
        return subscriptionRepository.findByMember_MemberID(memberId);
    }

    public boolean isSubscriptionExpired(Long memberId) {
        Subscription activeSubscription = getActiveSubscriptionForMember(memberId);
        if (activeSubscription == null) {
            return true;
        }
        return activeSubscription.getEndDate().isBefore(LocalDate.now());
    }

    public long getDaysRemaining(Long memberId) {
        Subscription activeSubscription = getActiveSubscriptionForMember(memberId);
        if (activeSubscription == null || isSubscriptionExpired(memberId)) {
            return 0;
        }
        return java.time.temporal.ChronoUnit.DAYS.between(LocalDate.now(), activeSubscription.getEndDate());
    }

    public boolean canRenewSubscription(Long memberId) {
        Subscription activeSubscription = getActiveSubscriptionForMember(memberId);
        if (activeSubscription == null) {
            return false;
        }
        // Can renew if subscription expires within 30 days
        return getDaysRemaining(memberId) <= 30;
    }

    public boolean canCancelSubscription(Long memberId) {
        Subscription activeSubscription = getActiveSubscriptionForMember(memberId);
        return activeSubscription != null && activeSubscription.isActive();
    }

    private void validateSubscriptionRequest(Long memberId, Integer planId) {
        // Check if member exists
        if (!membersRepository.existsById(memberId)) {
            throw new BadRequestException("Member not found");
        }

        // Check if plan exists
        if (!membershipPlanRepository.existsById(planId)) {
            throw new BadRequestException("Plan not found");
        }

        // Check if member already has active subscription
        Subscription activeSubscription = getActiveSubscriptionForMember(memberId);
        if (activeSubscription != null) {
            throw new BadRequestException("Member already has an active subscription");
        }
    }

    // Helper method to convert Entity to DTO with correct field names
    public SubscriptionDTO convertToDTO(Subscription subscription) {
        SubscriptionDTO dto = new SubscriptionDTO();
        dto.setSubscriptionId(subscription.getSubscriptionid());
        dto.setMemberId(subscription.getMember().getMemberID());
        dto.setMemberName(subscription.getMember().getName());
        dto.setMemberEmail(subscription.getMember().getEmail());
        dto.setPlanId(subscription.getMembershipPlan().getPlanID());
        dto.setPlanName(subscription.getMembershipPlan().getName());
        dto.setPlanDuration(subscription.getMembershipPlan().getDuration());
        dto.setStartDate(subscription.getStartDate());
        dto.setEndDate(subscription.getEndDate());
        dto.setActive(subscription.isActive());
        dto.setPaymentMethod(subscription.getPaymentMethod());
        dto.setNotes(subscription.getNotes());
        return dto;
    }
}