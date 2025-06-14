package com.smokingcessation.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.smokingcessation.dto.CoachDTO;
import com.smokingcessation.entity.Coach;
import com.smokingcessation.repository.CoachRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CoachService {

    private final CoachRepository coachRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    private ObjectMapper objectMapper;

    private CoachDTO convertToDTO(Coach coach) {
        return objectMapper.convertValue(coach, CoachDTO.class);
    }

    @Autowired
    public CoachService(CoachRepository coachRepository, PasswordEncoder passwordEncoder) {
        this.coachRepository = coachRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // Lấy danh sách tất cả coach đang hoạt động
    public List<CoachDTO> getAllActiveCoaches() {
        return coachRepository.findByIsActiveTrue()
            .stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }

    // Tìm coach theo ID
    public CoachDTO findCoachById(Long id) {
        Coach coach = coachRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Không tìm thấy coach"));
        return convertToDTO(coach);
    }

    // Tìm coach theo email
    public CoachDTO findCoachByEmail(String email) {
        Coach coach = coachRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("Không tìm thấy coach"));
        return convertToDTO(coach);
    }

    // Cập nhật thông tin coach (chỉ các trường cơ bản)
    public CoachDTO updateCoach(Long id, Coach updatedCoach) {
        Coach existingCoach = coachRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Không tìm thấy coach"));
        existingCoach.setName(updatedCoach.getName());
        existingCoach.setPhone(updatedCoach.getPhone());
        existingCoach.setAvailability(updatedCoach.getAvailability());
        existingCoach.setRating(updatedCoach.getRating());
        Coach savedCoach = coachRepository.save(existingCoach);
        return convertToDTO(savedCoach);
    }

    public CoachDTO login(String email, String password) {
        Optional<Coach> coachOptional = coachRepository.findByEmail(email);
        if (coachOptional.isPresent()) {
            Coach coach = coachOptional.get();
            if (passwordEncoder.matches(password, coach.getPassword())) {
                return convertToDTO(coach);
            }
        }
        return null;
    }

} 