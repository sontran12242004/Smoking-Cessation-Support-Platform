package com.smokingcessation.controller;

import com.smokingcessation.entity.MedicineService;
import com.smokingcessation.service.MedicineServiceService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/medicine-services")
@SecurityRequirement(name = "api")
public class MedicineServiceController {

    @Autowired
    private MedicineServiceService service;

    @GetMapping
    public List<MedicineService> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<MedicineService> getById(@PathVariable Long id) {
        return service.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public MedicineService create(@RequestBody MedicineService medicineService) {
        return service.create(medicineService);
    }

    @PutMapping("/{id}")
    public ResponseEntity<MedicineService> update(@PathVariable Long id, @RequestBody MedicineService medicineService) {
        MedicineService updated = service.update(id, medicineService);
        return updated != null
                ? ResponseEntity.ok(updated)
                : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        return service.delete(id)
                ? ResponseEntity.noContent().build()
                : ResponseEntity.notFound().build();
    }
}
