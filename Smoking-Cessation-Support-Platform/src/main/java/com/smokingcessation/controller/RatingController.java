package com.smokingcessation.controller;


import com.smokingcessation.dto.RatingDTO;
import com.smokingcessation.entity.Rating;
import com.smokingcessation.service.RatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rating")
public class RatingController {
    @Autowired
    RatingService ratingService;

    // PUBLIC - Ai cũng có thể tạo rating cho service
    @PostMapping
    public ResponseEntity createRating(@RequestBody RatingDTO ratingRequest) {
        Rating newRating = ratingService.create(ratingRequest);
        return ResponseEntity.ok(newRating);
    }

    // PUBLIC - Ai cũng có thể rating coach sau khi hoàn thành appointment
    @PostMapping("/coach")
    public ResponseEntity<?> rateCoachAfterAppointment(@RequestBody RatingDTO ratingRequest) {
        try {
            Rating newRating = ratingService.rateCoachAfterAppointment(ratingRequest);
            return ResponseEntity.ok(newRating);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // PUBLIC - Ai cũng có thể lấy danh sách appointment đã hoàn thành mà chưa được rating
    @GetMapping("/appointments/completed")
    public ResponseEntity<List<RatingDTO>> getCompletedAppointmentsForRating(@RequestParam(required = false) Long memberId) {
        List<RatingDTO> appointments = ratingService.getCompletedAppointmentsForRating(memberId);
        return ResponseEntity.ok(appointments);
    }

    // PUBLIC - Ai cũng có thể lấy danh sách rating cho một coach cụ thể
    @GetMapping("/coach/{coachId}")
    public ResponseEntity<List<RatingDTO>> getRatingsForCoach(@PathVariable Long coachId) {
        List<RatingDTO> ratings = ratingService.getRatingsForCoach(coachId);
        return ResponseEntity.ok(ratings);
    }

    // PUBLIC - Ai cũng có thể xem tất cả ratings
    @GetMapping("/admin/all")
    public ResponseEntity<List<RatingDTO>> getAllRatingsForAdmin() {
        List<RatingDTO> ratings = ratingService.getAllRatings();
        return ResponseEntity.ok(ratings);
    }

}