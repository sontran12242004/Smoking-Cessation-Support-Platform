package com.smokingcessation.service;


import com.smokingcessation.entity.DailyProcess;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import com.smokingcessation.dto.HealthMetricsDTO;
import com.smokingcessation.entity.HealthMetrics;
import com.smokingcessation.entity.Members;
import com.smokingcessation.repository.HealthMetricsRepository;
import com.smokingcessation.repository.MembersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import com.smokingcessation.repository.DailyProcessRepository;
import org.springframework.transaction.annotation.Transactional;

@Service
public class HealthMetricsService {

    @Autowired
    private HealthMetricsRepository healthMetricsRepository;

    @Autowired
    private DailyProcessRepository dailyProcessRepository;

    @Autowired
    private MembersRepository membersRepository;

    /**
     * Tính số ngày không hút thuốc dựa trên số lượng DailyProcess records
     * Mỗi DailyProcess record đại diện cho 1 ngày smoke-free
     */
    public int getDaysSmokeFree(Members user) {
        return (int) dailyProcessRepository.countByMember_MemberID(user.getMemberID());
    }

    /**
     * Tính tổng số tiền tiết kiệm được từ ngày bắt đầu đến hiện tại
     * Dựa trên priceSmoked từ DailyProcess records
     */
    public int getMoneySaved(Long memberId) {
        Members member = membersRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("Member not found"));
        // Số ngày đã cai (dùng getDaysSmokeFree)
        int daysSmokeFree = getDaysSmokeFree(member);
        // Giá 1 điếu thuốc (có thể lấy từ cấu hình hoặc truyền vào)
        int pricePerCigarette = 500; // ví dụ
        // Số tiền tiết kiệm được tăng dần mỗi ngày
        int moneySaved =  pricePerCigarette * daysSmokeFree;
        return moneySaved;
    }
    /**
     * Lấy tổng số điếu thuốc đã hút từ DailyProcess records
     */
    public int getTotalCigarettesSmoked(Members user) {
        List<DailyProcess> dailyProcesses = dailyProcessRepository.findByMember_MemberID(user.getMemberID());
        return dailyProcesses.stream()
                .mapToInt(process -> process.getCigarettesSmokedToday())
                .sum();
    }

    /**
     * Helper method để tính tổng cigaretteStrength và cigarettesSmokedToday từ DailyProcess
     */
    private Map<String, Object> calculateDailyProcessTotals(Long memberId) {
        List<DailyProcess> dailyProcesses = dailyProcessRepository.findByMember_MemberID(memberId);

        double totalStrength = dailyProcesses.stream()
                .mapToDouble(process -> process.getCigaretteStrength() != null ? process.getCigaretteStrength() : 0)
                .sum();

        int totalCigarettesSmoked = dailyProcesses.stream()
                .mapToInt(process -> process.getCigarettesSmokedToday())
                .sum();
        Map<String, Object> result = new HashMap<>();
        result.put("totalStrength", totalStrength);
        result.put("totalCigarettesSmoked", totalCigarettesSmoked);
        return result;
    }

    /**
     * Tính % cải thiện sức khỏe tổng thể
     * Dựa trên cigaretteStrength và cigarettesSmokedToday từ DailyProcess
     */
    public double getHealthImprovedPercent(Members user) {
        int days = getDaysSmokeFree(user);
        Map<String, Object> totals = calculateDailyProcessTotals(user.getMemberID());

        double totalStrength = (Double) totals.get("totalStrength");
        int totalCigarettesSmoked = (Integer) totals.get("totalCigarettesSmoked");

        // Công thức mới: 100% + (số ngày * 2%) - (tổng strength * 0.5%) - (tổng điếu * 1%)
        double percent = 100.0 + (days * 2.0) - (totalStrength * 0.5) - (totalCigarettesSmoked * 1.0);
        return Math.max(0, Math.min(100, percent));
    }

    /**
     * Tính % giảm nguy cơ đau tim
     * Dựa trên cigaretteStrength và cigarettesSmokedToday từ DailyProcess
     */
    public double getHeartAttackRisk(Members user) {
        int days = getDaysSmokeFree(user);
        Map<String, Object> totals = calculateDailyProcessTotals(user.getMemberID());

        double totalStrength = (Double) totals.get("totalStrength");
        int totalCigarettesSmoked = (Integer) totals.get("totalCigarettesSmoked");

        // Công thức mới: 100% - (số ngày * 1.2%) - (tổng strength * 0.3%) - (tổng điếu * 0.8%)
        double percent = 100.0 - (days * 1.2) - (totalStrength * 0.3) - (totalCigarettesSmoked * 0.8);
        return Math.max(0, Math.min(100, percent));
    }

    /**
     * Tính % giảm nguy cơ ung thư phổi
     * Dựa trên cigaretteStrength và cigarettesSmokedToday từ DailyProcess
     */
    public double getLungCancerRisk(Members user) {
        int days = getDaysSmokeFree(user);
        Map<String, Object> totals = calculateDailyProcessTotals(user.getMemberID());

        double totalStrength = (Double) totals.get("totalStrength");
        int totalCigarettesSmoked = (Integer) totals.get("totalCigarettesSmoked");

        // Công thức mới: 100% - (số ngày * 1.1%) - (tổng strength * 0.4%) - (tổng điếu * 0.7%)
        double percent = 100.0 - (days * 1.1) - (totalStrength * 0.4) - (totalCigarettesSmoked * 0.7);
        return Math.max(0, Math.min(100, percent));
    }

    /**
     * Tính % giảm nguy cơ bệnh tim
     * Dựa trên cigaretteStrength và cigarettesSmokedToday từ DailyProcess
     */
    public double getHeartDiseaseRisk(Members user) {
        int days = getDaysSmokeFree(user);
        Map<String, Object> totals = calculateDailyProcessTotals(user.getMemberID());

        double totalStrength = (Double) totals.get("totalStrength");
        int totalCigarettesSmoked = (Integer) totals.get("totalCigarettesSmoked");

        // Công thức mới: 100% - (số ngày * 1.9%) - (tổng strength * 0.2%) - (tổng điếu * 0.5%), tối đa giảm 27%
        double percent = 100.0 - Math.min(27, (days * 1.9) + (totalStrength * 0.2) + (totalCigarettesSmoked * 0.5));
        return Math.max(0, Math.min(100, percent));
    }

    /**
     * Tính % cải thiện hệ miễn dịch
     * Dựa trên cigaretteStrength và cigarettesSmokedToday từ DailyProcess
     */
    public double getImmuneFunction(Members user) {
        int days = getDaysSmokeFree(user);
        Map<String, Object> totals = calculateDailyProcessTotals(user.getMemberID());

        double totalStrength = (Double) totals.get("totalStrength");
        int totalCigarettesSmoked = (Integer) totals.get("totalCigarettesSmoked");

        // Công thức mới: (số ngày * 1.6%) - (tổng strength * 0.1%) - (tổng điếu * 0.2%), tối đa 22%
        double percent = Math.min(22, (days * 1.6) - (totalStrength * 0.1) - (totalCigarettesSmoked * 0.2));
        return Math.max(0, Math.min(100, percent));
    }

    /**
     * Tính % trắng răng
     * Dựa trên cigaretteStrength và cigarettesSmokedToday từ DailyProcess
     */
    public double getTeethWhitening(Members user) {
        int days = getDaysSmokeFree(user);
        Map<String, Object> totals = calculateDailyProcessTotals(user.getMemberID());

        double totalStrength = (Double) totals.get("totalStrength");
        int totalCigarettesSmoked = (Integer) totals.get("totalCigarettesSmoked");

        // Công thức mới: (số ngày * 1.3%) - (tổng strength * 0.08%) - (tổng điếu * 0.15%), tối đa 19%
        double percent = Math.min(19, (days * 1.3) - (totalStrength * 0.08) - (totalCigarettesSmoked * 0.15));
        return Math.max(0, Math.min(100, percent));
    }

    /**
     * Tính % cải thiện hơi thở thơm mát
     * Dựa trên cigaretteStrength và cigarettesSmokedToday từ DailyProcess
     */
    public double getBreathFreshness(Members user) {
        int days = getDaysSmokeFree(user);
        Map<String, Object> totals = calculateDailyProcessTotals(user.getMemberID());

        double totalStrength = (Double) totals.get("totalStrength");
        int totalCigarettesSmoked = (Integer) totals.get("totalCigarettesSmoked");

        // Công thức mới: (số ngày * 2.75%) - (tổng strength * 0.15%) - (tổng điếu * 0.3%), tối đa 38.5%
        double percent = Math.min(38.5, (days * 2.75) - (totalStrength * 0.15) - (totalCigarettesSmoked * 0.3));
        return Math.max(0, Math.min(100, percent));
    }

    /**
     * Tính % cải thiện vị giác/khứu giác
     * Dựa trên cigaretteStrength và cigarettesSmokedToday từ DailyProcess
     */
    public double getTasteAndSmell(Members user) {
        int days = getDaysSmokeFree(user);
        Map<String, Object> totals = calculateDailyProcessTotals(user.getMemberID());

        double totalStrength = (Double) totals.get("totalStrength");
        int totalCigarettesSmoked = (Integer) totals.get("totalCigarettesSmoked");

        // Công thức mới: (số ngày * 3.2%) - (tổng strength * 0.2%) - (tổng điếu * 0.4%), tối đa 45%
        double percent = Math.min(45, (days * 3.2) - (totalStrength * 0.2) - (totalCigarettesSmoked * 0.4));
        return Math.max(0, Math.min(100, percent));
    }

    /**
     * Tính % giảm CO trong máu
     * Dựa trên cigaretteStrength và cigarettesSmokedToday từ DailyProcess
     */
    public double getCOLvls(Members user) {
        int days = getDaysSmokeFree(user);
        Map<String, Object> totals = calculateDailyProcessTotals(user.getMemberID());

        double totalStrength = (Double) totals.get("totalStrength");
        int totalCigarettesSmoked = (Integer) totals.get("totalCigarettesSmoked");

        // Công thức mới: (số ngày * 5.9%) - (tổng strength * 0.3%) - (tổng điếu * 0.6%), tối đa 83%
        double percent = Math.min(83, (days * 5.9) - (totalStrength * 0.3) - (totalCigarettesSmoked * 0.6));
        return Math.max(0, Math.min(100, percent));
    }

    /**
     * Tính % tăng lượng Oxy trong máu
     * Dựa trên cigaretteStrength và cigarettesSmokedToday từ DailyProcess
     */
    public double getOxygenLvls(Members user) {
        int days = getDaysSmokeFree(user);
        Map<String, Object> totals = calculateDailyProcessTotals(user.getMemberID());

        double totalStrength = (Double) totals.get("totalStrength");
        int totalCigarettesSmoked = (Integer) totals.get("totalCigarettesSmoked");

        // Công thức mới: (số ngày * 0.85%) - (tổng strength * 0.05%) - (tổng điếu * 0.1%), tối đa 12%
        double percent = Math.min(12, (days * 0.85) - (totalStrength * 0.05) - (totalCigarettesSmoked * 0.1));
        return Math.max(0, Math.min(100, percent));
    }

    /**
     * Lấy hoặc tạo mới chỉ số sức khỏe cho user trong ngày
     */
    @Transactional(rollbackFor = Exception.class)
    public HealthMetricsDTO getOrCreateTodayMetrics(Members user) {
        LocalDate today = LocalDate.now();
        Optional<HealthMetrics> existing = healthMetricsRepository.findByUserAndDate(user, today);
        if (existing.isPresent()) {
            return convertToDTO(existing.get());
        }
        try {
            HealthMetrics metrics = new HealthMetrics(
                    null,
                    user,
                    getDaysSmokeFree(user),
                    getMoneySaved(user.getMemberID()),
                    getHealthImprovedPercent(user),
                    getHeartAttackRisk(user),
                    getLungCancerRisk(user),
                    getHeartDiseaseRisk(user),
                    getImmuneFunction(user),
                    getTeethWhitening(user),
                    getBreathFreshness(user),
                    getTasteAndSmell(user),
                    getCOLvls(user),
                    getOxygenLvls(user),
                    LocalDateTime.now()
            );
            HealthMetrics savedMetrics = healthMetricsRepository.save(metrics);
            return convertToDTO(savedMetrics);
        } catch (Exception e) {
            throw new RuntimeException("Lưu chỉ số sức khỏe thất bại: " + e.getMessage());
        }
    }

    /**
     * Convert Entity to DTO
     */
    private HealthMetricsDTO convertToDTO(HealthMetrics metrics) {
        HealthMetricsDTO dto = new HealthMetricsDTO();
        dto.setId(metrics.getId());
        dto.setUserId(metrics.getUser().getMemberID());
        dto.setDaysSmokeFree(metrics.getDaysSmokeFree());
        dto.setMoneySaved(metrics.getMoneySaved());
        dto.setHealthImprovedPercent(metrics.getHealthImprovedPercent());
        dto.setHeartAttackRisk(metrics.getHeartAttackRisk());
        dto.setLungCancerRisk(metrics.getLungCancerRisk());
        dto.setHeartDiseaseRisk(metrics.getHeartDiseaseRisk());
        dto.setImmuneFunction(metrics.getImmuneFunction());
        dto.setTeethWhitening(metrics.getTeethWhitening());
        dto.setBreathFreshness(metrics.getBreathFreshness());
        dto.setTasteAndSmell(metrics.getTasteAndSmell());
        dto.setCoLevels(metrics.getCoLevels());
        dto.setOxygenLevels(metrics.getOxygenLevels());
        dto.setCreatedAt(metrics.getCreatedAt());
        return dto;
    }
}
