package com.smokingcessation.service;

import com.smokingcessation.dto.AdminDTO;
import com.smokingcessation.entity.Account;
import com.smokingcessation.entity.Admin;
import com.smokingcessation.entity.Coach;
import com.smokingcessation.entity.Members;
import com.smokingcessation.enums.Role;
import com.smokingcessation.repository.AdminRepository;
import com.smokingcessation.repository.AuthenticationRepository;
import com.smokingcessation.repository.CoachRepository;
import com.smokingcessation.repository.MembersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class AdminService {

    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;
    private final MembersRepository membersRepository;
    private final AuthenticationRepository authenticationRepository;


    @Autowired
    CoachRepository coachRepository;

    public AdminService(
            AdminRepository adminRepository,
            PasswordEncoder passwordEncoder,
            TokenService tokenService,
            MembersRepository membersRepository,
            AuthenticationRepository authenticationRepository) {
        this.adminRepository = adminRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenService = tokenService;
        this.membersRepository = membersRepository;
        this.authenticationRepository = authenticationRepository;
    }

    public AdminDTO login(String email, String password) {
        Optional<Admin> adminOptional = adminRepository.findByEmail(email);
        if (adminOptional.isPresent()) {
            Admin admin = adminOptional.get();
            if (passwordEncoder.matches(password, admin.getPassword())) {
                AdminDTO adminDTO = new AdminDTO();
                adminDTO.setEmail(admin.getEmail());
                adminDTO.setFullName(admin.getFullName());
                adminDTO.setPhone(admin.getPhone());
                adminDTO.setRole(admin.getRole());
//                adminDTO.setToken(tokenService.generateToken());
                return adminDTO;
            }
        }
        return null;
    }


    public Admin getAdminByEmail(String email) {
        return adminRepository.findByEmail(email).orElse(null);
    }

    public List<Members> getAllUsers() {
        return membersRepository.findAll();
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
        return membersRepository.count();
    }

    public Members findUserByEmail(String email) {
        return membersRepository.findByEmail(email).orElse(null);
    }

    public Members updateMember(Long memberId, Members updatedMember, String updaterEmail) {
        // Kiểm tra người thực hiện update có phải là admin hoặc coach không
        Account updater = authenticationRepository.findAccountByEmail(updaterEmail);
        if (updater == null || (updater.getRole() != Role.ADMIN && updater.getRole() != Role.Coach)) {
            throw new RuntimeException("Không có quyền cập nhật thông tin thành viên");
        }

        // Tìm member cần update
        Members existingMember = membersRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy thành viên"));

        // Cập nhật thông tin cơ bản
        existingMember.setName(updatedMember.getName());
        existingMember.setEmail(updatedMember.getEmail());
        existingMember.setPhone(updatedMember.getPhone());

        return membersRepository.save(existingMember);
    }

    // Lấy danh sách tất cả coach
    public List<Members> getAllCoaches() {
        return membersRepository.findByRole(Role.Coach);
    }

    // Thêm coach mới
    public Members createCoach(Members coach) {
        coach.setRole(Role.Coach);
        coach.setCreatedAt(LocalDateTime.now());
        coach.setPassword(passwordEncoder.encode(coach.getPassword()));
        return membersRepository.save(coach);
    }

    // Cập nhật thông tin coach
    public Members updateCoach(Long coachId, Members updatedCoach, String adminEmail) {
        // Kiểm tra người thực hiện update có phải là admin không
        Account admin = authenticationRepository.findAccountByEmail(adminEmail);
        if (admin == null || admin.getRole() != Role.ADMIN) {
            throw new RuntimeException("Chỉ admin mới có quyền cập nhật thông tin coach");
        }

        // Tìm coach cần update
        Members existingCoach = membersRepository.findById(coachId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy coach"));

        // Kiểm tra xem có phải là coach không
        if (existingCoach.getRole() != Role.Coach) {
            throw new RuntimeException("Người dùng này không phải là coach");
        }

        // Cập nhật thông tin cơ bản
        existingCoach.setName(updatedCoach.getName());
        existingCoach.setEmail(updatedCoach.getEmail());
        existingCoach.setPhone(updatedCoach.getPhone());

        return membersRepository.save(existingCoach);
    }

    // Xóa coach
    public boolean deleteCoach(Long coachId, String adminEmail) {
        // Kiểm tra người thực hiện xóa có phải là admin không
        Account admin = authenticationRepository.findAccountByEmail(adminEmail);
        if (admin == null || admin.getRole() != Role.ADMIN) {
            throw new RuntimeException("Chỉ admin mới có quyền xóa coach");
        }

        // Tìm coach cần xóa
        Members coach = membersRepository.findById(coachId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy coach"));

        // Kiểm tra xem có phải là coach không
        if (coach.getRole() != Role.Coach) {
            throw new RuntimeException("Người dùng này không phải là coach");
        }

        membersRepository.delete(coach);
        return true;
    }

    // Tìm coach theo email
    public Coach findCoachByEmail(String email) {
        Coach coach = coachRepository.findByEmail(email).orElse(null);
        if (coach != null && coach.getRole() == Role.Coach) {
            return coach;
        }
        return null;
    }

    // Tìm member theo ID
    public Members findMemberById(Long memberId) {
        Members member = membersRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy " +
                        "thành viên"));
        if (member.getRole() == Role.USER) {
            return member;
        }
        throw new RuntimeException("Người dùng này không phải là thành viên");
    }

    // Tìm coach theo ID
    public Members findCoachById(Long coachId) {
        Members coach = membersRepository.findById(coachId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy coach"));
        if (coach.getRole() == Role.Coach) {
            return coach;
        }
        throw new RuntimeException("Người dùng này không phải là coach");
    }

}