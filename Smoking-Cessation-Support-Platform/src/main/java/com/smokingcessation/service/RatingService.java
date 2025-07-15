package com.smokingcessation.service;

import com.smokingcessation.dto.RatingDTO;
import com.smokingcessation.entity.Account;
import com.smokingcessation.entity.Appointment;
import com.smokingcessation.entity.Coach;
import com.smokingcessation.entity.MedicineService;
import com.smokingcessation.entity.Rating;
import com.smokingcessation.enums.AppointmentEnum;
import com.smokingcessation.exception.exceptions.BadRequestException;
import com.smokingcessation.repository.AppointmentRepository;
import com.smokingcessation.repository.MedicineServiceRepository;
import com.smokingcessation.repository.CoachRepository;
import com.smokingcessation.repository.RatingRepository;
import com.smokingcessation.repository.MembersRepository;
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
    CoachRepository coachRepository;
    @Autowired
    AppointmentRepository appointmentRepository;
    @Autowired
    MembersRepository membersRepository;

    public Rating create(RatingDTO ratingRequest) {
        // rating tu 1 -> 5
        if(ratingRequest.getRating() <1 || ratingRequest.getRating() > 5){
            throw new BadRequestException("Rating should be between 1 and 5");
        }

        // Để tạm thời compatibility với code cũ
        Account currentAccount = null;
        try {
            currentAccount = authenticationService.getCurrentAccount();
        } catch (Exception e) {
            // Không có authentication, bỏ qua
        }

        MedicineService medicineService = null;

        // Nếu có serviceId thì tìm service, nếu không thì để null
        if (ratingRequest.getServiceId() != null) {
            medicineService = medicineServiceRepository.findById(ratingRequest.getServiceId())
                    .orElse(null); // Không throw exception, chỉ set null
        }

        // Check xem đã rating service này hay chưa (chỉ khi có service và account)
        if (medicineService != null && currentAccount != null && ratingRepository.existsByAccountAndMedicineService(currentAccount, medicineService)) {
            throw new BadRequestException("Rating already exists for this service");
        }

        // Tạo rating
        Rating rating = new Rating();
        rating.setAccount(currentAccount);
        rating.setMedicineService(medicineService); // Có thể null
        rating.setRating(ratingRequest.getRating());
        rating.setFeedback(ratingRequest.getFeedback());
        rating.setCreatedAt(LocalDateTime.now());
        return ratingRepository.save(rating);
    }

    /**
     * Rating coach sau khi hoàn thành appointment
     */
    public Rating rateCoachAfterAppointment(RatingDTO ratingRequest) {
        // Validate input
        if (ratingRequest.getRating() < 1 || ratingRequest.getRating() > 5) {
            throw new BadRequestException("Rating should be between 1 and 5");
        }
        if (ratingRequest.getAppointmentId() == null) {
            throw new BadRequestException("Appointment ID is required for coach rating");
        }

        // Tìm appointment
        Appointment appointment = appointmentRepository.findById(ratingRequest.getAppointmentId())
                .orElseThrow(() -> new BadRequestException("Appointment not found"));

        // Kiểm tra appointment đã hoàn thành chưa
        if (appointment.getStatus() != AppointmentEnum.COMPLETED) {
            throw new BadRequestException("Can only rate completed appointments");
        }

        // Kiểm tra xem đã rating appointment này chưa
        if (ratingRepository.existsByAppointment(appointment)) {
            throw new BadRequestException("This appointment has already been rated");
        }

        // Tạo rating cho coach
        Rating rating = new Rating();
        rating.setAccount(appointment.getAccount()); // Sử dụng account từ appointment
        rating.setCoach(appointment.getCoach());
        rating.setAppointment(appointment);
        rating.setRating(ratingRequest.getRating());
        rating.setFeedback(ratingRequest.getFeedback());
        rating.setCreatedAt(LocalDateTime.now());

        // Nếu appointment có member liên kết
        if (appointment.getMember() != null) {
            rating.setMember(appointment.getMember());
        }

        return ratingRepository.save(rating);
    }

    /**
     * Lấy danh sách appointment đã hoàn thành mà chưa được rating theo memberId
     */
    public List<RatingDTO> getCompletedAppointmentsForRating(Long memberId) {
        if (memberId == null) {
            throw new BadRequestException("Member ID is required");
        }

        // Tìm member theo memberId
        var member = membersRepository.findById(memberId);
        if (member.isEmpty()) {
            throw new BadRequestException("Member not found");
        }
        Account memberAccount = member.get().getAccount();
        if (memberAccount == null) {
            throw new BadRequestException("Member account not found");
        }

        // Tìm tất cả appointment COMPLETED của member này
        List<Appointment> completedAppointments = appointmentRepository.findAll().stream()
                .filter(apt -> apt.getStatus() == AppointmentEnum.COMPLETED)
                .filter(apt -> apt.getAccount() != null && apt.getAccount().getId() == memberAccount.getId())
                .filter(apt -> !ratingRepository.existsByAppointment(apt)) // Chưa được rating
                .toList();

        List<RatingDTO> result = new ArrayList<>();
        for (Appointment appointment : completedAppointments) {
            RatingDTO dto = new RatingDTO();
            dto.setAppointmentId(appointment.getId());
            dto.setCoachId(appointment.getCoach().getId());
            dto.setCoachName(appointment.getCoach().getName());
            if (appointment.getMember() != null) {
                dto.setMemberName(appointment.getMember().getName());
            }
            dto.setCreatedAt(appointment.getCreateAt());
            result.add(dto);
        }
        return result;
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
            if (rating.getAccount() != null) {
                dto.setMemberName(rating.getAccount().getFullName());
            }
            dto.setRating(rating.getRating());
            dto.setFeedback(rating.getFeedback());
            dto.setCreatedAt(rating.getCreatedAt().toLocalDate());

            // Thêm thông tin coach nếu có
            if (rating.getCoach() != null) {
                dto.setCoachId(rating.getCoach().getId());
                dto.setCoachName(rating.getCoach().getName());
            }

            // Thêm thông tin appointment nếu có
            if (rating.getAppointment() != null) {
                dto.setAppointmentId(rating.getAppointment().getId());
            }

            result.add(dto);
        }
        return result;
    }

    /**
     * Lấy danh sách rating cho một coach cụ thể
     */
    public List<RatingDTO> getRatingsForCoach(Long coachId) {
        List<Rating> ratings = ratingRepository.findByCoach_Id(coachId);
        List<RatingDTO> result = new ArrayList<>();
        for (Rating rating : ratings) {
            RatingDTO dto = new RatingDTO();
            dto.setId(rating.getId());
            dto.setRating(rating.getRating());
            dto.setFeedback(rating.getFeedback());
            dto.setCreatedAt(rating.getCreatedAt().toLocalDate());
            dto.setCoachId(rating.getCoach().getId());
            dto.setCoachName(rating.getCoach().getName());

            if (rating.getAccount() != null) {
                dto.setMemberName(rating.getAccount().getFullName());
            }

            if (rating.getAppointment() != null) {
                dto.setAppointmentId(rating.getAppointment().getId());
            }

            result.add(dto);
        }
        return result;
    }
}
