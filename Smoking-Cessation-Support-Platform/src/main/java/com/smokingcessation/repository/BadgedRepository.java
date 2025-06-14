package com.smokingcessation.repository;

import com.smokingcessation.entity.Badged;
import com.smokingcessation.entity.Members;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BadgedRepository extends JpaRepository<Badged, Long> {
    List<Badged> findByUser(Members user);
}