package com.smokingcessation.controller;


import com.smokingcessation.dto.RatingDTO;
import com.smokingcessation.entity.Rating;
import com.smokingcessation.service.RatingService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@SecurityRequirement(name = "api")
@RequestMapping("/api/rating")
public class RatingController {
    @Autowired
    RatingService ratingService;

    @PostMapping
    public ResponseEntity createRating(@RequestBody RatingDTO ratingRequest) {
        Rating newRating = ratingService.create(ratingRequest);
        return ResponseEntity.ok(newRating);
    }

}