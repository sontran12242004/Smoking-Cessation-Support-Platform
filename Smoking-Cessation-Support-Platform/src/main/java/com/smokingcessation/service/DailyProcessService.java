package com.smokingcessation.service;

import com.smokingcessation.dto.DailyProcessDTO;
import com.smokingcessation.entity.CigaretteLog;
import com.smokingcessation.entity.DailyProcess;
import com.smokingcessation.entity.Members;
import com.smokingcessation.repository.CigaretteLogRepository;
import com.smokingcessation.repository.DailyProcessRepository;
import com.smokingcessation.repository.MembersRepository;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.HashMap;
import java.util.ArrayList;

@Service
public class DailyProcessService {

    // Constants để tránh duplicated code
    private static final int[] MILESTONE_DAYS = {1, 7, 28, 90, 180, 365, 730, 1825, 3650};
    private static final String[] MILESTONE_LABELS = {"24 giờ", "1 tuần", "1 tháng", "3 tháng", "6 tháng", "1 năm", "2 năm", "5 năm", "10 năm"};

    // Getter for DailyProcessRepository
    @Getter
    @Autowired
    private DailyProcessRepository dailyProcessRepository;
    
    @Autowired
    private MembersRepository membersRepository;
    
    @Autowired
    private CigaretteLogRepository cigaretteLogRepository;
    
    @Autowired
    private HealthMetricsService healthMetricsService;
    
    @Autowired
    private QuitPlansService quitPlansService;
    
    @Autowired
    private MembersService membersService;
    
    // Create or update daily process record and update health metrics
    @Transactional
    public DailyProcessDTO saveDailyProcess(DailyProcessDTO dailyProcessDTO) {
        // Validate memberId
        if (dailyProcessDTO.getMemberId() == null) {
            throw new RuntimeException("Member ID is required");
        }
        
        Optional<Members> memberOpt = membersRepository.findById(dailyProcessDTO.getMemberId());
        if (!memberOpt.isPresent()) {
            throw new RuntimeException("Member not found");
        }
        
        Members member = memberOpt.get();
        
        // Check if there's already a record for today
        Optional<DailyProcess> existingProcess = 
            dailyProcessRepository.findByMember_MemberIDAndDate(member.getMemberID(), dailyProcessDTO.getDate());
        
        DailyProcess dailyProcess;
        boolean isFirstEntry = false;
        
        if (existingProcess.isPresent()) {
            // Update existing record
            dailyProcess = existingProcess.get();
        } else {
            // Create new record
            dailyProcess = new DailyProcess();
            dailyProcess.setMember(member);
            dailyProcess.setDate(dailyProcessDTO.getDate());
            isFirstEntry = true;
        }
        
        // Không còn tính moneySaved dựa trên cigarettesNotSmoked nữa
        dailyProcess.setCigaretteStrength(dailyProcessDTO.getCigaretteStrength());
        dailyProcess.setCigarettesSmokedToday(dailyProcessDTO.getCigarettesSmokedToday());
        dailyProcess.setMoneySaved(dailyProcessDTO.getMoneySaved()); // Nếu cần tính lại thì FE gửi lên hoặc tính lại theo logic mới
        dailyProcess.setCravingIntensity(dailyProcessDTO.getCravingIntensity());
        dailyProcess.setMood(dailyProcessDTO.getMood());
        dailyProcess.setNotes(dailyProcessDTO.getNotes());
        
        dailyProcess = dailyProcessRepository.save(dailyProcess);
        
        // Save cigarette log for today (số điếu thuốc đã hút hôm nay)
        saveCigaretteLog(member, dailyProcessDTO.getDate().toLocalDate(), dailyProcessDTO.getCigarettesSmokedToday());
        
        // Update health metrics
        try {
            healthMetricsService.getOrCreateTodayMetrics(member);
        } catch (Exception e) {
            // Log error but don't fail the process
            System.err.println("Error updating health metrics: " + e.getMessage());
        }
        
        // Convert back to DTO
        dailyProcessDTO.setProcessId(dailyProcess.getProcessId());
        dailyProcessDTO.setMoneySaved(dailyProcess.getMoneySaved());
        
        return dailyProcessDTO;
    }
    
