package com.smokingcessation.service;

import com.smokingcessation.entity.Coach;
import com.smokingcessation.repository.CoachRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class CoachService {

    private final CoachRepository coachRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public CoachService(CoachRepository coachRepository, PasswordEncoder passwordEncoder) {
        this.coachRepository = coachRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // Lấy danh sách tất cả coach đang hoạt động
    public List<Coach> getAllActiveCoaches() {
        return coachRepository.findByIsActiveTrue();
    }

    // Tìm coach theo ID
    public Coach findCoachById(Long id) {
        return coachRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy coach"));
    }

    // Tìm coach theo email
    public Coach findCoachByEmail(String email) {
        return coachRepository.findByEmailAndIsActiveTrue(email)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy coach"));
    }

    // Tạo coach mới
    public Coach createCoach(Coach coach) {
        if (coachRepository.existsByEmail(coach.getEmail())) {
            throw new RuntimeException("Email đã tồn tại");
        }
        coach.setPassword(passwordEncoder.encode(coach.getPassword()));
        coach.setCreatedAt(LocalDateTime.now());
        coach.setActive(true);
        return coachRepository.save(coach);
    }

    // Cập nhật thông tin coach (chỉ các trường cơ bản)
    public Coach updateCoach(Long id, Coach updatedCoach) {
        Coach existingCoach = findCoachById(id);
        existingCoach.setName(updatedCoach.getName());
        existingCoach.setPhone(updatedCoach.getPhone());
        existingCoach.setAvailability(updatedCoach.getAvailability());
        existingCoach.setRating(updatedCoach.getRating());
        return coachRepository.save(existingCoach);
    }

    // Vô hiệu hóa coach
    public void deactivateCoach(Long id) {
        Coach coach = findCoachById(id);
        coach.setActive(false);
        coachRepository.save(coach);
    }

    // Kích hoạt coach
    public void activateCoach(Long id) {
        Coach coach = findCoachById(id);
        coach.setActive(true);
        coachRepository.save(coach);
    }
}