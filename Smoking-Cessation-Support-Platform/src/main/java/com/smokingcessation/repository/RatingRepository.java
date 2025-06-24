package com.smokingcessation.repository;

import com.smokingcessation.entity.Account;
import com.smokingcessation.entity.MedicineService;
import com.smokingcessation.entity.Rating;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RatingRepository extends JpaRepository<Rating, Long> {
    boolean existsByAccountAndMedicineService(Account account, MedicineService medicineService);

}