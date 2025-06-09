package com.smokingcessation.service;

import com.smokingcessation.dto.AdminDTO;
import com.smokingcessation.entity.Account;
import com.smokingcessation.entity.Admin;
import com.smokingcessation.entity.Users;
import com.smokingcessation.enums.Role;
import com.smokingcessation.repository.AdminRepository;
import com.smokingcessation.repository.AuthenticationRepository;
import com.smokingcessation.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdminService {

    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;
    private final UserRepository userRepository;
    private final AuthenticationRepository authenticationRepository;

    public AdminService(
            AdminRepository adminRepository,
            PasswordEncoder passwordEncoder,
            TokenService tokenService,
            UserRepository userRepository,
            AuthenticationRepository authenticationRepository) {
        this.adminRepository = adminRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenService = tokenService;
        this.userRepository = userRepository;
        this.authenticationRepository = authenticationRepository;
    }

    public AdminDTO login(String email, String password) {
        Optional<Admin> adminOptional = adminRepository.findByEmailAndIsActiveTrue(email);
        if (adminOptional.isPresent()) {
            Admin admin = adminOptional.get();
            if (passwordEncoder.matches(password, admin.getPassword())) {
                AdminDTO adminDTO = new AdminDTO();
                adminDTO.setEmail(admin.getEmail());
                adminDTO.setFullName(admin.getFullName());
                adminDTO.setPhone(admin.getPhone());
                adminDTO.setRole(admin.getRole());
                adminDTO.setToken(tokenService.generateToken(admin));
                return adminDTO;
            }
        }
        return null;
    }

    public Admin createAdmin(Admin admin) {
        admin.setPassword(passwordEncoder.encode(admin.getPassword()));
        return adminRepository.save(admin);
    }

    public Admin getAdminByEmail(String email) {
        return adminRepository.findAccountByEmail(email);
    }

    public List<Users> getAllUsers() {
        return userRepository.findAll();
    }

    public Account updateUserRole(String email, Role newRole) {
        Account account = authenticationRepository.findAccountByEmail(email);
        if (account != null) {
            account.setRole(newRole);
            return authenticationRepository.save(account);
        }
        return null;
    }

    public List<Account> getAllAccounts() {
        return authenticationRepository.findAll();
    }

    public boolean deleteUser(String email) {
        Account account = authenticationRepository.findAccountByEmail(email);
        if (account != null) {
            authenticationRepository.delete(account);
            return true;
        }
        return false;
    }

    public Long getTotalUsers() {
        return userRepository.count();
    }

    public Users findUserByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }


}