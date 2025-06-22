package com.smokingcessation.service;

import com.smokingcessation.entity.MembershipPlan;
import com.smokingcessation.repository.MembershipPlanRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class MembershipPlanService {

    @Autowired
    private MembershipPlanRepository membershipPlanRepository;

    // Khởi tạo dữ liệu mặc định
    @PostConstruct
    public void initDefaultPlans() {
        addPlanIfNotExists("Premium Package - Accelerated Program (6 months)", 180, new BigDecimal("1999000"));
        addPlanIfNotExists("Elite Package - Mastery Program (1 year)", 365, new BigDecimal("4999000"));
    }

    private void addPlanIfNotExists(String name, int duration, BigDecimal price) {
        Optional<MembershipPlan> existing = membershipPlanRepository.findByName(name);
        if (existing.isEmpty()) {
            MembershipPlan plan = new MembershipPlan();
            plan.setName(name);
            plan.setDuration(duration);
            plan.setPrice(price);
            membershipPlanRepository.save(plan);
        }
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
}
