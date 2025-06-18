package com.smokingcessation.service;

import com.smokingcessation.dto.AssignRequest;
import com.smokingcessation.entity.Admin;
import com.smokingcessation.entity.Coach;
import com.smokingcessation.repository.AdminRepository;
import com.smokingcessation.repository.CoachRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CoachService {

    @Autowired
    private CoachRepository coachRepository;

    @Autowired
    private AdminRepository adminRepository;

    public List<Coach> getAllCoaches() {
        return coachRepository.findAll();
    }

    public Optional<Coach> getCoachById(Long id) {
        return coachRepository.findById(id);
    }

    public Coach createCoach(Coach coach) {
        return coachRepository.save(coach);
    }

    public Coach updateCoach(Long id, Coach updatedCoach) {
        return coachRepository.findById(id).map(coach -> {
            coach.setName(updatedCoach.getName());
            coach.setEmail(updatedCoach.getEmail());
            coach.setPhone(updatedCoach.getPhone());
            coach.setPassword(updatedCoach.getPassword());
            coach.setAdmin(updatedCoach.getAdmin());
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
}
