package com.smokingcessation.controller;

import com.smokingcessation.dto.HealthMetricsDTO;
import com.smokingcessation.entity.Members;
import com.smokingcessation.repository.MembersRepository;
import com.smokingcessation.service.HealthMetricsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/health-metrics")
public class HealthMetricsController {

    @Autowired
    private MembersRepository userRepository;

    @Autowired
    private HealthMetricsService healthMetricsService;

    // AUTHENTICATED - Members (xem metrics của mình), Coach (xem assigned members), Admin (xem tất cả)
    @GetMapping("/{userId}")
    @PreAuthorize("hasAnyRole('MEMBERS', 'COACH', 'ADMIN')")
    public ResponseEntity<HealthMetricsDTO> getHealthMetrics(@PathVariable Long userId) {
        Members user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng"));

        HealthMetricsDTO metrics = healthMetricsService.getOrCreateTodayMetrics(user);
        return ResponseEntity.ok(metrics);
    }

    // PUBLIC - Guest, Members, Coach, Admin đều có thể xem days free
    @GetMapping("/days-free")
    public ResponseEntity getDaysSmokeFree(@RequestParam Long userId) {
        Members user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng"));
        int days = healthMetricsService.getDaysSmokeFree(user);
        return ResponseEntity.ok(days);
    }

    // PUBLIC - Guest, Members, Coach, Admin đều có thể xem money saved
    @GetMapping("/money-saved")
    public ResponseEntity getMoneySaved(@RequestParam Long userId) {
        Members user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng"));
        int money = healthMetricsService.getMoneySaved(userId);
        return ResponseEntity.ok(money);
    }

    // PUBLIC - Guest, Members, Coach, Admin đều có thể xem total cigarettes
    @GetMapping("/total-cigarettes")
    public ResponseEntity getTotalCigarettes(@RequestParam Long userId) {
        Members user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng"));
        int cigarettes = healthMetricsService.getTotalCigarettesSmoked(user);
        return ResponseEntity.ok(cigarettes);
    }

    // PUBLIC - Guest, Members, Coach, Admin đều có thể xem health improved
    @GetMapping("/percent/health-improved")
    public ResponseEntity getHealthImproved(@RequestParam Long userId) {
        Members user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng"));
        double percent = healthMetricsService.getHealthImprovedPercent(user);
        return ResponseEntity.ok(percent);
    }

    // PUBLIC - Guest, Members, Coach, Admin đều có thể xem heart attack risk
    @GetMapping("/risk/heart-attack")
    public ResponseEntity getHeartAttackRisk(@RequestParam Long userId) {
        Members user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng"));
        double risk = healthMetricsService.getHeartAttackRisk(user);
        return ResponseEntity.ok(risk);
    }

    // PUBLIC - Guest, Members, Coach, Admin đều có thể xem lung cancer risk
    @GetMapping("/risk/lung-cancer")
    public ResponseEntity getLungCancerRisk(@RequestParam Long userId) {
        Members user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng"));
        double risk = healthMetricsService.getLungCancerRisk(user);
        return ResponseEntity.ok(risk);
    }

    // PUBLIC - Guest, Members, Coach, Admin đều có thể xem heart disease risk
    @GetMapping("/risk/heart-disease")
    public ResponseEntity getHeartDiseaseRisk(@RequestParam Long userId) {
        Members user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng"));
        double risk = healthMetricsService.getHeartDiseaseRisk(user);
        return ResponseEntity.ok(risk);
    }

    // PUBLIC - Guest, Members, Coach, Admin đều có thể xem immune function
    @GetMapping("/percent/immune-function")
    public ResponseEntity getImmuneFunction(@RequestParam Long userId) {
        Members user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng"));
        double percent = healthMetricsService.getImmuneFunction(user);
        return ResponseEntity.ok(percent);
    }

    // PUBLIC - Guest, Members, Coach, Admin đều có thể xem teeth whitening
    @GetMapping("/percent/teeth-whitening")
    public ResponseEntity getTeethWhitening(@RequestParam Long userId) {
        Members user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng"));
        double percent = healthMetricsService.getTeethWhitening(user);
        return ResponseEntity.ok(percent);
    }

    // PUBLIC - Guest, Members, Coach, Admin đều có thể xem breath freshness
    @GetMapping("/percent/breath-freshness")
    public ResponseEntity getBreathFreshness(@RequestParam Long userId) {
        Members user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng"));
        double percent = healthMetricsService.getBreathFreshness(user);
        return ResponseEntity.ok(percent);
    }

    // PUBLIC - Guest, Members, Coach, Admin đều có thể xem taste smell
    @GetMapping("/percent/taste-smell")
    public ResponseEntity getTasteAndSmell(@RequestParam Long userId) {
        Members user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng"));
        double percent = healthMetricsService.getTasteAndSmell(user);
        return ResponseEntity.ok(percent);
    }

    // PUBLIC - Guest, Members, Coach, Admin đều có thể xem CO levels
    @GetMapping("/percent/co-levels")
    public ResponseEntity getCOLevels(@RequestParam Long userId) {
        Members user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng"));
        double percent = healthMetricsService.getCOLvls(user);
        return ResponseEntity.ok(percent);
    }

    // PUBLIC - Guest, Members, Coach, Admin đều có thể xem oxygen levels
    @GetMapping("/percent/oxygen-levels")
    public ResponseEntity getOxygenLevels(@RequestParam Long userId) {
        Members user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng"));
        double percent = healthMetricsService.getOxygenLvls(user);
        return ResponseEntity.ok(percent);
    }
}