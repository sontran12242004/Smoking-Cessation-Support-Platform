package com.smokingcessation.repository;

import com.smokingcessation.entity.QuitPlans;
import com.smokingcessation.entity.Members;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface QuitPlansRepository extends JpaRepository<QuitPlans, Long> {
    // Tìm quit plan theo member
    Optional<QuitPlans> findByMember(Members member);
    

}
