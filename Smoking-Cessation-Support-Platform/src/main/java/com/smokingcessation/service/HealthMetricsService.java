package com.smokingcessation.service;

import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import com.smokingcessation.dto.HealthMetrics;
import com.smokingcessation.entity.Users;
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
    public int getDaysSmokeFree(Users user) {
        LocalDate quitDate = user.getQuitDate();
        if (quitDate == null) return 0;
        return (int) ChronoUnit.DAYS.between(quitDate, LocalDate.now());
    }

    /**
     * Tính tổng số tiền tiết kiệm được kể từ khi bắt đầu cai thuốc
     */
    public int getMoneySaved(Users user) {
        int days = getDaysSmokeFree(user);
        return days * user.getDailyCost();
    }

    /**
     * Lấy tổng số điếu thuốc đã hút từ quitDate đến hiện tại
     */
    public int getTotalCigarettesSmoked(Users user) {
        LocalDate quitDate = user.getQuitDate();
        if (quitDate == null) return 0;
        int total = 0;
        LocalDate today = LocalDate.now();
        for (LocalDate date = quitDate; !date.isAfter(today); date = date.plusDays(1)) {
            total += cigaretteLogRepository.findByUserAndLogDate(user, date)
                    .map(CigaretteLog::getCigarettesSmoked).orElse(0);
        }
        return total;
    }

    /**
     * Kiểm tra dữ liệu đầu vào của user
     */
    private void validateUserData(Users user) {
        if (user.getQuitDate() == null || user.getQuitDate().isAfter(LocalDate.now())) {
            throw new IllegalArgumentException("Ngày bắt đầu cai thuốc không hợp lệ");
        }
        if (user.getDailyCost() < 0) {
            throw new IllegalArgumentException("Số tiền hút thuốc mỗi ngày không hợp lệ");
        }
    }

    /**
     * Tính % cải thiện sức khỏe tổng thể dựa trên số ngày cai và tổng số điếu hút
     */
    public double getHealthImprovedPercent(Users user) {
        int days = getDaysSmokeFree(user);
        int cigarettes = getTotalCigarettesSmoked(user);
        double percent = 100.0 + days * 2.0 - cigarettes * 1.0;
        return Math.max(0, Math.min(100, percent));
    }

    /**
     * Tính % giảm nguy cơ đau tim
     */
    public double getHeartAttackRisk(Users user) {
        int days = getDaysSmokeFree(user);
        int cigarettes = getTotalCigarettesSmoked(user);
        double percent = 100.0 - days * 1.2 - cigarettes * 0.8;
        return Math.max(0, Math.min(100, percent));
    }

    /**
     * Tính % giảm nguy cơ ung thư phổi
     */
    public double getLungCancerRisk(Users user) {
        int days = getDaysSmokeFree(user);
        int cigarettes = getTotalCigarettesSmoked(user);
        double percent = 100.0 - days * 1.1 - cigarettes * 0.7;
        return Math.max(0, Math.min(100, percent));
    }

    /**
     * Tính % giảm nguy cơ bệnh tim
     */
    public double getHeartDiseaseRisk(Users user) {
        int days = getDaysSmokeFree(user);
        return Math.min(27, days * 1.9);
    }

    /**
     * Tính % cải thiện hệ miễn dịch
     */
    public double getImmuneFunction(Users user) {
        int days = getDaysSmokeFree(user);
        return Math.min(22, days * 1.6);
    }

    /**
     * Tính % trắng răng
     */
    public double getTeethWhitening(Users user) {
        int days = getDaysSmokeFree(user);
        return Math.min(19, days * 1.3);
    }

    /**
     * Tính % cải thiện hơi thở thơm mát
     */
    public double getBreathFreshness(Users user) {
        int days = getDaysSmokeFree(user);
        return Math.min(38.5, days * 2.75);
    }

    /**
     * Tính % cải thiện vị giác/khứu giác
     */
    public double getTasteAndSmell(Users user) {
        int days = getDaysSmokeFree(user);
        return Math.min(45, days * 3.2);
    }

    /**
     * Tính % giảm CO trong máu
     */
    public double getCOLvls(Users user) {
        int days = getDaysSmokeFree(user);
        return Math.min(83, days * 5.9);
    }

    /**
     * Tính % tăng lượng Oxy trong máu
     */
    public double getOxygenLvls(Users user) {
        int days = getDaysSmokeFree(user);
        return Math.min(12, days * 0.85);
    }

    /**
     * Lấy hoặc tạo mới chỉ số sức khỏe cho user trong ngày, rollback nếu lỗi
     */
    @Transactional(rollbackFor = Exception.class)
    public HealthMetrics getOrCreateTodayMetrics(Users user) {
        validateUserData(user);
        LocalDate today = LocalDate.now();
        Optional<HealthMetrics> existing = healthMetricsRepository.findByUserAndDate(user, today);
        if (existing.isPresent()) {
            return existing.get();
        }
        try {
            HealthMetrics metrics = new HealthMetrics(
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
