package com.smokingcessation.repository;

import com.smokingcessation.entity.Subscription;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SubscriptionRepository extends JpaRepository<Subscription, Integer> {
    List<Subscription> findByIsActiveTrue();
    List<Subscription> findByMember_MemberID(Long memberID);
    List<Subscription> findByMembershipPlan_PlanID(Integer planID);
}
