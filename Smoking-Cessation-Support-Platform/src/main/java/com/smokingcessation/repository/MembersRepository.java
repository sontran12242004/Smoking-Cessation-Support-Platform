package com.smokingcessation.repository;

import com.smokingcessation.entity.Members;
import com.smokingcessation.enums.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MembersRepository extends JpaRepository<Members, Long> {

    // Tìm người dùng theo email
    Optional<Members> findByEmail(String email);

    // Kiểm tra email đã tồn tại trong hệ thống chưa
    boolean existsByEmail(String email);

    List<Members> findByRole(Role role);
}
