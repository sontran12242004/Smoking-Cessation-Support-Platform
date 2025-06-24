package com.smokingcessation.service;

import com.smokingcessation.dto.RatingDTO;
import com.smokingcessation.entity.Account;
import com.smokingcessation.entity.MedicineService;
import com.smokingcessation.entity.Rating;
import com.smokingcessation.exception.exceptions.BadRequestException;
import com.smokingcessation.repository.MedicineServiceRepository;
import com.smokingcessation.repository.RatingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class RatingService {
    @Autowired
    RatingRepository ratingRepository;
    @Autowired
    AuthenticationService authenticationService;
    @Autowired
    MedicineServiceRepository medicineServiceRepository;


    public Rating create(RatingDTO ratingRequest) {
        // rating tu 1 -> 5
        if(ratingRequest.getStar() <1 || ratingRequest.getStar() > 5){
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
            rating.setRating(ratingRequest.getStar());
            rating.setComment(ratingRequest.getComment());
            rating.setCreatedAt(LocalDateTime.now());
            return ratingRepository.save(rating);
        }


    }
}
