package com.smokingcessation.controller;


import com.smokingcessation.dto.RatingDTO;
import com.smokingcessation.entity.Rating;
import com.smokingcessation.service.RatingService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@SecurityRequirement(name = "api")
@RequestMapping("/api/rating")
public class RatingController {
    @Autowired
    RatingService ratingService;

    // AUTHENTICATED - Members (chỉ rate cho mình), Admin (rate cho bất kỳ ai)
    @PostMapping
    @PreAuthorize("hasAnyRole('MEMBERS', 'ADMIN')")
    public ResponseEntity createRating(@RequestBody RatingDTO ratingRequest) {
        Rating newRating = ratingService.create(ratingRequest);
        return ResponseEntity.ok(newRating);
    }

    @GetMapping("/admin/all")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<RatingDTO>> getAllRatingsForAdmin() {
        List<RatingDTO> ratings = ratingService.getAllRatings();
        return ResponseEntity.ok(ratings);
    }

}