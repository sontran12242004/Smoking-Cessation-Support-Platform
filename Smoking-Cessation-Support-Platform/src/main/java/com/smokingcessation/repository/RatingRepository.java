package com.smokingcessation.repository;

import com.smokingcessation.entity.Account;
import com.smokingcessation.entity.Appointment;
import com.smokingcessation.entity.Coach;
import com.smokingcessation.entity.MedicineService;
import com.smokingcessation.entity.Rating;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RatingRepository extends JpaRepository<Rating, Long> {
    boolean existsByAccountAndMedicineService(Account account, MedicineService medicineService);

    // Tìm ratings cho coach
    List<Rating> findByCoach_Id(Long coachId);

    // Đếm ratings cho coach
    long countByCoach_Id(Long coachId);

    // Kiểm tra xem appointment đã được rating chưa
    boolean existsByAppointment(Appointment appointment);

    // Tìm rating theo appointment
    Optional<Rating> findByAppointment(Appointment appointment);

    // Tìm rating theo appointment và member
    Optional<Rating> findByAppointmentAndAccount(Appointment appointment, Account account);
}