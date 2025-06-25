package com.smokingcessation.service;

import com.smokingcessation.entity.MembershipPlan;
import com.smokingcessation.entity.Subscription;
import com.smokingcessation.repository.MembershipPlanRepository;
import com.smokingcessation.repository.SubscriptionRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class MembershipPlanService {

    @Autowired
    private MembershipPlanRepository membershipPlanRepository;

    @Autowired
    private SubscriptionRepository subscriptionRepository;

    // Khởi tạo dữ liệu mặc định
    public void addPlanIfNotExists(
            String name,
            int duration,
            BigDecimal price,
            String description
    ) {
        Optional<MembershipPlan> existing = membershipPlanRepository.findByName(name);
        if (existing.isEmpty()) {
            MembershipPlan plan = new MembershipPlan();
            plan.setName(name);
            plan.setDuration(duration);
            plan.setPrice(price);
            plan.setDescription(description);
            plan.setActive(true);
            plan.setCreatedAt(LocalDateTime.now());
            membershipPlanRepository.save(plan);
        }
    }

    @PostConstruct
    public void resetAndInitDefaultPlans() {


        // 2. Seed lại các gói mặc định
        addPlanIfNotExists("Elite Package - Mastery Program (1 year)",
                365,
                new BigDecimal("299"),
                String.join("\n",
                        "+Premium progress tracking",
                        "+Community access",
                        "+Daily tips",
                        "+Personal coach",
                        "+Advanced analytics",
                        "+Email reminders"));

        addPlanIfNotExists("Standard Package",
                365,
                BigDecimal.ZERO,
                String.join("\n",
                        "+Basic progress tracking",
                        "+Weekly tips"));
    }


    public List<MembershipPlan> getAllPlans() {
        return membershipPlanRepository.findAll();
    }

    public Optional<MembershipPlan> getPlanById(Integer id) {
        return membershipPlanRepository.findById(id);
    }

    public MembershipPlan save(MembershipPlan plan) {
        return membershipPlanRepository.save(plan);
    }

    public void deletePlan(Integer id) {
        membershipPlanRepository.deleteById(id);
    }

    // NEW METHOD
    public List<MembershipPlan> getAvailablePlansForMember(Long memberId) {
        // Get all plans
        List<MembershipPlan> allPlans = getAllPlans();

        // Check if member has active subscription
        List<Subscription> memberSubscriptions = subscriptionRepository.findByMember_MemberID(memberId);
        Subscription activeSubscription = memberSubscriptions.stream()
                .filter(Subscription::isActive)
                .findFirst()
                .orElse(null);

        if (activeSubscription != null) {
            // If member has active subscription, only show plans that are different
            return allPlans.stream()
                    .filter(plan -> !plan.getPlanID().equals(activeSubscription.getMembershipPlan().getPlanID()))
                    .collect(Collectors.toList());
        }

        // If no active subscription, show all plans
        return allPlans;
    }
}