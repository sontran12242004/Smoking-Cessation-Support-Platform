package com.smokingcessation.repository;

import com.smokingcessation.entity.Account;
import com.smokingcessation.entity.Coach;
import com.smokingcessation.entity.MedicineService;
import com.smokingcessation.entity.Rating;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RatingRepository extends JpaRepository<Rating, Long> {
    boolean existsByAccountAndMedicineService(Account account, MedicineService medicineService);
    List<Rating> findByCoachId(Long coachId);
}