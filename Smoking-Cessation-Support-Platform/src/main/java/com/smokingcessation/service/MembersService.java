package com.smokingcessation.service;

import com.smokingcessation.dto.MemberProfileDTO;
import com.smokingcessation.dto.MemberSubscriptionDTO;
import com.smokingcessation.entity.Members;
import com.smokingcessation.repository.MembersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class MembersService {

    @Autowired
    private MembersRepository membersRepository;

    @Autowired
    private SubscriptionService subscriptionService;

    @Autowired
    private MembershipPlanService membershipPlanService;

    public List<Members> getAllMembers() {
        return membersRepository.findAll();
    }

    public Members getMemberById(Long memberId) {
        return membersRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("Member not found"));
    }

    public Members createMember(Members member) {
        member.setCreatedAt(LocalDateTime.now());
        member.setActive(true);
        return membersRepository.save(member);
    }

    public Members updateMember(Long memberId, Members member) {
        Members existingMember = getMemberById(memberId);
        existingMember.setName(member.getName());
        existingMember.setEmail(member.getEmail());
        existingMember.setPhone(member.getPhone());
        existingMember.setDailyCost(member.getDailyCost());
        existingMember.setQuitDate(member.getQuitDate());
        existingMember.setAddress(member.getAddress());
        existingMember.setDateOfBirth(member.getDateOfBirth());
        existingMember.setGender(member.getGender());
        return membersRepository.save(existingMember);
    }

    public MemberProfileDTO getMemberProfile(Long memberId) {
        Members member = getMemberById(memberId);
        MemberSubscriptionDTO subscriptionInfo = subscriptionService.getMemberSubscriptionInfo(memberId);

        MemberProfileDTO profile = new MemberProfileDTO();
        profile.setMember(member);
        profile.setSubscriptionInfo(subscriptionInfo);

        return profile;
    }
}