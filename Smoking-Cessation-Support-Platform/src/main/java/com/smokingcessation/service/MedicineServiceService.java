package com.smokingcessation.service;

import com.smokingcessation.entity.MedicineService;
import com.smokingcessation.repository.MedicineServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MedicineServiceService {

    @Autowired
    private MedicineServiceRepository repository;

    public List<MedicineService> getAll() {
        return repository.findAll();
    }

    public Optional<MedicineService> getById(Long id) {
        return repository.findById(id);
    }

    public MedicineService create(MedicineService medicineService) {
        return repository.save(medicineService);
    }

    public MedicineService update(Long id, MedicineService updatedService) {
        return repository.findById(id).map(existing -> {
            existing.setName(updatedService.getName());
            existing.setDescription(updatedService.getDescription());
            existing.setPrice(updatedService.getPrice());
            existing.setAvailable(updatedService.isAvailable());
            return repository.save(existing);
        }).orElse(null);
    }

    public boolean delete(Long id) {
        return repository.findById(id).map(existing -> {
            repository.delete(existing);
            return true;
        }).orElse(false);
    }
}