    // Save cigarette log for the day
    private void saveCigaretteLog(Members member, LocalDate date, int cigarettesSmoked) {
        Optional<CigaretteLog> existingLog = cigaretteLogRepository.findByUserAndLogDate(member, date);
        
        CigaretteLog log;
        if (existingLog.isPresent()) {
            log = existingLog.get();
        } else {
            log = new CigaretteLog();
            log.setUser(member);
            log.setLogDate(date);
        }
        
        log.setCigarettesSmoked(cigarettesSmoked);
        cigaretteLogRepository.save(log);
    }
    
    // Get all daily processes for a member
    public List<DailyProcessDTO> getAllProcessesForMember(Long memberId) {
        List<DailyProcess> processes = dailyProcessRepository.findByMember_MemberID(memberId);
        
        return processes.stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }
    
    // Get daily process for a specific date
    public Optional<DailyProcessDTO> getProcessForDate(Long memberId, LocalDateTime date) {
        Optional<DailyProcess> processOpt = 
            dailyProcessRepository.findByMember_MemberIDAndDate(memberId, date);
        
        return processOpt.map(this::convertToDTO);
    }
    
    // Get daily processes within a date range
    public List<DailyProcessDTO> getProcessesForDateRange(Long memberId, LocalDateTime startDate, LocalDateTime endDate) {
        List<DailyProcess> processes = 
            dailyProcessRepository.findByMember_MemberIDAndDateBetween(memberId, startDate, endDate);
        
        return processes.stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }
    
    // Delete a daily process record
    public void deleteDailyProcess(Long processId) {
        dailyProcessRepository.deleteById(processId);
    }
    
    // Helper method to convert Entity to DTO
    private DailyProcessDTO convertToDTO(DailyProcess dailyProcess) {
        DailyProcessDTO dto = new DailyProcessDTO();
        dto.setProcessId(dailyProcess.getProcessId());
        dto.setMemberId(dailyProcess.getMember().getMemberID());
        dto.setDate(dailyProcess.getDate());
        dto.setCigaretteStrength(dailyProcess.getCigaretteStrength());
        dto.setCigarettesSmokedToday(dailyProcess.getCigarettesSmokedToday());
        dto.setMoneySaved(dailyProcess.getMoneySaved());
        dto.setCravingIntensity(dailyProcess.getCravingIntensity());
        dto.setMood(dailyProcess.getMood());
        dto.setNotes(dailyProcess.getNotes());
        return dto;
    }
    
    // Get member by ID
    public Members getMemberById(Long memberId) {
        return membersRepository.findById(memberId).orElse(null);
    }
    
    /**
     * Helper method để tìm milestone hiện tại
     */
    private String getCurrentMilestoneLabel(int daysSmokeFree) {
        String currentMilestoneLabel = "Bắt đầu hành trình";
        for (int i = 0; i < MILESTONE_DAYS.length; i++) {
            if (daysSmokeFree >= MILESTONE_DAYS[i]) {
                currentMilestoneLabel = MILESTONE_LABELS[i];
            } else {
                break;
            }
        }
        return currentMilestoneLabel;
    }
    
    /**
     * Helper method để tính toán milestone info
     */
    private Map<String, Object> calculateMilestoneInfo(int daysSmokeFree) {
        String currentMilestone = "Bắt đầu hành trình";
        String nextMilestone = "24 giờ";
        int daysToNext = 1;
        boolean isCompleted = false;
        
        // Tìm milestone hiện tại và tiếp theo
        for (int i = 0; i < MILESTONE_DAYS.length; i++) {
            if (daysSmokeFree >= MILESTONE_DAYS[i]) {
                currentMilestone = MILESTONE_LABELS[i];
                
                // Kiểm tra xem có phải milestone cuối cùng không
                if (i == MILESTONE_DAYS.length - 1) {
                    isCompleted = true;
                    nextMilestone = "Hoàn thành tất cả mốc";
                    daysToNext = 0;
                } else {
                    // Tìm milestone tiếp theo
                    nextMilestone = MILESTONE_LABELS[i + 1];
                    daysToNext = MILESTONE_DAYS[i + 1] - daysSmokeFree;
                }
            } else {
                // Chưa đạt milestone này
                nextMilestone = MILESTONE_LABELS[i];
                daysToNext = MILESTONE_DAYS[i] - daysSmokeFree;
                break;
            }
        }
        
        Map<String, Object> milestoneInfo = new HashMap<>();
        milestoneInfo.put("currentMilestone", currentMilestone);
        milestoneInfo.put("nextMilestone", nextMilestone);
        milestoneInfo.put("daysToNext", daysToNext);
        milestoneInfo.put("isCompleted", isCompleted);
        
        return milestoneInfo;
    }

