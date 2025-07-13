package com.smokingcessation.service;

import com.smokingcessation.dto.EmailDetail;
import com.smokingcessation.entity.Account;
import com.smokingcessation.entity.Reminder;
import com.smokingcessation.enums.Role;
import com.smokingcessation.repository.AuthenticationRepository;
import com.smokingcessation.repository.ReminderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class ReminderService {
    @Autowired
    private ReminderRepository reminderRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private AuthenticationRepository authenticationRepository;

    public void createReminderForAllMembers(String content) {
        // Lấy tất cả account có role MEMBERS (giả sử role = 4 là MEMBERS)
        List<Account> members = authenticationRepository.findByRole(Role.MEMBERS);

        for (Account user : members) {
            // Lưu reminder vào DB (nếu muốn)
            Reminder reminder = new Reminder();
            reminder.setContent(content);
            reminder.setCreatedAt(LocalDateTime.now());
            reminder.setUser(user);
            reminderRepository.save(reminder);
            // Gửi email cho từng member
            EmailDetail emailDetail = new EmailDetail();
            emailDetail.setReceiver(user);
            emailDetail.setRecipient(user.getEmail());
            emailDetail.setSubject("Motivation Reminder from Admin");
            emailDetail.setLink(""); // Nếu muốn chèn link, có thể set ở đây
            emailService.sendMail(emailDetail);
        }
    }
}
