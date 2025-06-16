package com.smokingcessation.repository;

import com.smokingcessation.entity.MembershipPlan;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MembershipPlanRepository extends JpaRepository<MembershipPlan, Integer> {
    boolean existsByName(String name);
}
