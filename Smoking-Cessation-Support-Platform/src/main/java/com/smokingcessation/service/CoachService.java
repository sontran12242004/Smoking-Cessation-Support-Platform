package com.smokingcessation.service;

import com.smokingcessation.dto.AssignRequest;
import com.smokingcessation.dto.CoachDTO;
import com.smokingcessation.entity.Admin;
import com.smokingcessation.entity.Coach;
import com.smokingcessation.repository.AdminRepository;
import com.smokingcessation.repository.AppointmentRepository;
import com.smokingcessation.repository.CoachRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class CoachService {

    @Autowired
    private CoachRepository coachRepository;

    @Autowired
    AppointmentRepository  appointmentRepository;

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private RatingService ratingService;


    public List<Coach> getAllCoaches() {
        return coachRepository.findAll();
    }

    public Optional<Coach> getCoachById(Long id) {
        return coachRepository.findById(id);
    }

    public CoachDTO getCoachProfile(Long coachId) {
        Coach coach = coachRepository.findById(coachId)
                .orElseThrow(() -> new RuntimeException("Coach not found"));

        CoachDTO dto = new CoachDTO();
        dto.setId(coach.getId());
        dto.setName(coach.getName());
        if (coach.getAccount() != null) {
            dto.setEmail(coach.getAccount().getEmail());
        }
        dto.setSpecialization(coach.getSpecialization());
        dto.setExperience(coach.getExperience());
        dto.setBio(coach.getBio());
        return dto;
    }

    public Coach createCoach(CoachDTO coachDTO) {
        Coach coach = new Coach();
        coach.setName(coachDTO.getName());
        coach.setTitle(coachDTO.getTitle());
        coach.setBio(coachDTO.getBio());
        coach.setCertifications(coachDTO.getCertifications());
        coach.setHourlyRate(coachDTO.getHourlyRate());
        coach.setSpecialization(coachDTO.getSpecialization());
        coach.setExperience(coachDTO.getExperience());
        coach.setCreatedAt(LocalDateTime.now());
        return coachRepository.save(coach);
    }

    public Coach adminEditCoach(Long id, CoachDTO coachDTO) {
        return coachRepository.findById(id).map(coach -> {
            coach.setName(coachDTO.getName());
            coach.setTitle(coachDTO.getTitle());
            coach.setBio(coachDTO.getBio());
            coach.setCertifications(coachDTO.getCertifications());
            coach.setHourlyRate(coachDTO.getHourlyRate());
            coach.setSpecialization(coachDTO.getSpecialization());
            coach.setExperience(coachDTO.getExperience());
            // Có thể cập nhật thêm các trường khác nếu cần
            return coachRepository.save(coach);
        }).orElse(null);
    }

    public Coach updateCoach(Long id, Coach updatedCoach) {
        return coachRepository.findById(id).map(coach -> {
            coach.setName(updatedCoach.getName());
            coach.setBio(updatedCoach.getBio());
            coach.setCertifications(updatedCoach.getCertifications());
            return coachRepository.save(coach);
        }).orElse(null);
    }

    public boolean deleteCoach(Long id) {
        return coachRepository.findById(id).map(coach -> {
            coachRepository.delete(coach);
            return true;
        }).orElse(false);
    }

    public Coach assignCoach(AssignRequest assignRequest){
        Coach coach = coachRepository.findById(assignRequest.getCoachId()).get();

        Admin admin = adminRepository.findById(assignRequest.getAdminId()).get();

        coach.setAdmin(admin);

        return coachRepository.save(coach);
    }

    public int getClientCountForCoach(Long coachId) {
        // Đếm số lượng unique member đã từng có appointment với coach này
        return appointmentRepository.countDistinctMemberByCoachId(coachId);
    }

    public double calculateSuccessRateForCoach(Long coachId) {
        int[] starCounts = ratingService.countStarsForCoach(coachId);
        int modeStar = 0;
        int maxCount = 0;
        for (int i = 1; i <= 5; i++) {
            if (starCounts[i] > maxCount) {
                maxCount = starCounts[i];
                modeStar = i;
            }
        }
        return (modeStar / 5.0) * 100;
    }

    public double getAvgRatingForCoach(Long coachId) {
        int[] starCounts = ratingService.countStarsForCoach(coachId);
        int total = 0, sum = 0;
        for (int i = 1; i <= 5; i++) {
            sum += starCounts[i] * i;
            total += starCounts[i];
        }
        return total == 0 ? 0.0 : (double) sum / total;
    }

    public double getAvgSuccessRate() {
        List<Coach> coaches = coachRepository.findAll();
        return coaches.stream()
                .mapToDouble(coach -> calculateSuccessRateForCoach(coach.getId()))
                .average().orElse(0.0);
    }

    public double getAvgRating() {
        List<Coach> coaches = coachRepository.findAll();
        return coaches.stream()
                .mapToDouble(coach -> getAvgRatingForCoach(coach.getId()))
                .average().orElse(0.0);
    }

    public int getRatingCountForCoach(Long coachId) {
        int[] starCounts = ratingService.countStarsForCoach(coachId);
        int total = 0;
        for (int i = 1; i <= 5; i++) total += starCounts[i];
        return total;
    }

    public List<Map<String, Object>> getCoachCardList() {
        List<Coach> coaches = coachRepository.findAll();
        List<Map<String, Object>> result = new java.util.ArrayList<>();
        for (Coach coach : coaches) {
            Map<String, Object> map = new java.util.HashMap<>();
            map.put("id", coach.getId());
            map.put("name", coach.getName());
            map.put("rating", getAvgRatingForCoach(coach.getId()));
            map.put("ratingCount", getRatingCountForCoach(coach.getId()));
            map.put("clientCount", getClientCountForCoach(coach.getId()));
            map.put("successRate", calculateSuccessRateForCoach(coach.getId()));
            result.add(map);
        }
        return result;
    }

    public Map<String, Object> getCoachDashboardSummary() {
        List<Coach> allCoaches = coachRepository.findAll();
        int totalCoaches = allCoaches.size();
        int activeCoaches = (int) allCoaches.stream().filter(Coach::isActive).count();
        double avgRating = getAvgRating();
        double avgSuccessRate = getAvgSuccessRate();
        Map<String, Object> result = new java.util.HashMap<>();
        result.put("totalCoaches", totalCoaches);
        result.put("activeCoaches", activeCoaches);
        result.put("avgRating", Math.round(avgRating * 10.0) / 10.0); // Làm tròn 1 số thập phân
        result.put("successRate", Math.round(avgSuccessRate)); // Làm tròn số nguyên %

        return result;
    }

    // Method mới: gộp cả summary và coach card list
    public Map<String, Object> getCoachDashboardData() {
        Map<String, Object> result = new java.util.HashMap<>();
        
        // Thêm summary data
        result.putAll(getCoachDashboardSummary());
        
        // Thêm coach card list
        result.put("coachCards", getCoachCardList());
        
        return result;
    }

}
