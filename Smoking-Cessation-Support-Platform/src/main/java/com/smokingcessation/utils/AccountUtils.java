package com.smokingcessation.utils;

import com.smokingcessation.entity.Account;
import com.smokingcessation.repository.AuthenticationRepository;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class AccountUtils implements ApplicationContextAware {

    private static AuthenticationRepository userRepo;

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        userRepo = applicationContext.getBean(AuthenticationRepository.class);
    }

    public Account getCurrentAccount() {
        return userRepo.findAccountByEmail(SecurityContextHolder.getContext().getAuthentication().getName());
    }


}