    /**
     * Lấy thông tin tổng quan về tiến độ cai thuốc của member
     */
    public Map<String, Object> getProgressOverview(Long memberId) {
        Members member = getMemberById(memberId);
        if (member == null) {
            throw new RuntimeException("Member not found");
        }
        
        int daysSmokeFree = getDaysSmokeFree(memberId);
        int totalMoneySaved = daysSmokeFree * member.getDailyCost();
        
        // Tính % thành công (giả sử mục tiêu là 365 ngày)
        double percentSuccess = Math.min(100.0, (daysSmokeFree / 365.0) * 100.0);
        
        // Lấy milestone hiện tại và tiếp theo
        Map<String, Object> milestoneInfo = getCurrentMilestone(daysSmokeFree);
        
        Map<String, Object> progressOverview = new HashMap<>();
        progressOverview.put("memberId", memberId);
        progressOverview.put("daysSmokeFree", daysSmokeFree);
        progressOverview.put("totalMoneySaved", totalMoneySaved);
        progressOverview.put("percentSuccess", percentSuccess);
        progressOverview.put("currentMilestone", milestoneInfo.get("currentMilestone"));
        progressOverview.put("nextMilestone", milestoneInfo.get("nextMilestone"));
        progressOverview.put("daysToNextMilestone", milestoneInfo.get("daysToNext"));
        
        return progressOverview;
    }
    
    /**
     * Lấy thông tin chi tiết về milestone progress
     */
    public Map<String, Object> getMilestoneProgress(Long memberId) {
        Members member = getMemberById(memberId);
        if (member == null) {
            throw new RuntimeException("Member not found");
        }
        int daysSmokeFree = getDaysSmokeFree(memberId);
        // Lấy danh sách ngày DailyProcess đã sort tăng dần
        List<LocalDate> processDates = dailyProcessRepository.findByMember_MemberIDOrderByDateAsc(memberId)
            .stream().map(p -> p.getDate().toLocalDate()).collect(Collectors.toList());
        List<Map<String, Object>> milestones = getMilestonesForFE(daysSmokeFree, processDates);
        Map<String, Object> result = new HashMap<>();
        result.put("milestones", milestones);
        return result;
    }
    
    /**
     * Tính toán milestone hiện tại và tiếp theo
     */
    private Map<String, Object> getCurrentMilestone(int daysSmokeFree) {
        Map<String, Object> milestoneInfo = calculateMilestoneInfo(daysSmokeFree);
        // Chỉ trả về 3 field cần thiết cho getProgressOverview
        Map<String, Object> result = new HashMap<>();
        result.put("currentMilestone", milestoneInfo.get("currentMilestone"));
        result.put("nextMilestone", milestoneInfo.get("nextMilestone"));
        result.put("daysToNext", milestoneInfo.get("daysToNext"));
        return result;
    }
    
