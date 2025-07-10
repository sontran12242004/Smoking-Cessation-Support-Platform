package com.smokingcessation.enums;

public enum AppointmentEnum {
    WAIT,              // Coach đã đăng ký, chờ Admin approve
    APPROVED,          // Admin đã approve, Member có thể book
    REJECTED,          // Admin từ chối
    PENDING,           // Member đã book, chờ xử lý
    CANCEL,            // Đã hủy
    COMPLETED,         // Đã hoàn thành
}
