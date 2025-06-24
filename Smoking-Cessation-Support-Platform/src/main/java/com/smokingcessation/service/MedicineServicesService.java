package com.smokingcessation.service;

import com.smokingcessation.entity.MedicineService;
import com.smokingcessation.repository.MedicineServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MedicineServicesService {
    @Autowired
    private MedicineServiceRepository medicineServiceRepository;

    /**
     * Retrieves all medicine services.
     * @return A list of all MedicineService entities.
     */
    public List<MedicineService> getAllMedicineServices() {
        return medicineServiceRepository.findAll();
    }

    /**
     * Retrieves a medicine service by its ID.
     * @param id The ID of the medicine service to retrieve.
     * @return An Optional containing the MedicineService if found, or empty if not.
     */
    public Optional<MedicineService> getMedicineServiceById(Long id) {
        return medicineServiceRepository.findById(id);
    }

    /**
     * Creates a new medicine service.
     * @param medicineService The MedicineService entity to save.
     * @return The saved MedicineService entity.
     */
    public MedicineService createMedicineService(MedicineService medicineService) {
        return medicineServiceRepository.save(medicineService);
    }

    /**
     * Updates an existing medicine service.
     * If the medicine service with the given ID exists, it updates its details.
     * @param id The ID of the medicine service to update.
     * @param medicineServiceDetails The updated MedicineService entity.
     * @return An Optional containing the updated MedicineService if found and updated, or empty if not found.
     */
    public Optional<MedicineService> updateMedicineService(Long id, MedicineService medicineServiceDetails) {
        return medicineServiceRepository.findById(id)
                .map(medicineService -> {
                    medicineService.setName(medicineServiceDetails.getName());
                    medicineService.setDescription(medicineServiceDetails.getDescription());
                    medicineService.setPrice(medicineServiceDetails.getPrice());
                    medicineService.setAvailable(medicineServiceDetails.isAvailable());
                    return medicineServiceRepository.save(medicineService);
                });
    }

    /**
     * Deletes a medicine service by its ID.
     * @param id The ID of the medicine service to delete.
     * @return True if the medicine service was found and deleted, false otherwise.
     */
    public boolean deleteMedicineService(Long id) {
        if (medicineServiceRepository.existsById(id)) {
            medicineServiceRepository.deleteById(id);
            return true;
        }
        return false;
    }
}