    /**
     * Lấy danh sách milestones chuẩn cho FE
     */
    private List<Map<String, Object>> getMilestonesForFE(int daysSmokeFree, List<LocalDate> processDates) {
        List<Map<String, Object>> milestones = new ArrayList<>();
        
        // Tìm milestone hiện tại đang theo đuổi
        String currentMilestoneLabel = getCurrentMilestoneLabel(daysSmokeFree);
        
        for (int i = 0; i < MILESTONE_DAYS.length; i++) {
            Map<String, Object> milestone = new HashMap<>();
            milestone.put("label", MILESTONE_LABELS[i]);
            milestone.put("daysRequired", MILESTONE_DAYS[i]);
            milestone.put("isAchieved", daysSmokeFree >= MILESTONE_DAYS[i]);
            milestone.put("isCurrent", MILESTONE_LABELS[i].equals(currentMilestoneLabel));
            
            if (daysSmokeFree >= MILESTONE_DAYS[i]) {
                milestone.put("daysCompleted", MILESTONE_DAYS[i]);
                milestone.put("daysRemaining", 0);
                milestone.put("completedAt", processDates.size() >= MILESTONE_DAYS[i] ? processDates.get(MILESTONE_DAYS[i] - 1) : null);
            } else {
                milestone.put("daysCompleted", daysSmokeFree);
                milestone.put("daysRemaining", MILESTONE_DAYS[i] - daysSmokeFree);
                milestone.put("completedAt", null);
            }
            
            milestones.add(milestone);
        }
        
        return milestones;
    }
    
    /**
     * Đếm số ngày smoke-free hiện tại
     */
    public int getDaysSmokeFree(Long memberId) {
        return (int) dailyProcessRepository.countByMember_MemberID(memberId);
    }
    
    /**
     * Lấy thông tin milestone hiện tại và tiếp theo
     */
    public Map<String, Object> getMilestoneInfo(Long memberId) {
        int daysSmokeFree = getDaysSmokeFree(memberId);
        Map<String, Object> milestoneInfo = calculateMilestoneInfo(daysSmokeFree);
        milestoneInfo.put("daysSmokeFree", daysSmokeFree);
        return milestoneInfo;
    }
    
    /**
     * Kiểm tra xem có đạt được milestone mới không
     */
    public boolean hasReachedNewMilestone(Long memberId) {
        int daysSmokeFree = getDaysSmokeFree(memberId);
        
        for (int milestone : MILESTONE_DAYS) {
            if (daysSmokeFree == milestone) {
                return true;
            }
        }
        
        return false;
    }
    
    /**
     * Lấy danh sách tất cả milestones với trạng thái
     */
    public List<Map<String, Object>> getAllMilestones(Long memberId) {
        int daysSmokeFree = getDaysSmokeFree(memberId);
        
        // Lấy danh sách ngày DailyProcess đã sort tăng dần
        List<LocalDate> processDates = dailyProcessRepository.findByMember_MemberIDOrderByDateAsc(memberId)
            .stream().map(p -> p.getDate().toLocalDate()).collect(Collectors.toList());
        
        // Tái sử dụng logic từ getMilestonesForFE
        return getMilestonesForFE(daysSmokeFree, processDates);
    }

    /**
     * Method tổng hợp tất cả thông tin milestone và progress
     * Trả về đầy đủ thông tin trong một lần gọi
     */
    public Map<String, Object> getAllMilestoneAndProgressInfo(Long memberId) {
        Members member = membersService.getMemberById(memberId);
        if (member == null) return null;
        int daysSmokeFree = getDaysSmokeFree(memberId);
        // Lấy thông tin cơ bản
        Map<String, Object> basicInfo = new HashMap<>();
        basicInfo.put("username", member.getName());
        basicInfo.put("quitDate", member.getQuitDate() != null ? member.getQuitDate().toString() : null);
        basicInfo.put("daysSmokeFree", daysSmokeFree);
        // Lấy thông tin milestone
        Map<String, Object> milestoneInfo = getMilestoneInfo(memberId);
        // Lấy milestone progress (danh sách milestones)
        Map<String, Object> milestoneProgress = getMilestoneProgress(memberId);
        // Kiểm tra milestone mới
        boolean hasNewMilestone = hasReachedNewMilestone(memberId);
        // Tổng hợp tất cả thông tin (bỏ percentSuccess, daysToNextMilestone, totalMoneySaved)
        Map<String, Object> result = new HashMap<>();
        result.putAll(basicInfo);
        result.putAll(milestoneInfo);
        result.put("milestones", milestoneProgress.get("milestones"));
        result.put("hasNewMilestone", hasNewMilestone);
        
        return result;
    }
}
