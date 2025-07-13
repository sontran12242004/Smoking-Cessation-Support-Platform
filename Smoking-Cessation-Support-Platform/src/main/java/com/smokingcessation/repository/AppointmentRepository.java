package com.smokingcessation.repository;

import com.smokingcessation.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface    AppointmentRepository extends JpaRepository<Appointment, Long> {
    @Query("SELECT COUNT(DISTINCT a.member.memberID) FROM Appointment a WHERE a.coach.id = :coachId")
    int countDistinctMemberByCoachId(@Param("coachId") Long coachId);

    @Query("SELECT a FROM Appointment a WHERE a.coach.id = :coachId AND a.createAt >= CURRENT_TIMESTAMP ORDER BY a.createAt ASC")
    List<Appointment> findUpcomingByCoachId(@Param("coachId") Long coachId);

    @Query("SELECT a FROM Appointment a WHERE a.coach.id = :coachId AND a.appointmentDate BETWEEN :from AND :to ORDER BY a.appointmentDate ASC")
    List<Appointment> findByCoachIdAndDateRange(@Param("coachId") Long coachId, @Param("from") java.time.LocalDate from, @Param("to") java.time.LocalDate to);

    @Query("SELECT a FROM Appointment a WHERE a.appointmentDate BETWEEN :from AND :to ORDER BY a.appointmentDate ASC")
    List<Appointment> findAllByDateRange(@Param("from") java.time.LocalDate from, @Param("to") java.time.LocalDate to);

    @Query("SELECT COUNT(a) > 0 FROM Appointment a WHERE a.coach.id = :coachId AND a.slotId = :slotId AND a.appointmentDate = :date AND a.status IN ('WAIT', 'APPROVED', 'PENDING')")
    boolean existsByCoachAndSlotAndDate(@Param("coachId") Long coachId, @Param("slotId") Long slotId, @Param("date") java.time.LocalDate date);

    Optional<Appointment> findByGoogleCalendarEventId(String eventId);

    List<Appointment> findByMemberMemberIDAndGoogleCalendarEventIdIsNotNull(Long memberId);

    List<Appointment> findByAppointmentDateBetweenAndGoogleCalendarEventIdIsNotNull(LocalDate startDate, LocalDate endDate);

    List<Appointment> findByCoachIdAndGoogleCalendarEventIdIsNotNull(Long coachId);
}
