package com.smokingcessation.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "badged")
public class Badged {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private Members user;

    private String badgeName;
    private String description;
    private String imageUrl;
    private LocalDateTime earnedDate;
    private boolean isActive;

    // Hàm khởi tạo để tạo huy hiệu mới
    public Badged(Members user, String badgeName, String description, String imageUrl) {
        this.user = user;
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
