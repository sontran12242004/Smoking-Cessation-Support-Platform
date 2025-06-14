package com.smokingcessation.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.smokingcessation.dto.BadgedDTO;
import com.smokingcessation.entity.Badged;
import com.smokingcessation.entity.Members;
import com.smokingcessation.enums.Role;
import com.smokingcessation.exception.AuthenticationException;
import com.smokingcessation.repository.BadgedRepository;
import com.smokingcessation.repository.MembersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BadgedService {

    @Autowired
    private BadgedRepository badgedRepository;

    @Autowired
    private ObjectMapper objectMapper;
    private BadgedDTO convertToDTO(Badged badged) {
        return objectMapper.convertValue(badged, BadgedDTO.class);
    }

    @Autowired
    private MembersRepository membersRepository;

    // Kiểm tra quyền ADMIN
    private void checkAdminRole(Members user) {
        if (user == null || user.getRole() != Role.ADMIN) {
            throw new AuthenticationException("Chỉ ADMIN mới có quyền thực hiện thao tác này");
        }
    }

    // Lấy danh sách tất cả huy hiệu
    public List<BadgedDTO> getAllBadges() {
        return badgedRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Lấy huy hiệu theo ID
    public BadgedDTO getBadgeById(Long id) {
        return badgedRepository.findById(id)
                .map(this::convertToDTO)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy huy hiệu với ID: " + id));
    }

    // Lấy danh sách huy hiệu của một người dùng
    public List<BadgedDTO> getBadgesByUserId(Long userId) {
        Members user = membersRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng với ID: " + userId));
        return badgedRepository.findByUser(user).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Tạo huy hiệu mới (chỉ ADMIN)
    @Transactional
    public BadgedDTO createBadge(BadgedDTO badgedDTO, Members admin) {
        checkAdminRole(admin);
        
        Members user = membersRepository.findById(badgedDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng với ID: " + badgedDTO.getUserId()));

        Badged badged = new Badged(
                user,
                badgedDTO.getBadgeName(),
                badgedDTO.getDescription(),
                badgedDTO.getImageUrl()
        );

        return convertToDTO(badgedRepository.save(badged));
    }

    // Cập nhật thông tin huy hiệu (chỉ ADMIN)
    @Transactional
    public BadgedDTO updateBadge(Long id, BadgedDTO badgedDTO, Members admin) {
        checkAdminRole(admin);

        Badged existingBadge = badgedRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy huy hiệu với ID: " + id));

        existingBadge.updateBadgeInfo(
                badgedDTO.getBadgeName(),
                badgedDTO.getDescription(),
                badgedDTO.getImageUrl()
        );

        return convertToDTO(badgedRepository.save(existingBadge));
    }

    // Vô hiệu hóa huy hiệu (chỉ ADMIN)
    @Transactional
    public void deactivateBadge(Long id, Members admin) {
        checkAdminRole(admin);
        
        Badged badged = badgedRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy huy hiệu với ID: " + id));
        badged.deactivate();
        badgedRepository.save(badged);
    }

    // Kích hoạt lại huy hiệu (chỉ ADMIN)
    @Transactional
    public void reactivateBadge(Long id, Members admin) {
        checkAdminRole(admin);
        
        Badged badged = badgedRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy huy hiệu với ID: " + id));
        badged.reactivate();
        badgedRepository.save(badged);
    }

    // Xóa huy hiệu (chỉ ADMIN)
    @Transactional
    public void deleteBadge(Long id, Members admin) {
        checkAdminRole(admin);
        
        if (!badgedRepository.existsById(id)) {
            throw new RuntimeException("Không tìm thấy huy hiệu với ID: " + id);
        }
        badgedRepository.deleteById(id);
    }

}