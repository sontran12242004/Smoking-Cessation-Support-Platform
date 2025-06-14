package com.smokingcessation.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BadgedDTO {
    private Long id;
    private Long userId;
    private String badgeName;
    private String description;
    private String imageUrl;
    private LocalDateTime earnedDate;
    private boolean isActive;

    // Hàm khởi tạo để tạo huy hiệu mới
    public BadgedDTO(Long userId, String badgeName, String description, String imageUrl) {
        this.userId = userId;
        this.badgeName = badgeName;
        this.description = description;
        this.imageUrl = imageUrl;
        this.earnedDate = LocalDateTime.now();
        this.isActive = true;
    }

    // Hàm vô hiệu hóa huy hiệu
    public void deactivate() {
        this.isActive = false;
    }

    // Hàm kích hoạt lại huy hiệu
    public void reactivate() {
        this.isActive = true;
    }

    // Hàm cập nhật thông tin huy hiệu
    public void updateBadgeInfo(String badgeName, String description, String imageUrl) {
        this.badgeName = badgeName;
        this.description = description;
        this.imageUrl = imageUrl;
    }
}
