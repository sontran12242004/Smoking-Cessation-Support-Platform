package com.smokingcessation.service;

import com.smokingcessation.dto.DailyProcessDTO;
import com.smokingcessation.entity.DailyProcess;
import com.smokingcessation.entity.Members;
import com.smokingcessation.repository.DailyProcessRepository;
import com.smokingcessation.repository.MembersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DailyProcessService {

    @Autowired
    private DailyProcessRepository dailyProcessRepository;
    
    @Autowired
    private MembersRepository membersRepository;
    
    // Create or update daily process record
    public DailyProcessDTO saveDailyProcess(DailyProcessDTO dailyProcessDTO) {
        Optional<Members> memberOpt = membersRepository.findById(dailyProcessDTO.getMemberId());
        if (!memberOpt.isPresent()) {
            throw new RuntimeException("Member not found");
        }
        
        Members member = memberOpt.get();
        
        // Check if there's already a record for today
        Optional<DailyProcess> existingProcess = 
            dailyProcessRepository.findByMember_MemberIDAndDate(member.getMemberID(), dailyProcessDTO.getDate());
        
        DailyProcess dailyProcess;
        if (existingProcess.isPresent()) {
            // Update existing record
            dailyProcess = existingProcess.get();
        } else {
            // Create new record
            dailyProcess = new DailyProcess();
            dailyProcess.setMember(member);
            dailyProcess.setDate(dailyProcessDTO.getDate());
        }
        
        // Calculate money saved based on member's daily cost
        double moneySaved = member.getDailyCost() * dailyProcessDTO.getCigarettesNotSmoked();
        
        dailyProcess.setCigarettesNotSmoked(dailyProcessDTO.getCigarettesNotSmoked());
        dailyProcess.setMoneySaved(moneySaved);
        dailyProcess.setCravingIntensity(dailyProcessDTO.getCravingIntensity());
        dailyProcess.setMood(dailyProcessDTO.getMood());
        dailyProcess.setNotes(dailyProcessDTO.getNotes());
        
        dailyProcess = dailyProcessRepository.save(dailyProcess);
        
        // Convert back to DTO
        dailyProcessDTO.setProcessId(dailyProcess.getProcessId());
        dailyProcessDTO.setMoneySaved(dailyProcess.getMoneySaved());
        
        return dailyProcessDTO;
    }
    
    // Get all daily processes for a member
    public List<DailyProcessDTO> getAllProcessesForMember(Long memberId) {
        List<DailyProcess> processes = dailyProcessRepository.findByMember_MemberID(memberId);
        
        return processes.stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }
    
    // Get daily process for a specific date
    public Optional<DailyProcessDTO> getProcessForDate(Long memberId, LocalDate date) {
        Optional<DailyProcess> processOpt = 
            dailyProcessRepository.findByMember_MemberIDAndDate(memberId, date);
        
        return processOpt.map(this::convertToDTO);
    }
    
    // Get daily processes within a date range
    public List<DailyProcessDTO> getProcessesForDateRange(Long memberId, LocalDate startDate, LocalDate endDate) {
        List<DailyProcess> processes = 
            dailyProcessRepository.findByMember_MemberIDAndDateBetween(memberId, startDate, endDate);
        
        return processes.stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }
    
    // Delete a daily process record
    public void deleteDailyProcess(Long processId) {
        dailyProcessRepository.deleteById(processId);
    }
    
    // Helper method to convert Entity to DTO
    private DailyProcessDTO convertToDTO(DailyProcess dailyProcess) {
        DailyProcessDTO dto = new DailyProcessDTO();
        dto.setProcessId(dailyProcess.getProcessId());
        dto.setMemberId(dailyProcess.getMember().getMemberID());
        dto.setDate(dailyProcess.getDate());
        dto.setCigarettesNotSmoked(dailyProcess.getCigarettesNotSmoked());
        dto.setMoneySaved(dailyProcess.getMoneySaved());
        dto.setCravingIntensity(dailyProcess.getCravingIntensity());
        dto.setMood(dailyProcess.getMood());
        dto.setNotes(dailyProcess.getNotes());
        return dto;
    }
}
