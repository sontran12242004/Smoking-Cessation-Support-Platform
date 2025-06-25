package com.smokingcessation.service;

import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import com.smokingcessation.dto.HealthMetricsDTO;
import com.smokingcessation.entity.Members;
import com.smokingcessation.repository.HealthMetricsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import java.time.LocalDateTime;
import java.util.Optional;
import com.smokingcessation.entity.CigaretteLog;
import com.smokingcessation.repository.CigaretteLogRepository;
import org.springframework.transaction.annotation.Transactional;

@Service
public class HealthMetricsService {

    @Autowired
    private HealthMetricsRepository healthMetricsRepository;

    @Autowired
    private CigaretteLogRepository cigaretteLogRepository;

    /**
     * Tính số ngày không hút thuốc kể từ quitDate đến hiện tại
     */
    public int getDaysSmokeFree(Members user) {
        LocalDate quitDate = user.getQuitDate();
        if (quitDate == null) return 0;
        return (int) ChronoUnit.DAYS.between(quitDate, LocalDate.now());
    }

    /**
     * Tính tổng số tiền tiết kiệm được từ ngày bắt đầu đến hiện tại
     * Cộng dồn liên tục dựa trên dailyCost và số ngày
     */
    public int getMoneySaved(Members user) {
        LocalDate quitDate = user.getQuitDate();
        if (quitDate == null) return 0;
        
        int days = getDaysSmokeFree(user);
        return days * user.getDailyCost();
    }

    /**
     * Lấy tổng số điếu thuốc đã hút từ quitDate đến hiện tại
     */
    public int getTotalCigarettesSmoked(Members user) {
        LocalDate quitDate = user.getQuitDate();
        if (quitDate == null) return 0;
        
        // Sử dụng query tối ưu thay vì loop
        return cigaretteLogRepository.sumCigarettesByUserAndDateRange(user, quitDate, LocalDate.now());
    }

    /**
     * Kiểm tra dữ liệu đầu vào của user
     */
    private void validateUserData(Members user) {
        if (user.getQuitDate() == null) {
            throw new IllegalArgumentException("Người dùng chưa bắt đầu theo dõi sức khỏe");
        }
        if (user.getDailyCost() < 0) {
            throw new IllegalArgumentException("Số tiền hút thuốc mỗi ngày không hợp lệ");
        }
    }

    /**
     * Tính % cải thiện sức khỏe tổng thể
     * Dựa trên số ngày và số điếu thuốc hút
     */
    public double getHealthImprovedPercent(Members user) {
        int days = getDaysSmokeFree(user);
        int cigarettes = getTotalCigarettesSmoked(user);
        
        // Công thức: 100% + (số ngày * 2%) - (số điếu thuốc * 1%)
        double percent = 100.0 + (days * 2.0) - (cigarettes * 1.0);
        return Math.max(0, Math.min(100, percent));
    }

    /**
     * Tính % giảm nguy cơ đau tim
     * Dựa trên số ngày và số điếu thuốc hút
     */
    public double getHeartAttackRisk(Members user) {
        int days = getDaysSmokeFree(user);
        int cigarettes = getTotalCigarettesSmoked(user);
        
        // Công thức: 100% - (số ngày * 1.2%) - (số điếu thuốc * 0.8%)
        double percent = 100.0 - (days * 1.2) - (cigarettes * 0.8);
        return Math.max(0, Math.min(100, percent));
    }

    /**
     * Tính % giảm nguy cơ ung thư phổi
     * Dựa trên số ngày và số điếu thuốc hút
     */
    public double getLungCancerRisk(Members user) {
        int days = getDaysSmokeFree(user);
        int cigarettes = getTotalCigarettesSmoked(user);
        
        // Công thức: 100% - (số ngày * 1.1%) - (số điếu thuốc * 0.7%)
        double percent = 100.0 - (days * 1.1) - (cigarettes * 0.7);
        return Math.max(0, Math.min(100, percent));
    }

    /**
     * Tính % giảm nguy cơ bệnh tim
     * Dựa trên số ngày
     */
    public double getHeartDiseaseRisk(Members user) {
        int days = getDaysSmokeFree(user);
        // Công thức: 100% - (số ngày * 1.9%), tối đa giảm 27%
        double percent = 100.0 - Math.min(27, days * 1.9);
        return Math.max(0, Math.min(100, percent));
    }

    /**
     * Tính % cải thiện hệ miễn dịch
     * Dựa trên số ngày
     */
    public double getImmuneFunction(Members user) {
        int days = getDaysSmokeFree(user);
        // Công thức: số ngày * 1.6%, tối đa 22%
        double percent = Math.min(22, days * 1.6);
        return Math.max(0, Math.min(100, percent));
    }

    /**
     * Tính % trắng răng
     * Dựa trên số ngày
     */
    public double getTeethWhitening(Members user) {
        int days = getDaysSmokeFree(user);
        // Công thức: số ngày * 1.3%, tối đa 19%
        double percent = Math.min(19, days * 1.3);
        return Math.max(0, Math.min(100, percent));
    }

    /**
     * Tính % cải thiện hơi thở thơm mát
     * Dựa trên số ngày
     */
    public double getBreathFreshness(Members user) {
        int days = getDaysSmokeFree(user);
        // Công thức: số ngày * 2.75%, tối đa 38.5%
        double percent = Math.min(38.5, days * 2.75);
        return Math.max(0, Math.min(100, percent));
    }

    /**
     * Tính % cải thiện vị giác/khứu giác
     * Dựa trên số ngày
     */
    public double getTasteAndSmell(Members user) {
        int days = getDaysSmokeFree(user);
        // Công thức: số ngày * 3.2%, tối đa 45%
        double percent = Math.min(45, days * 3.2);
        return Math.max(0, Math.min(100, percent));
    }

    /**
     * Tính % giảm CO trong máu
     * Dựa trên số ngày
     */
    public double getCOLvls(Members user) {
        int days = getDaysSmokeFree(user);
        // Công thức: số ngày * 5.9%, tối đa 83%
        double percent = Math.min(83, days * 5.9);
        return Math.max(0, Math.min(100, percent));
    }

    /**
     * Tính % tăng lượng Oxy trong máu
     * Dựa trên số ngày
     */
    public double getOxygenLvls(Members user) {
        int days = getDaysSmokeFree(user);
        // Công thức: số ngày * 0.85%, tối đa 12%
        double percent = Math.min(12, days * 0.85);
        return Math.max(0, Math.min(100, percent));
    }

    /**
     * Lấy hoặc tạo mới chỉ số sức khỏe cho user trong ngày
     */
    @Transactional(rollbackFor = Exception.class)
    public HealthMetricsDTO getOrCreateTodayMetrics(Members user) {
        validateUserData(user);
        LocalDate today = LocalDate.now();
        Optional<HealthMetricsDTO> existing = healthMetricsRepository.findByUserAndDate(user, today);
        if (existing.isPresent()) {
            return existing.get();
        }
        try {
            HealthMetricsDTO metrics = new HealthMetricsDTO(
                    null,
                    user,
                    getDaysSmokeFree(user),
                    getMoneySaved(user),
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
            return healthMetricsRepository.save(metrics);
        } catch (Exception e) {
            throw new RuntimeException("Lưu chỉ số sức khỏe thất bại: " + e.getMessage());
        }
    }
}
