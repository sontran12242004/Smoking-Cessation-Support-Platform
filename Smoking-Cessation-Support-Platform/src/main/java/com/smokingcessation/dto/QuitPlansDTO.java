package com.smokingcessation.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class QuitPlansDTO {
    private Long id;
    private Long memberId;
    // Thông tin hút thuốc hiện tại
    @JsonProperty("daily_cigarettes")
    private String dailyCigarettes; // "6-10"
    @JsonProperty("first_cigarette_after_waking")
    private String firstCigaretteAfterWaking; // "6-30 minutes"
    @JsonProperty("weekly_spending")
    private String weeklySpending; // "$10-$25"
    // Thông tin động lực và lịch sử
    private String motivation; // "Health reasons"
    @JsonProperty("tried_before")
    private String triedBefore; // "No"
    private List<String> triggers; // ["Morning coffee", "Stressful situations"]
    // Thông tin mục tiêu
    @JsonProperty("quit_goal")
    private String quitGoal; // Mục tiêu cai thuốc
    @JsonProperty("target_days")
    private Integer targetDays; // Số ngày mục tiêu
    // Trạng thái
    @JsonProperty("is_active")
    private boolean isActive;
    @JsonProperty("created_at")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private String createdAt;
}
