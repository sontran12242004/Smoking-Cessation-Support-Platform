package com.smokingcessation.repository;

import com.smokingcessation.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<Users, Long> {

    // Tìm người dùng theo email
    Optional<Users> findByEmail(String email);

    // Kiểm tra email đã tồn tại trong hệ thống chưa
    boolean existsByEmail(String email);
}
