package com.smokingcessation.service;

import com.smokingcessation.dto.SubscriptionDTO;
import com.smokingcessation.entity.Subscription;
import com.smokingcessation.repository.SubscriptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class SubscriptionService {

    private final SubscriptionRepository subscriptionRepository;

    @Autowired
    public SubscriptionService(SubscriptionRepository subscriptionRepository) {
        this.subscriptionRepository = subscriptionRepository;
    }

    public List<Subscription> getAllSubscriptions() {
        return subscriptionRepository.findAll();
    }

    public Subscription getSubscriptionById(Integer id) {
        return subscriptionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy subscription"));
    }

    public List<Subscription> getSubscriptionsByMemberId(Integer memberId) {
        return subscriptionRepository.findByMember_MemberID(memberId);
    }

    public Subscription createSubscription(Subscription subscription) {
        if (subscription.getStartDate() == null) {
            subscription.setStartDate(LocalDate.now());
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
}
