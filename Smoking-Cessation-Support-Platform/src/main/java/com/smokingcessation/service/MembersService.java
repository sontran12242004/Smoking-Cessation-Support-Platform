package com.smokingcessation.service;

import com.smokingcessation.dto.MembersDTO;
import com.smokingcessation.entity.Members;
import com.smokingcessation.entity.Subscription;
import com.smokingcessation.repository.MembersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

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

    // Method cho trang quản lý members của admin - sử dụng MembersDTO
    public List<MembersDTO> getAdminMemberList() {
        List<Members> members = getAllMembers();
        return members.stream()
                .map(this::convertToAdminMemberListDTO)
                .collect(Collectors.toList());
    }


    // Method để cập nhật profile của member
    public MembersDTO updateMemberProfile(Long memberId, MembersDTO profileDTO) {
        Members member = getMemberById(memberId);
        // Cập nhật thông tin từ DTO
        if (profileDTO.getName() != null) {
            member.setName(profileDTO.getName());
        } else if (profileDTO.getFirstname() != null && profileDTO.getLastname() != null) {
            member.setName(profileDTO.getFirstname() + " " + profileDTO.getLastname());
        }

        if (profileDTO.getEmail() != null) {
            member.setEmail(profileDTO.getEmail());
        }

        if (profileDTO.getPhone() != null) {
            member.setPhone(profileDTO.getPhone());
        }

        if (profileDTO.getAddress() != null) {
            member.setAddress(profileDTO.getAddress());
        }

        if (profileDTO.getGender() != null) {
            member.setGender(profileDTO.getGender());
        }

        if (profileDTO.getDateOfBirth() != null) {
            member.setDateOfBirth(profileDTO.getDateOfBirth());
        }

        if (profileDTO.getQuitDate() != null) {
            member.setQuitDate(profileDTO.getQuitDate());
        }

        if (profileDTO.getPrimaryMotivation() != null) {
            member.setPrimaryMotivation(profileDTO.getPrimaryMotivation());
        }

        if (profileDTO.getFormerDailyUsage() != null) {
            member.setFormerDailyUsage(profileDTO.getFormerDailyUsage());
        }

        Members updatedMember = membersRepository.save(member);
        return convertToMemberEditProfileDTO(updatedMember);
    }


    // Method cho admin quản lý member cụ thể - cập nhật thông tin
    public MembersDTO updateAdminMemberManage(Long memberId, MembersDTO adminDTO) {
        Members member = getMemberById(memberId);

        // Admin có thể cập nhật các trường cơ bản
        if (adminDTO.getUsername() != null) {
            member.setName(adminDTO.getUsername());
        }
        if (adminDTO.getEmail() != null) {
            member.setEmail(adminDTO.getEmail());
        }

        // Admin có thể thay đổi trạng thái active/inactive
        if (adminDTO.getStatus() != null) {
            member.setActive("Active".equalsIgnoreCase(adminDTO.getStatus()));
        }

        // Admin có thể cập nhật createdAt nếu cần
        if (adminDTO.getCreatedAt() != null) {
            member.setCreatedAt(adminDTO.getCreatedAt());
        }

        if (adminDTO.getPackageType() != null) {
        }

        Members updatedMember = membersRepository.save(member);
        return convertToAdminMemberListDTO(updatedMember);
    }

    // Helper method để convert Members sang MembersDTO cho admin list
    private MembersDTO convertToAdminMemberListDTO(Members member) {
        MembersDTO dto = new MembersDTO();
        dto.setId(member.getMemberID().toString());
        dto.setUsername(member.getName());
        dto.setEmail(member.getEmail());
        dto.setCreatedAt(member.getCreatedAt());
        dto.setStatus(member.isActive() ? "Active" : "Inactive");

        // Lấy role từ Account thay vì từ Members entity
        if (member.getAccount() != null) {
            dto.setRole(member.getAccount().getRole()); // Lấy role từ Account (chính xác)
        } else {
            dto.setRole(member.getRole()); // Fallback: lấy từ Members nếu không có Account
        }

        Subscription activeSubscription = subscriptionService.getActiveSubscriptionForMember(member.getMemberID());
        if (activeSubscription != null && activeSubscription.getMembershipPlan() != null) {
            dto.setPackageType(activeSubscription.getMembershipPlan().getName());
        } else {
            dto.setPackageType(null);
        }
        return dto;
    }

    // Helper method để convert Members sang MembersDTO cho edit profile
    public MembersDTO convertToMemberEditProfileDTO(Members member) {
        MembersDTO dto = new MembersDTO();
        dto.setMemberID(member.getMemberID());
        dto.setName(member.getName());
        dto.setEmail(member.getEmail());
        dto.setPhone(member.getPhone());
        dto.setAddress(member.getAddress());
        dto.setGender(member.getGender());
        dto.setDateOfBirth(member.getDateOfBirth());
        dto.setQuitDate(member.getQuitDate());
        dto.setCreatedAt(member.getCreatedAt());

        // Tách tên thành firstname và lastname
        String[] nameParts = member.getName() != null ? member.getName().split(" ", 2) : new String[]{"", ""};
        dto.setFirstname(nameParts.length > 0 ? nameParts[0] : "");
        dto.setLastname(nameParts.length > 1 ? nameParts[1] : "");

        dto.setPrimaryMotivation(member.getPrimaryMotivation());

        // Kiểm tra null trước khi sử dụng formerDailyUsage
        Integer formerDailyUsage = member.getFormerDailyUsage();
        if (formerDailyUsage != null) {
            dto.setFormerDailyUsage(formerDailyUsage);
        } else {
            dto.setFormerDailyUsage(0); // Giá trị mặc định
        }
        return dto;
    }
}