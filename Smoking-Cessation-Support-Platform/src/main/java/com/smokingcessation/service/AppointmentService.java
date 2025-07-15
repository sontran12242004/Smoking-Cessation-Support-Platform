package com.smokingcessation.service;

import com.smokingcessation.dto.AppointmentDTO;
import com.smokingcessation.dto.WorkScheduleRequestDTO;
import com.smokingcessation.entity.*;
import com.smokingcessation.enums.AppointmentEnum;
import com.smokingcessation.exception.exceptions.BadRequestException;
import com.smokingcessation.repository.AccountSlotRepository;
import com.smokingcessation.repository.AppointmentRepository;
import com.smokingcessation.repository.AuthenticationRepository;
import com.smokingcessation.repository.CoachRepository;
import com.smokingcessation.repository.MedicineServiceRepository;
import com.smokingcessation.repository.MembersRepository;
import com.smokingcessation.repository.SlotRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class AppointmentService {
    @Autowired
    AppointmentRepository appointmentRepository;

    @Autowired
    AccountSlotRepository accountSlotRepository;

    @Autowired
    AuthenticationRepository authenticationRepository;

    @Autowired
    CoachRepository coachRepository;

    @Autowired
    AuthenticationService authenticationService;

    @Autowired
    MedicineServiceRepository medicineServiceRepository;

    @Autowired
    MembersRepository membersRepository;

    @Autowired
    SlotRepository slotRepository;

    @Transactional
    public Appointment create(AppointmentDTO appointmentRequest) {
        // Validate input
        if (appointmentRequest.getCoachId() == null) {
            throw new BadRequestException("Coach ID is required");
        }
        if (appointmentRequest.getSlotId() == null) {
            throw new BadRequestException("Slot ID is required");
        }

        // Tìm coach theo ID
        Coach coach = coachRepository.findById(appointmentRequest.getCoachId())
                .orElseThrow(() -> new BadRequestException("Coach not found"));
        if (!coach.isCoachActive()) {
            throw new BadRequestException("Coach is not active");
        }
        // Tìm slot
        AccountSlot slot = accountSlotRepository.findAccountSlotBySlotIdAndAccountAndDate(
                appointmentRequest.getSlotId(),
                coach.getAccount(),
                appointmentRequest.getAppointmentDate()
        );

        // Kiểm tra slot có tồn tại không
        if (slot == null) {
            // Tự động tạo AccountSlot nếu không tồn tại
            Slot slotEntity = slotRepository.findById(appointmentRequest.getSlotId())
                    .orElseThrow(() -> new BadRequestException("Slot ID " + appointmentRequest.getSlotId() + " does not exist"));

            slot = new AccountSlot();
            slot.setSlot(slotEntity);
            slot.setAccount(coach.getAccount());
            slot.setDate(appointmentRequest.getAppointmentDate());
            slot.setAvailable(true);

            slot = accountSlotRepository.save(slot);
        }

        // Check xem slot do da dat hay chua
        if (!slot.isAvailable()) {
            throw new BadRequestException("Slot is not available");
        }
        // Lấy member account từ memberId trong request
        Account memberAccount = null;

        // Ưu tiên sử dụng current authenticated account nếu có
        Account currentAccount = authenticationService.getCurrentAccount();
        if (currentAccount != null) {
            memberAccount = currentAccount;
        } else if (appointmentRequest.getMemberId() != null && appointmentRequest.getMemberId() > 0) {
            // Nếu không có authentication, sử dụng memberId từ request
            Members member = membersRepository.findById(appointmentRequest.getMemberId())
                    .orElseThrow(() -> new BadRequestException("Member not found with ID: " + appointmentRequest.getMemberId()));
            memberAccount = member.getAccount();
        } else {
            throw new BadRequestException("Either authentication or memberId is required to create appointment");
        }

        // Tìm appointment có sẵn với status APPROVED
        Appointment existingAppointment = null;

        // Ưu tiên: Nếu có appointmentId trong request, tìm theo ID trực tiếp
        if (appointmentRequest.getAppointmentId() != null && appointmentRequest.getAppointmentId() > 0) {
            existingAppointment = appointmentRepository.findById(appointmentRequest.getAppointmentId())
                    .filter(appt -> appt.getStatus() == AppointmentEnum.APPROVED && appt.getMember() == null)
                    .orElse(null);
        } else {
            // Fallback: Tìm theo coach, date, slot (cách cũ)
            existingAppointment = appointmentRepository.findByCoachIdAndDateRange(coach.getId(),
                            appointmentRequest.getAppointmentDate(), appointmentRequest.getAppointmentDate())
                    .stream()
                    .filter(appt -> appt.getSlotId().equals(appointmentRequest.getSlotId())
                            && appt.getStatus() == AppointmentEnum.APPROVED
                            && appt.getMember() == null)
                    .findFirst()
                    .orElse(null);
        }

        if (existingAppointment != null) {
            // Update existing appointment - Member book slot
            existingAppointment.setStatus(AppointmentEnum.PENDING);
            existingAppointment.setAccount(memberAccount);
            if (memberAccount != null && memberAccount.getMember() != null) {
                existingAppointment.setMember(memberAccount.getMember());
            }
            // Set slot không còn available
            slot.setAvailable(false);
            return appointmentRepository.save(existingAppointment);
        } else {
            // Fallback: Tạo appointment mới (cho trường hợp legacy)
            Appointment appointment = new Appointment();
            appointment.setCreateAt(LocalDate.now());
            appointment.setStatus(AppointmentEnum.PENDING);
            appointment.setAccount(memberAccount);
            appointment.setCoach(coach);
            appointment.setSlotId(appointmentRequest.getSlotId());
            appointment.setAppointmentDate(appointmentRequest.getAppointmentDate());

            // Set member từ account (nếu account có member liên kết)
            if (memberAccount != null && memberAccount.getMember() != null) {
                appointment.setMember(memberAccount.getMember());
            }
            appointmentRepository.save(appointment);
            // Set slot do thanh da dat
            slot.setAvailable(false);
            return appointment;
        }
    }

    public List<AppointmentDTO> getUpcomingSessionsForCoach(Long coachId) {
        List<Appointment> appointments = appointmentRepository.findUpcomingByCoachId(coachId);
        List<AppointmentDTO> result = new ArrayList<>();
        for (Appointment appt : appointments) {
            AppointmentDTO dto = new AppointmentDTO();

            // Set tất cả các field cần thiết
            dto.setId(appt.getId());
            dto.setSlotId(appt.getSlotId());
            dto.setCoachId(appt.getCoach() != null ? appt.getCoach().getId() : null);
            dto.setAppointmentDate(appt.getAppointmentDate());
            dto.setCreateAt(appt.getCreateAt());
            dto.setStatus(appt.getStatus());

            // Set memberId
            if (appt.getMember() != null) {
                dto.setMemberId(appt.getMember().getMemberID());
            } else if (appt.getAccount() != null && appt.getAccount().getMember() != null) {
                dto.setMemberId(appt.getAccount().getMember().getMemberID());
            }

            // Safe null check cho member name
            String memberName = "Unknown";
            if (appt.getMember() != null && appt.getMember().getName() != null) {
                memberName = appt.getMember().getName();
            } else if (appt.getAccount() != null && appt.getAccount().getFullName() != null) {
                // Fallback: sử dụng fullName từ Account nếu member null
                memberName = appt.getAccount().getFullName();
            }
            dto.setMemberName(memberName);

            // Set servicesId nếu có
            if (appt.getMedicineServices() != null && !appt.getMedicineServices().isEmpty()) {
                List<Long> serviceIds = appt.getMedicineServices().stream()
                        .map(service -> service.id)
                        .toList();
                dto.setServicesId(serviceIds);
            }

            result.add(dto);
        }
        return result;
    }

    /**
     * Lấy lịch coach theo tuần (group by ngày) - chỉ hiển thị appointment đã được approve và chưa có member book
     */
    public Map<String, Object> getWeeklySchedule(LocalDate from, LocalDate to, Long coachId) {
        List<Appointment> appointments;
        if (coachId != null) {
            appointments = appointmentRepository.findByCoachIdAndDateRange(coachId, from, to)
                    .stream()
                    .filter(appt -> appt.getMember() == null && appt.getStatus() == AppointmentEnum.APPROVED)
                    .collect(Collectors.toList());
        } else {
            appointments = appointmentRepository.findAllByDateRange(from, to)
                    .stream()
                    .filter(appt -> appt.getMember() == null && appt.getStatus() == AppointmentEnum.APPROVED)
                    .collect(Collectors.toList());
        }
        // Group by ngày
        Map<LocalDate, List<Appointment>> grouped = appointments.stream()
                .collect(Collectors.groupingBy(Appointment::getAppointmentDate));
        // Build response
        List<Map<String, Object>> days = new ArrayList<>();
        for (LocalDate d = from; !d.isAfter(to); d = d.plusDays(1)) {
            List<Appointment> appts = grouped.getOrDefault(d, new ArrayList<>());
            List<Map<String, Object>> apptList = appts.stream().map(appt -> {
                Map<String, Object> m = new HashMap<>();
                m.put("id", appt.getId());
                m.put("coachName", appt.getCoach() != null ? appt.getCoach().getName() : null);
                m.put("status", appt.getStatus());
                m.put("time", appt.getSlotId()); // Có thể map sang label nếu cần
                m.put("canBook", appt.getStatus() == AppointmentEnum.APPROVED && appt.getMember() == null);
                return m;
            }).collect(Collectors.toList());
            Map<String, Object> day = new HashMap<>();
            day.put("date", d);
            day.put("appointments", apptList);
            days.add(day);
        }
        Map<String, Object> result = new HashMap<>();
        result.put("week", from + " to " + to);
        result.put("days", days);
        return result;
    }

    /**
     * Admin lấy danh sách lịch chờ approve từ Coach
     */
    public Map<String, Object> getPendingApprovalSchedules(LocalDate from, LocalDate to, Long coachId) {
        List<Appointment> appointments;
        if (coachId != null) {
            appointments = appointmentRepository.findByCoachIdAndDateRange(coachId, from, to)
                    .stream()
                    .filter(appt -> appt.getStatus() == AppointmentEnum.WAIT)
                    .collect(Collectors.toList());
        } else {
            appointments = appointmentRepository.findAllByDateRange(from, to)
                    .stream()
                    .filter(appt -> appt.getStatus() == AppointmentEnum.WAIT)
                    .collect(Collectors.toList());
        }
        // Group by ngày
        Map<LocalDate, List<Appointment>> grouped = appointments.stream()
                .collect(Collectors.groupingBy(Appointment::getAppointmentDate));
        // Build response
        List<Map<String, Object>> days = new ArrayList<>();
        for (LocalDate d = from; !d.isAfter(to); d = d.plusDays(1)) {
            List<Appointment> appts = grouped.getOrDefault(d, new ArrayList<>());
            List<Map<String, Object>> apptList = appts.stream().map(appt -> {
                Map<String, Object> m = new HashMap<>();
                m.put("id", appt.getId());
                m.put("coachId", appt.getCoach() != null ? appt.getCoach().getId() : null);
                m.put("coachName", appt.getCoach() != null ? appt.getCoach().getName() : null);
                m.put("status", appt.getStatus());
                m.put("time", appt.getSlotId()); // Có thể map sang label nếu cần
                m.put("canApprove", appt.getStatus() == AppointmentEnum.WAIT);
                m.put("canReject", appt.getStatus() == AppointmentEnum.WAIT);
                return m;
            }).collect(Collectors.toList());
            Map<String, Object> day = new HashMap<>();
            day.put("date", d);
            day.put("appointments", apptList);
            days.add(day);
        }
        Map<String, Object> result = new HashMap<>();
        result.put("week", from + " to " + to);
        result.put("days", days);
        return result;
    }

    /**
     * Admin approve lịch Coach đã đăng ký
     */
    public Appointment confirmAppointment(Long appointmentId) {
        Appointment appt = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new BadRequestException("Appointment not found"));

        if (appt.getStatus() == AppointmentEnum.WAIT) {
            // Admin approve lịch Coach → chuyển thành APPROVED
            appt.setStatus(AppointmentEnum.APPROVED);
        } else if (appt.getStatus() == AppointmentEnum.PENDING) {
            // Hoàn thành appointment Member đã book
            appt.setStatus(AppointmentEnum.COMPLETED);
        }

        return appointmentRepository.save(appt);
    }

    /**
     * Admin reject lịch Coach hoặc cancel appointment
     */
    public Appointment rejectAppointment(Long appointmentId) {
        Appointment appt = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new BadRequestException("Appointment not found"));

        if (appt.getStatus() == AppointmentEnum.WAIT) {
            // Admin reject lịch Coach
            appt.setStatus(AppointmentEnum.REJECTED);
        } else {
            // Cancel appointment
            appt.setStatus(AppointmentEnum.CANCEL);
        }

        return appointmentRepository.save(appt);
    }

    /**
     * Coach đăng ký lịch làm việc cho cả tuần (nhiều ngày, nhiều slot)
     */
    @Transactional
    public void registerWorkSchedule(WorkScheduleRequestDTO request) {
        Account currentAccount = authenticationService.getCurrentAccount();
        if (currentAccount == null || currentAccount.getCoach() == null) {
            throw new BadRequestException("Only coach can register work slot");
        }
        Coach coach = currentAccount.getCoach();

        LocalDate startDate = LocalDate.parse(request.getDate());
        for (String dayOfWeek : request.getDaysOfWeek()) {
            DayOfWeek dow = DayOfWeek.valueOf(dayOfWeek.toUpperCase());
            LocalDate targetDate = startDate.with(TemporalAdjusters.nextOrSame(dow));
            List<Slot> slots = slotRepository.findAll();
            for (Slot slot : slots) {
                AccountSlot accountSlot = accountSlotRepository.findAccountSlotBySlotIdAndAccountAndDate(
                        slot.getId(), coach.getAccount(), targetDate
                );
                if (accountSlot == null) {
                    accountSlot = new AccountSlot();
                    accountSlot.setSlot(slot);
                    accountSlot.setAccount(coach.getAccount());
                    accountSlot.setDate(targetDate);
                    accountSlot.setAvailable(true);
                    accountSlot = accountSlotRepository.save(accountSlot);
                }
                if (!accountSlot.isAvailable()) continue;

                // Kiểm tra xem Coach đã đăng ký slot này cho ngày này chưa
                if (appointmentRepository.existsByCoachAndSlotAndDate(coach.getId(), slot.getId(), targetDate)) {
                    continue; // Bỏ qua nếu đã đăng ký rồi
                }

                Appointment appointment = new Appointment();
                appointment.setCreateAt(LocalDate.now());
                appointment.setStatus(AppointmentEnum.WAIT); // Coach đăng ký, chờ Admin approve
                appointment.setCoach(coach);
                appointment.setSlotId(slot.getId());
                appointment.setAppointmentDate(targetDate);
                appointmentRepository.save(appointment);
            }
        }
    }

    /**
     * Member lấy danh sách lịch Coach đã được Admin approve để book
     */
    public Map<String, Object> getAvailableSchedulesForMembers(LocalDate from, LocalDate to, Long coachId) {
        List<Appointment> appointments;
        if (coachId != null) {
            appointments = appointmentRepository.findByCoachIdAndDateRange(coachId, from, to)
                    .stream()
                    .filter(appt -> appt.getStatus() == AppointmentEnum.APPROVED && appt.getMember() == null)
                    .collect(Collectors.toList());
        } else {
            appointments = appointmentRepository.findAllByDateRange(from, to)
                    .stream()
                    .filter(appt -> appt.getStatus() == AppointmentEnum.APPROVED && appt.getMember() == null)
                    .collect(Collectors.toList());
        }
        // Group by ngày
        Map<LocalDate, List<Appointment>> grouped = appointments.stream()
                .collect(Collectors.groupingBy(Appointment::getAppointmentDate));
        // Build response
        List<Map<String, Object>> days = new ArrayList<>();
        for (LocalDate d = from; !d.isAfter(to); d = d.plusDays(1)) {
            List<Appointment> appts = grouped.getOrDefault(d, new ArrayList<>());
            List<Map<String, Object>> apptList = appts.stream().map(appt -> {
                Map<String, Object> m = new HashMap<>();
                m.put("id", appt.getId());
                m.put("coachId", appt.getCoach() != null ? appt.getCoach().getId() : null);
                m.put("coachName", appt.getCoach() != null ? appt.getCoach().getName() : null);
                m.put("specialization", appt.getCoach() != null ? appt.getCoach().getSpecialization() : null);
                m.put("status", appt.getStatus());
                m.put("time", appt.getSlotId()); // Có thể map sang label nếu cần
                m.put("canBook", true); // Tất cả đều có thể book
                return m;
            }).collect(Collectors.toList());
            Map<String, Object> day = new HashMap<>();
            day.put("date", d);
            day.put("appointments", apptList);
            days.add(day);
        }
        Map<String, Object> result = new HashMap<>();
        result.put("week", from + " to " + to);
        result.put("days", days);
        return result;
    }

    /**
     * Coach lấy danh sách lịch đã được Member book
     */
    public Map<String, Object> getBookedAppointmentsForCoach(Long coachId, LocalDate from, LocalDate to) {
        List<Appointment> appointments = appointmentRepository.findByCoachIdAndDateRange(coachId, from, to)
                .stream()
                .filter(appt -> appt.getMember() != null &&
                        (appt.getStatus() == AppointmentEnum.PENDING || appt.getStatus() == AppointmentEnum.COMPLETED))
                .collect(Collectors.toList());

        // Group by ngày
        Map<LocalDate, List<Appointment>> grouped = appointments.stream()
                .collect(Collectors.groupingBy(Appointment::getAppointmentDate));
        // Build response
        List<Map<String, Object>> days = new ArrayList<>();
        for (LocalDate d = from; !d.isAfter(to); d = d.plusDays(1)) {
            List<Appointment> appts = grouped.getOrDefault(d, new ArrayList<>());
            List<Map<String, Object>> apptList = appts.stream().map(appt -> {
                Map<String, Object> m = new HashMap<>();
                m.put("id", appt.getId());
                m.put("memberId", appt.getMember() != null ? appt.getMember().getMemberID() : null);
                m.put("memberName", appt.getMember() != null ? appt.getMember().getName() : "Unknown");
                m.put("status", appt.getStatus());
                m.put("time", appt.getSlotId()); // Có thể map sang label nếu cần
                m.put("bookedAt", appt.getCreateAt());
                m.put("canComplete", appt.getStatus() == AppointmentEnum.PENDING);
                return m;
            }).collect(Collectors.toList());
            Map<String, Object> day = new HashMap<>();
            day.put("date", d);
            day.put("appointments", apptList);
            days.add(day);
        }
        Map<String, Object> result = new HashMap<>();
        result.put("week", from + " to " + to);
        result.put("days", days);
        return result;
    }

    /**
     * Coach xem lịch làm việc với thông tin slot status để frontend disable nút
     */
    public Map<String, Object> getCoachScheduleWithSlotStatus(LocalDate from, LocalDate to, Long coachId) {
        Account currentAccount = authenticationService.getCurrentAccount();
        if (currentAccount == null || currentAccount.getCoach() == null) {
            throw new BadRequestException("Only coach can access this schedule");
        }
        Coach coach = currentAccount.getCoach();

        // Lấy tất cả slot
        List<Slot> allSlots = slotRepository.findAll();

        // Lấy appointments của coach trong khoảng thời gian
        List<Appointment> coachAppointments = appointmentRepository.findByCoachIdAndDateRange(coach.getId(), from, to);

        // Group appointments by date and slot
        Map<String, Appointment> appointmentMap = coachAppointments.stream()
                .collect(Collectors.toMap(
                        appt -> appt.getAppointmentDate() + "_" + appt.getSlotId(),
                        appt -> appt,
                        (existing, replacement) -> existing // Giữ appointment đầu tiên nếu trùng
                ));

        // Build response
        List<Map<String, Object>> days = new ArrayList<>();
        for (LocalDate d = from; !d.isAfter(to); d = d.plusDays(1)) {
            final LocalDate currentDate = d; // Make final for lambda
            List<Map<String, Object>> slotList = allSlots.stream().map(slot -> {
                String key = currentDate + "_" + slot.getId();
                Appointment existingAppt = appointmentMap.get(key);

                Map<String, Object> slotInfo = new HashMap<>();
                slotInfo.put("slotId", slot.getId());
                slotInfo.put("slotName", slot.getLabel());
                slotInfo.put("startTime", slot.getStart());
                slotInfo.put("endTime", slot.getEnd());
                slotInfo.put("timeRange", slot.getStart() + " - " + slot.getEnd());

                if (existingAppt != null) {
                    // Coach đã đăng ký slot này
                    slotInfo.put("registered", true);
                    slotInfo.put("appointmentId", existingAppt.getId());
                    slotInfo.put("status", existingAppt.getStatus());
                    slotInfo.put("canRegister", false);

                    // Thông tin thêm dựa trên status
                    switch (existingAppt.getStatus()) {
                        case WAIT:
                            slotInfo.put("statusText", "Chờ Admin duyệt");
                            slotInfo.put("canCancel", true);
                            break;
                        case APPROVED:
                            slotInfo.put("statusText", "Đã được duyệt");
                            slotInfo.put("canCancel", false);
                            slotInfo.put("memberBooked", existingAppt.getMember() != null);
                            if (existingAppt.getMember() != null) {
                                slotInfo.put("memberName", existingAppt.getMember().getName());
                            }
                            break;
                        case PENDING:
                            slotInfo.put("statusText", "Member đã đặt lịch");
                            slotInfo.put("canCancel", false);
                            slotInfo.put("memberName", existingAppt.getMember() != null ? existingAppt.getMember().getName() : "Unknown");
                            break;
                        case REJECTED:
                            slotInfo.put("statusText", "Bị từ chối");
                            slotInfo.put("canRegister", true); // Có thể đăng ký lại
                            break;
                        case COMPLETED:
                            slotInfo.put("statusText", "Đã hoàn thành");
                            slotInfo.put("canRegister", true); // Có thể đăng ký lại
                            break;
                        case CANCEL:
                            slotInfo.put("statusText", "Đã hủy");
                            slotInfo.put("canRegister", true); // Có thể đăng ký lại
                            break;
                    }
                } else {
                    // Slot chưa được đăng ký
                    slotInfo.put("registered", false);
                    slotInfo.put("status", null);
                    slotInfo.put("canRegister", true);
                    slotInfo.put("statusText", "Có thể đăng ký");
                }

                return slotInfo;
            }).collect(Collectors.toList());

            Map<String, Object> day = new HashMap<>();
            day.put("date", d);
            day.put("dayOfWeek", d.getDayOfWeek().toString());
            day.put("slots", slotList);
            days.add(day);
        }

        Map<String, Object> result = new HashMap<>();
        result.put("week", from + " to " + to);
        result.put("coachId", coach.getId());
        result.put("coachName", coach.getName());
        result.put("days", days);
        return result;
    }

    /**
     * Coach hoàn thành appointment
     */
    @Transactional
    public Appointment completeAppointment(Long appointmentId) {
        if (appointmentId == null) {
            throw new BadRequestException("Appointment ID is required");
        }

        // Tìm appointment
        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new BadRequestException("Appointment not found"));

        // Kiểm tra quyền: chỉ coach của appointment mới được complete
        Account currentAccount = authenticationService.getCurrentAccount();
        if (currentAccount == null || currentAccount.getCoach() == null) {
            throw new BadRequestException("Only coach can complete appointment");
        }

        Coach currentCoach = currentAccount.getCoach();
        if (!appointment.getCoach().getId().equals(currentCoach.getId())) {
            throw new BadRequestException("You can only complete your own appointments");
        }

        // Kiểm tra status: chỉ có thể complete appointment đang PENDING
        if (appointment.getStatus() != AppointmentEnum.PENDING) {
            throw new BadRequestException("Only pending appointments can be completed. Current status: " + appointment.getStatus());
        }

        // Kiểm tra phải có member đã book
        if (appointment.getMember() == null) {
            throw new BadRequestException("Cannot complete appointment without member");
        }

        // Update status thành COMPLETED
        appointment.setStatus(AppointmentEnum.COMPLETED);

        // Lưu thay đổi
        return appointmentRepository.save(appointment);
    }

    /**
     * Coach hủy appointment
     */
    @Transactional
    public Appointment cancelAppointment(Long appointmentId) {
        if (appointmentId == null) {
            throw new BadRequestException("Appointment ID is required");
        }

        // Tìm appointment
        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new BadRequestException("Appointment not found"));

        // Kiểm tra quyền: chỉ coach của appointment mới được cancel
        Account currentAccount = authenticationService.getCurrentAccount();
        if (currentAccount == null || currentAccount.getCoach() == null) {
            throw new BadRequestException("Only coach can cancel appointment");
        }

        Coach currentCoach = currentAccount.getCoach();
        if (!appointment.getCoach().getId().equals(currentCoach.getId())) {
            throw new BadRequestException("You can only cancel your own appointments");
        }

        // Kiểm tra status: có thể cancel appointment ở các trạng thái WAIT, APPROVED, PENDING
        if (appointment.getStatus() == AppointmentEnum.COMPLETED) {
            throw new BadRequestException("Cannot cancel completed appointment");
        }
        if (appointment.getStatus() == AppointmentEnum.CANCEL) {
            throw new BadRequestException("Appointment is already cancelled");
        }
        if (appointment.getStatus() == AppointmentEnum.REJECTED) {
            throw new BadRequestException("Cannot cancel rejected appointment");
        }

        // Update status thành CANCEL
        appointment.setStatus(AppointmentEnum.CANCEL);

        // Nếu appointment có member đã book, cần giải phóng slot
        if (appointment.getMember() != null) {
            // Tìm và cập nhật AccountSlot thành available
            AccountSlot slot = accountSlotRepository.findAccountSlotBySlotIdAndAccountAndDate(
                    appointment.getSlotId(),
                    appointment.getCoach().getAccount(),
                    appointment.getAppointmentDate()
            );
            if (slot != null) {
                slot.setAvailable(true);
                accountSlotRepository.save(slot);
            }
        }

        // Lưu thay đổi
        return appointmentRepository.save(appointment);
    }

}