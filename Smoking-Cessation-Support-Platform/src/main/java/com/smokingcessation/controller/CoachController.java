package com.smokingcessation.controller;

import com.smokingcessation.dto.AssignRequest;
import com.smokingcessation.dto.CoachDTO;
import com.smokingcessation.entity.Coach;
import com.smokingcessation.service.CoachService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/coaches")
public class CoachController {

    @Autowired
    private CoachService coachService;

    @Autowired
    ModelMapper modelMapper;

    @GetMapping
    public List<Coach> getAllCoaches() {
        return coachService.getAllCoaches();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Coach> getCoachById(@PathVariable Long id) {
        return coachService.getCoachById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Coach createCoach(@RequestBody CoachDTO coachDTO) {
        Coach coach = modelMapper.map(coachDTO, Coach.class);
        return coachService.createCoach(coach);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Coach> updateCoach(@PathVariable Long id, @RequestBody Coach coach) {
        Coach updated = coachService.updateCoach(id, coach);
        if (updated != null) {
            return ResponseEntity.ok(updated);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCoach(@PathVariable Long id) {
        if (coachService.deleteCoach(id)) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }


    }

    @PostMapping("assign")
    public ResponseEntity assignCoach (@RequestBody AssignRequest assignRequest ) {
        Coach coach = coachService.assignCoach(assignRequest);
         return ResponseEntity.ok(coach);
    }
}
