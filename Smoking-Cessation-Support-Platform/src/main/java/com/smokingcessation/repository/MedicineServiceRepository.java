package com.smokingcessation.repository;

import com.smokingcessation.entity.MedicineService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MedicineServiceRepository extends JpaRepository<MedicineService, Long> {
    List<MedicineService> findByIdIn(List<Long> ids);
}
