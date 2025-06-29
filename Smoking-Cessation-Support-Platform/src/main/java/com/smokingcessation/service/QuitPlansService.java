package com.smokingcessation.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.smokingcessation.dto.QuitPlansDTO;
import com.smokingcessation.entity.Members;
import com.smokingcessation.entity.QuitPlans;
import com.smokingcessation.repository.MembersRepository;
import com.smokingcessation.repository.QuitPlansRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class QuitPlansService {
    
    @Autowired
    private QuitPlansRepository quitPlansRepository;
    
    @Autowired
    private MembersRepository membersRepository;
    
    @Autowired
    private ObjectMapper objectMapper;
    
    /**
     * Tạo quit plan cho member cụ thể
     */
    @Transactional
    public QuitPlansDTO createQuitPlanForMember(Long memberId, QuitPlansDTO quitPlanDTO) {
        // Validate required fields
        if (memberId == null) {
            throw new RuntimeException("Member ID is required");
        }
        if (quitPlanDTO == null) {
            throw new RuntimeException("Quit plan data is required");
        }
        
        // Validate required fields in DTO
        if (quitPlanDTO.getDailyCigarettes() == null || quitPlanDTO.getDailyCigarettes().trim().isEmpty()) {
            throw new RuntimeException("Daily cigarettes information is required");
        }
        if (quitPlanDTO.getWeeklySpending() == null || quitPlanDTO.getWeeklySpending().trim().isEmpty()) {
            throw new RuntimeException("Weekly spending information is required");
        }
        if (quitPlanDTO.getMotivation() == null || quitPlanDTO.getMotivation().trim().isEmpty()) {
            throw new RuntimeException("Motivation is required");
        }
        
        Members member = membersRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("Member not found"));
        
        // Kiểm tra xem member đã có quit plan chưa
        Optional<QuitPlans> existingPlan = quitPlansRepository.findByMember(member);
        if (existingPlan.isPresent()) {
            throw new RuntimeException("Member already has a quit plan");
        }
        
        // Tạo quit plan mới
        QuitPlans quitPlan = new QuitPlans();
        quitPlan.setMember(member);
        
        // Set basic information with null checks
        quitPlan.setDailyCigarettes(quitPlanDTO.getDailyCigarettes());
        quitPlan.setFirstCigaretteAfterWaking(quitPlanDTO.getFirstCigaretteAfterWaking());
        quitPlan.setWeeklySpending(quitPlanDTO.getWeeklySpending());
        quitPlan.setMotivation(quitPlanDTO.getMotivation());
        quitPlan.setTriedBefore(quitPlanDTO.getTriedBefore());
        quitPlan.setQuitGoal(quitPlanDTO.getQuitGoal() != null ? quitPlanDTO.getQuitGoal() : "Quit completely");
        quitPlan.setTargetDays(quitPlanDTO.getTargetDays() != null ? quitPlanDTO.getTargetDays() : 365);
        
        // Convert triggers list to JSON string
        if (quitPlanDTO.getTriggers() != null && !quitPlanDTO.getTriggers().isEmpty()) {
            try {
                String triggersJson = objectMapper.writeValueAsString(quitPlanDTO.getTriggers());
                quitPlan.setTriggers(triggersJson);
            } catch (JsonProcessingException e) {
                throw new RuntimeException("Error processing triggers data", e);
            }
        }
        
        quitPlan.setActive(true);
        quitPlan.setCreatedAt(LocalDateTime.now());
        
        QuitPlans savedPlan = quitPlansRepository.save(quitPlan);
        return convertToDTO(savedPlan);
    }
    
    /**
     * Lấy quit plan của member
     */
    public QuitPlansDTO getQuitPlan(Long memberId) {
        Members member = membersRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("Member not found"));
        
        return quitPlansRepository.findByMember(member)
                .map(this::convertToDTO)
                .orElse(null);
    }
    
    /**
     * Cập nhật quit plan
     */
    @Transactional
    public QuitPlansDTO updateQuitPlan(Long memberId, QuitPlansDTO quitPlanDTO) {
        Members member = membersRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("Member not found"));
        
        QuitPlans quitPlan = quitPlansRepository.findByMember(member)
                .orElseThrow(() -> new RuntimeException("Quit plan not found"));
        
        // Update fields if provided
        if (quitPlanDTO.getDailyCigarettes() != null) {
            quitPlan.setDailyCigarettes(quitPlanDTO.getDailyCigarettes());
        }
        if (quitPlanDTO.getFirstCigaretteAfterWaking() != null) {
            quitPlan.setFirstCigaretteAfterWaking(quitPlanDTO.getFirstCigaretteAfterWaking());
        }
        if (quitPlanDTO.getWeeklySpending() != null) {
            quitPlan.setWeeklySpending(quitPlanDTO.getWeeklySpending());
        }
        if (quitPlanDTO.getMotivation() != null) {
            quitPlan.setMotivation(quitPlanDTO.getMotivation());
        }
        if (quitPlanDTO.getTriedBefore() != null) {
            quitPlan.setTriedBefore(quitPlanDTO.getTriedBefore());
        }
        if (quitPlanDTO.getQuitGoal() != null) {
            quitPlan.setQuitGoal(quitPlanDTO.getQuitGoal());
        }
        if (quitPlanDTO.getTargetDays() != null) {
            quitPlan.setTargetDays(quitPlanDTO.getTargetDays());
        }
        
        // Update triggers if provided
        if (quitPlanDTO.getTriggers() != null && !quitPlanDTO.getTriggers().isEmpty()) {
            try {
                String triggersJson = objectMapper.writeValueAsString(quitPlanDTO.getTriggers());
                quitPlan.setTriggers(triggersJson);
            } catch (JsonProcessingException e) {
                throw new RuntimeException("Error processing triggers data", e);
            }
        }
        
        QuitPlans updatedPlan = quitPlansRepository.save(quitPlan);
        return convertToDTO(updatedPlan);
    }
    
    /**
     * Xóa quit plan
     */
    @Transactional
    public void deleteQuitPlan(Long memberId) {
        Members member = membersRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("Member not found"));
        
        QuitPlans quitPlan = quitPlansRepository.findByMember(member)
                .orElseThrow(() -> new RuntimeException("Quit plan not found"));
        
        quitPlansRepository.delete(quitPlan);
    }
    
    /**
     * Convert Entity to DTO
     */
    private QuitPlansDTO convertToDTO(QuitPlans quitPlan) {
        QuitPlansDTO dto = new QuitPlansDTO();
        dto.setId(quitPlan.getId());
        
        if (quitPlan.getMember() != null) {
            dto.setMemberId(quitPlan.getMember().getMemberID());
        }
        
        dto.setDailyCigarettes(quitPlan.getDailyCigarettes());
        dto.setFirstCigaretteAfterWaking(quitPlan.getFirstCigaretteAfterWaking());
        dto.setWeeklySpending(quitPlan.getWeeklySpending());
        dto.setMotivation(quitPlan.getMotivation());
        dto.setTriedBefore(quitPlan.getTriedBefore());
        dto.setQuitGoal(quitPlan.getQuitGoal());
        dto.setTargetDays(quitPlan.getTargetDays());
        dto.setActive(quitPlan.isActive());
        
        // Convert triggers JSON string back to list
        if (quitPlan.getTriggers() != null && !quitPlan.getTriggers().trim().isEmpty()) {
            try {
                List<String> triggers = objectMapper.readValue(quitPlan.getTriggers(), 
                    objectMapper.getTypeFactory().constructCollectionType(List.class, String.class));
                dto.setTriggers(triggers);
            } catch (Exception e) {
                // If conversion fails, set empty list
                dto.setTriggers(List.of());
            }
        }
        
        if (quitPlan.getCreatedAt() != null) {
            dto.setCreatedAt(quitPlan.getCreatedAt().toString());
        }
        
        return dto;
    }
    
    /**
     * Tạo quit plan mặc định cho member khi bắt đầu tracking
     */
    @Transactional
    public void createDefaultQuitPlan(Members member) {
        // Kiểm tra xem member đã có quit plan chưa
        Optional<QuitPlans> existingPlan = quitPlansRepository.findByMember(member);
        if (existingPlan.isPresent()) {
            return; // Đã có quit plan rồi
        }
        
        // Tạo quit plan mặc định
        QuitPlans quitPlan = new QuitPlans();
        quitPlan.setMember(member);
        quitPlan.setDailyCigarettes("10"); // Mặc định 10 điếu/ngày
        quitPlan.setFirstCigaretteAfterWaking("30 minutes");
        quitPlan.setWeeklySpending("70000"); // Mặc định 70k/tuần
        quitPlan.setMotivation("Health improvement");
        quitPlan.setTriedBefore("No");
        quitPlan.setQuitGoal("Quit completely");
        quitPlan.setTargetDays(365);
        quitPlan.setTriggers("[]"); // Empty triggers array
        quitPlan.setActive(true);
        quitPlan.setCreatedAt(LocalDateTime.now());
        
        quitPlansRepository.save(quitPlan);
        
        // Cập nhật dailyCost trong Members dựa trên weeklySpending
        int weeklySpending = Integer.parseInt(quitPlan.getWeeklySpending());
        int dailyCost = weeklySpending / 7; // Chia 7 ngày
        member.setDailyCost(dailyCost);
        membersRepository.save(member);
    }
}
