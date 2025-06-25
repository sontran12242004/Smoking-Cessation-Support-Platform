package com.smokingcessation.service;


import com.smokingcessation.dto.*;
import com.smokingcessation.entity.Account;
import com.smokingcessation.entity.ForgotPassword;
import com.smokingcessation.enums.Role;
import com.smokingcessation.exception.exceptions.AuthenticationException;
import com.smokingcessation.repository.AccountSlotRepository;
import com.smokingcessation.repository.AuthenticationRepository;
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

import java.util.List;


@Service
public class AuthenticationService implements UserDetailsService {

    @Autowired
    AuthenticationRepository authenticationRepository;

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

    public Account register(Account account) {
        account.password = passwordEncoder.encode(account.getPassword());
        Account newAccount = authenticationRepository.save(account);

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
}