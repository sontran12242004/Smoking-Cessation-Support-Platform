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

        MedicineService medicineService = null;

        // Nếu có serviceId thì tìm service, nếu không thì để null
        if (ratingRequest.getServiceId() != null) {
            medicineService = medicineServiceRepository.findById(ratingRequest.getServiceId())
                    .orElse(null); // Không throw exception, chỉ set null
        }

        // Check xem đã rating service này hay chưa (chỉ khi có service)
        if (medicineService != null && ratingRepository.existsByAccountAndMedicineService(currentAcount, medicineService)) {
            throw new BadRequestException("Rating already exists for this service");
        }

        // Tạo rating
        Rating rating = new Rating();
        rating.setAccount(currentAcount);
        rating.setMedicineService(medicineService); // Có thể null
        rating.setRating(ratingRequest.getRating());
        rating.setFeedback(ratingRequest.getFeedback());
        rating.setCreatedAt(LocalDateTime.now());
        return ratingRepository.save(rating);


    }
    public int[] countStarsForCoach(Long coachId) {
        int[] starCounts = new int[6]; // 0 unused, 1-5
        List<Rating> ratings = ratingRepository.findByCoach_Id(coachId);
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
