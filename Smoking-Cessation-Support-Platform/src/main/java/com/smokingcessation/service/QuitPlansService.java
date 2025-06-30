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
     * Danh sách các lựa chọn hợp lệ cho từng trường (theo UI)
     */
    private static final List<String> ALLOWED_DAILY_CIGARETTES = List.of("1-5", "6-10", "11-20", "More than 20");
    private static final List<String> ALLOWED_FIRST_CIGARETTE = List.of("Within 5 minutes", "6-30 minutes", "31-60 minutes", "After 60 minutes");
    private static final List<String> ALLOWED_MOTIVATION = List.of("Health reasons", "Family/relationships", "Financial savings", "Appearance/smell");
    private static final List<String> ALLOWED_TRIED_BEFORE = List.of("No, this is my first time", "Yes, once", "Yes, multiple times");
    private static final List<String> ALLOWED_WEEKLY_SPENDING = List.of("Under $10", "$10 - $25", "$26 - $50", "Over $50");
    private static final List<String> ALLOWED_TRIGGERS = List.of("Morning coffee", "Stressful situations", "Social gatherings", "After meals", "When bored");
    
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
        // Validate các trường chỉ nhận giá trị hợp lệ
        if (!ALLOWED_DAILY_CIGARETTES.contains(quitPlanDTO.getDailyCigarettes())) {
            throw new RuntimeException("Invalid daily cigarettes value");
        }
        if (!ALLOWED_FIRST_CIGARETTE.contains(quitPlanDTO.getFirstCigaretteAfterWaking())) {
            throw new RuntimeException("Invalid first cigarette after waking value");
        }
        if (!ALLOWED_WEEKLY_SPENDING.contains(quitPlanDTO.getWeeklySpending())) {
            throw new RuntimeException("Invalid weekly spending value");
        }
        if (!ALLOWED_MOTIVATION.contains(quitPlanDTO.getMotivation())) {
            throw new RuntimeException("Invalid motivation value");
        }
        if (!ALLOWED_TRIED_BEFORE.contains(quitPlanDTO.getTriedBefore())) {
            throw new RuntimeException("Invalid tried before value");
        }
        if (quitPlanDTO.getTriggers() != null) {
            for (String trigger : quitPlanDTO.getTriggers()) {
                if (!ALLOWED_TRIGGERS.contains(trigger)) {
                    throw new RuntimeException("Invalid trigger: " + trigger);
                }
            }
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
        
        // Validate các trường nếu có cập nhật
        if (quitPlanDTO.getDailyCigarettes() != null && !ALLOWED_DAILY_CIGARETTES.contains(quitPlanDTO.getDailyCigarettes())) {
            throw new RuntimeException("Invalid daily cigarettes value");
        }
        if (quitPlanDTO.getFirstCigaretteAfterWaking() != null && !ALLOWED_FIRST_CIGARETTE.contains(quitPlanDTO.getFirstCigaretteAfterWaking())) {
            throw new RuntimeException("Invalid first cigarette after waking value");
        }
        if (quitPlanDTO.getWeeklySpending() != null && !ALLOWED_WEEKLY_SPENDING.contains(quitPlanDTO.getWeeklySpending())) {
            throw new RuntimeException("Invalid weekly spending value");
        }
        if (quitPlanDTO.getMotivation() != null && !ALLOWED_MOTIVATION.contains(quitPlanDTO.getMotivation())) {
            throw new RuntimeException("Invalid motivation value");
        }
        if (quitPlanDTO.getTriedBefore() != null && !ALLOWED_TRIED_BEFORE.contains(quitPlanDTO.getTriedBefore())) {
            throw new RuntimeException("Invalid tried before value");
        }
        if (quitPlanDTO.getTriggers() != null) {
            for (String trigger : quitPlanDTO.getTriggers()) {
                if (!ALLOWED_TRIGGERS.contains(trigger)) {
                    throw new RuntimeException("Invalid trigger: " + trigger);
                }
            }
        }
        
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

}
