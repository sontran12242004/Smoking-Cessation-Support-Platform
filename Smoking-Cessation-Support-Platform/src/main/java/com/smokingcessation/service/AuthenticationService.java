package com.smokingcessation.service;


import com.smokingcessation.dto.*;
import com.smokingcessation.entity.Account;
import com.smokingcessation.entity.ForgotPassword;
import com.smokingcessation.entity.Members;
import com.smokingcessation.entity.Admin;
import com.smokingcessation.entity.Coach;
import com.smokingcessation.enums.Role;
import com.smokingcessation.exception.exceptions.AuthenticationException;
import com.smokingcessation.repository.AccountSlotRepository;
import com.smokingcessation.repository.AuthenticationRepository;
import com.smokingcessation.repository.MembersRepository;
import com.smokingcessation.repository.AdminRepository;
import com.smokingcessation.repository.CoachRepository;
import javassist.NotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;


@Service
public class AuthenticationService implements UserDetailsService {

    @Autowired
    AuthenticationRepository authenticationRepository;

    @Autowired
    MembersRepository membersRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    AuthenticationManager authenticationManager; // giúp check đăng nhập

    @Autowired
    ModelMapper modelMapper;

    @Autowired
    TokenService tokenService;

    @Autowired
    EmailService emailService;

    @Autowired
    AdminRepository adminRepository;

    @Autowired
    CoachRepository coachRepository;

    @Transactional
    public Account register(Account account) {
        account.password = passwordEncoder.encode(account.getPassword());
        Account newAccount = authenticationRepository.save(account);

        // Nếu role là MEMBERS thì tự động tạo Members entity và liên kết
        if (account.getRole() == Role.MEMBERS) {
            Members member = new Members();
            member.setName(account.getFullName());
            member.setEmail(account.getEmail());
            member.setPhone(account.getPhone());
            member.setPassword(account.getPassword());
            member.setRole(Role.MEMBERS);
            member.setCreatedAt(LocalDateTime.now());
            member.setActive(true);
            member.setAccount(newAccount);  // Liên kết với Account

            membersRepository.save(member);
        }

        // Nếu role là ADMIN thì tự động tạo Admin entity và liên kết
        if (account.getRole() == Role.ADMIN) {
            Admin admin = new Admin();
            admin.setFullName(account.getFullName());

            Admin savedAdmin = adminRepository.save(admin);
            newAccount.setAdmin(savedAdmin);  // Liên kết với Account
            authenticationRepository.save(newAccount);  // Cập nhật Account
        }

        // Nếu role là COACH thì tự động tạo Coach entity và liên kết
        if (account.getRole() == Role.COACH) {
            Coach coach = new Coach();
            coach.setName(account.getFullName());
            coach.setActive(true);  // Đảm bảo Coach luôn active
            coach.setCreatedAt(LocalDateTime.now());
            coach.setAccount(newAccount);  // Liên kết với Account trước khi save

            Coach savedCoach = coachRepository.save(coach);
            newAccount.setCoach(savedCoach);  // Liên kết với Account
            authenticationRepository.save(newAccount);  // Cập nhật Account
        }

        EmailDetail emailDetail = new EmailDetail();
        emailDetail.setRecipient(account.email);
        emailDetail.setSubject("Welcome to my system");
        emailService.sendMail(emailDetail);
        return newAccount;
    }

    public AccountDTO login(LoginDTO loginRequest){
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    loginRequest.getEmail(),
                    loginRequest.getPassword()
            ));
        }catch (Exception e){
            // sai thông tin đăng nhập
            System.out.println("Thông tin đăng nhập ko chính xác");

            throw new AuthenticationException("Invalid username or password");
        }

        Account account = authenticationRepository.findAccountByEmail(loginRequest.getEmail());
        AccountDTO accountResponse = modelMapper.map(account, AccountDTO.class);
        String token = tokenService.generateToken(account);
        accountResponse.setToken(token);
        accountResponse.setUserId(account.getId()); // Thêm userId vào response

        // Nếu là COACH thì thêm coachId
        if (account.getRole() == Role.COACH && account.getCoach() != null) {
            accountResponse.setCoachId(account.getCoach().getId());
        }

        return accountResponse;
    }
    public void forgotPassword(ForgotPasswordDTO  forgotPasswordRequest) {
        Account account =authenticationRepository.findAccountByEmail(forgotPasswordRequest.getEmail());
        if(account == null){
            throw new RuntimeException("Account not found");
        }else
        {
            EmailDetail emailDetail = new EmailDetail();
            emailDetail.setReceiver(account);
            emailDetail.setSubject("Reset Password");
            emailDetail.setRecipient(account.getEmail());
            emailDetail.setLink("http://your-domain/reset?token=" + tokenService.generateToken(account));
            emailService.sendMail(emailDetail);

        }
    }

    public Account getCurrentAccount(){
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return authenticationRepository.findAccountByEmail(email);
    }



    public Account resetPassword(ResetPasswordDTO resetPasswordDTO ) {
        Account account = getCurrentAccount();
        account.setPassword(passwordEncoder.encode(resetPasswordDTO.getPassword()));
        return authenticationRepository.save(account);
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return authenticationRepository.findAccountByEmail(email);
    }


    public List<Account> getCoachs() {
        return authenticationRepository.findByRole(Role.COACH);
    }

    // Method để lấy Members entity từ Account email
    public Members getMemberByAccountEmail(String email) {
        return membersRepository.findByEmail(email).orElse(null);
    }

    // Method để lấy Members entity từ current Account
    public Members getCurrentMember() {
        Account currentAccount = getCurrentAccount();
        if (currentAccount != null && currentAccount.getRole() == Role.MEMBERS) {
            return currentAccount.getMember();  // Sử dụng relationship thay vì tìm theo email
        }
        return null;
    }

    // Method để lấy Admin entity từ current Account
    public Admin getCurrentAdmin() {
        Account currentAccount = getCurrentAccount();
        if (currentAccount != null && currentAccount.getRole() == Role.ADMIN) {
            return currentAccount.getAdmin();  // Sử dụng relationship thay vì tìm theo email
        }
        return null;
    }

    // Method để lấy Coach entity từ current Account
    public Coach getCurrentCoach() {
        Account currentAccount = getCurrentAccount();
        if (currentAccount != null && currentAccount.getRole() == Role.COACH) {
            return currentAccount.getCoach();  // Sử dụng relationship thay vì tìm theo account
        }
        return null;
    }
}