package com.smokingcessation.service;

import com.smokingcessation.dto.AdminDTO;
import com.smokingcessation.entity.Admin;
import com.smokingcessation.repository.AdminRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    ModelMapper modelMapper;

    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }

    public Optional<Admin> getAdminById(Long id) {
        return adminRepository.findById(id);
    }

    public Admin createAdmin(AdminDTO adminDTO) {
        Admin admin = modelMapper.map(adminDTO, Admin.class);
        return adminRepository.save(admin);
    }

    public Admin updateAdmin(Long id, Admin updatedAdmin) {
        return adminRepository.findById(id).map(admin -> {
            admin.setFullName(updatedAdmin.getFullName());
            return adminRepository.save(admin);
        }).orElse(null);
    }

    public boolean deleteAdmin(Long id) {
        return adminRepository.findById(id).map(admin -> {
            adminRepository.delete(admin);
            return true;
        }).orElse(false);
    }
}
