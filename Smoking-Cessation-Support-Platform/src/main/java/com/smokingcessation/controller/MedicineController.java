package com.smokingcessation.controller;

import com.smokingcessation.entity.MedicineService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.smokingcessation.service.MedicineServices;

import java.util.List;
import java.util.Optional;

@RestController
@SecurityRequirement(name = "api")
@RequestMapping("/api/medicineService")
public class MedicineController {

    @Autowired
    private MedicineServices medicineServices;

    /**
     * GET /api/medicineservices
     * Retrieves all medicine services.
     * @return ResponseEntity with a list of MedicineService and HTTP status OK.
     */
    @GetMapping
    public ResponseEntity<List<MedicineService>> getAllMedicineServices() {
        List<MedicineService> medicineServices = this.medicineServices.getAllMedicineServices();
        return new ResponseEntity<>(medicineServices, HttpStatus.OK);
    }

    /**
     * GET /api/medicineservices/{id}
     * Retrieves a medicine service by its ID.
     * @param id The ID of the medicine service to retrieve.
     * @return ResponseEntity with the MedicineService and HTTP status OK, or NOT_FOUND if not found.
     */
    @GetMapping("/{id}")
    public ResponseEntity<MedicineService> getMedicineServiceById(@PathVariable Long id) {
        Optional<MedicineService> medicineService = medicineServices.getMedicineServiceById(id);
        return medicineService.map(service -> new ResponseEntity<>(service, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * POST /api/medicineservices
     * Creates a new medicine service.
     * @param medicineService The MedicineService object to create.
     * @return ResponseEntity with the created MedicineService and HTTP status CREATED.
     */
    @PostMapping
    public ResponseEntity<MedicineService> createMedicineService(@RequestBody MedicineService medicineService) {
        MedicineService createdService = medicineServices.createMedicineService(medicineService);
        return new ResponseEntity<>(createdService, HttpStatus.CREATED);
    }

    /**
     * PUT /api/medicineservices/{id}
     * Updates an existing medicine service.
     * @param id The ID of the medicine service to update.
     * @param medicineServiceDetails The updated MedicineService object.
     * @return ResponseEntity with the updated MedicineService and HTTP status OK, or NOT_FOUND if not found.
     */
    @PutMapping("/{id}")
    public ResponseEntity<MedicineService> updateMedicineService(@PathVariable Long id, @RequestBody MedicineService medicineServiceDetails) {
        Optional<MedicineService> updatedService = medicineServices.updateMedicineService(id, medicineServiceDetails);
        return updatedService.map(service -> new ResponseEntity<>(service, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE /api/medicineservices/{id}
     * Deletes a medicine service by its ID.
     * @param id The ID of the medicine service to delete.
     * @return ResponseEntity with HTTP status NO_CONTENT if deleted, or NOT_FOUND if not found.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMedicineService(@PathVariable Long id) {
        boolean deleted = medicineServices.deleteMedicineService(id);
        if (deleted) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
