package com.smokingcessation.service;

import com.smokingcessation.dto.RatingDTO;
import com.smokingcessation.entity.Account;
import com.smokingcessation.entity.MedicineService;
import com.smokingcessation.entity.Rating;
import com.smokingcessation.exception.exceptions.BadRequestException;
import com.smokingcessation.repository.MedicineServiceRepository;
import com.smokingcessation.repository.CoachRepository;
import com.smokingcessation.repository.RatingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import java.time.LocalDateTime;

@Service
public class RatingService {
    @Autowired
    RatingRepository ratingRepository;
    @Autowired
    AuthenticationService authenticationService;
    @Autowired
    MedicineServiceRepository medicineServiceRepository;
    @Autowired
    CoachRepository  coachRepository;




    public Rating create(RatingDTO ratingRequest) {
        // rating tu 1 -> 5
        if(ratingRequest.getRating() <1 || ratingRequest.getRating() > 5){
            throw new BadRequestException("Rating should be between 1 and 5");
        }
        // lay account thang tao rating
        Account currentAcount = authenticationService.getCurrentAccount();
        // lay service
        MedicineService medicineService = medicineServiceRepository.findById(ratingRequest.getServiceId())
                .orElseThrow(() -> new BadRequestException("Service not found"));

//        check xem thang nay da rating cai service nay hay chua
        if(ratingRepository.existsByAccountAndMedicineService(currentAcount,medicineService)){
            throw new BadRequestException("Rating already exists");
        }else{
            Rating rating = new Rating();
            rating.setAccount(currentAcount);
            rating.setMedicineService(medicineService);
            rating.setRating(ratingRequest.getRating());
            rating.setFeedback(ratingRequest.getFeedback());
            rating.setCreatedAt(LocalDateTime.now());
            return ratingRepository.save(rating);
        }


    }
    public int[] countStarsForCoach(Long coachId) {
        int[] starCounts = new int[6]; // 0 unused, 1-5
        List<Rating> ratings = ratingRepository.findByCoachId(coachId);
        for (Rating r : ratings) {
            if (r.getRating() >= 1 && r.getRating() <= 5) {
                starCounts[r.getRating()]++;
            }
        }
        return starCounts;
    }

    public List<RatingDTO> getAllRatings() {
        List<Rating> ratings = ratingRepository.findAll();
        List<RatingDTO> result = new ArrayList<>();
        for (Rating rating : ratings) {
            RatingDTO dto = new RatingDTO();
            dto.setId(rating.getId());
            dto.setMemberName(rating.getAccount().getFullName()); // hoặc getMember().getName()
            dto.setRating(rating.getRating()); // hoặc getStar()
            dto.setFeedback(rating.getFeedback());
            dto.setCreatedAt(rating.getCreatedAt().toLocalDate());
            result.add(dto);
        }
        return result;
    }

}
