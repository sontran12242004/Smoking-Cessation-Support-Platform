package com.smokingcessation.service;

import com.smokingcessation.entity.*;
import com.smokingcessation.enums.AppointmentEnum;
import com.smokingcessation.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class StatisticsService {

    @Autowired
    private MembersRepository membersRepository;

    @Autowired
    private CoachRepository coachRepository;

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private DailyProcessRepository dailyProcessRepository;

    @Autowired
    private HealthMetricsRepository healthMetricsRepository;

    @Autowired
    private SubscriptionRepository subscriptionRepository;

    @Autowired
    private CigaretteLogRepository cigaretteLogRepository;

    /**
     * API tổng hợp thống kê cốt lõi cho Admin Dashboard
     */
    public Map<String, Object> getComprehensiveDashboardStatistics(LocalDate startDate, LocalDate endDate, int trendDays) {
        Map<String, Object> dashboard = new HashMap<>();

        // 1. Tổng quan hệ thống
        dashboard.put("overview", getSystemOverview());

        // 2. Thống kê Users
        dashboard.put("users", getUserStatistics());

        // 3. Thống kê Appointments (với date range)
        dashboard.put("appointments", getAppointmentStatistics(startDate, endDate));

        // 4. Top Performers
        dashboard.put("topPerformers", getTopPerformers());

        // Metadata
        dashboard.put("generatedAt", LocalDateTime.now());
        dashboard.put("dataRange", Map.of(
                "startDate", startDate != null ? startDate : "auto",
                "endDate", endDate != null ? endDate : "auto"
        ));

        return dashboard;
    }

    /**
     * Tổng quan hệ thống - Dashboard chính
     */
    public Map<String, Object> getSystemOverview() {
        Map<String, Object> overview = new HashMap<>();

        // Tổng số users
        long totalMembers = membersRepository.count();
        long totalCoaches = coachRepository.count();
        long totalAdmins = adminRepository.count();

        // Members active (đăng nhập trong 30 ngày qua)
        LocalDateTime thirtyDaysAgo = LocalDateTime.now().minus(30, ChronoUnit.DAYS);
        long activeMembersThisMonth = membersRepository.findAll().stream()
                .filter(member -> member.getCreatedAt() != null && member.getCreatedAt().isAfter(thirtyDaysAgo))
                .count();

        // Appointments hôm nay
        LocalDate today = LocalDate.now();
        long appointmentsToday = appointmentRepository.findAll().stream()
                .filter(apt -> apt.getAppointmentDate() != null && apt.getAppointmentDate().equals(today))
                .count();

        // Appointments hoàn thành tuần này
        LocalDate weekStart = today.minusDays(today.getDayOfWeek().getValue() - 1);
        long completedThisWeek = appointmentRepository.findAll().stream()
                .filter(apt -> apt.getAppointmentDate() != null
                        && !apt.getAppointmentDate().isBefore(weekStart)
                        && !apt.getAppointmentDate().isAfter(today)
                        && apt.getStatus() == AppointmentEnum.COMPLETED)
                .count();

        // Success rate (% appointments completed vs total)
        long totalAppointments = appointmentRepository.count();
        long completedAppointments = appointmentRepository.findAll().stream()
                .filter(apt -> apt.getStatus() == AppointmentEnum.COMPLETED)
                .count();
        double successRate = totalAppointments > 0 ? (completedAppointments * 100.0 / totalAppointments) : 0;

        overview.put("totalUsers", totalMembers + totalCoaches + totalAdmins);
        overview.put("totalMembers", totalMembers);
        overview.put("totalCoaches", totalCoaches);
        overview.put("activeMembersThisMonth", activeMembersThisMonth);
        overview.put("appointmentsToday", appointmentsToday);
        overview.put("completedThisWeek", completedThisWeek);
        overview.put("successRate", Math.round(successRate * 10.0) / 10.0);

        return overview;
    }

    /**
     * Thống kê Users (Members, Coaches, Admins)
     */
    public Map<String, Object> getUserStatistics() {
        Map<String, Object> userStats = new HashMap<>();

        List<Members> allMembers = membersRepository.findAll();
        List<Coach> allCoaches = coachRepository.findAll();

        // Member statistics
        long totalMembers = allMembers.size();
        long activeMembers = allMembers.stream().filter(Members::isActive).count();
        long newMembersThisMonth = allMembers.stream()
                .filter(member -> member.getCreatedAt() != null
                        && member.getCreatedAt().isAfter(LocalDateTime.now().minusMonths(1)))
                .count();

        // Coach statistics
        long totalCoaches = allCoaches.size();
        long activeCoaches = allCoaches.stream().filter(Coach::isActive).count();

        // Growth rate (new members this month vs last month)
        LocalDateTime lastMonthStart = LocalDateTime.now().minusMonths(2);
        LocalDateTime thisMonthStart = LocalDateTime.now().minusMonths(1);
        long newMembersLastMonth = allMembers.stream()
                .filter(member -> member.getCreatedAt() != null
                        && member.getCreatedAt().isAfter(lastMonthStart)
                        && member.getCreatedAt().isBefore(thisMonthStart))
                .count();

        double growthRate = newMembersLastMonth > 0
                ? ((newMembersThisMonth - newMembersLastMonth) * 100.0 / newMembersLastMonth)
                : (newMembersThisMonth > 0 ? 100.0 : 0.0);

        userStats.put("members", Map.of(
                "total", totalMembers,
                "active", activeMembers,
                "newThisMonth", newMembersThisMonth,
                "inactiveMembers", totalMembers - activeMembers
        ));

        userStats.put("coaches", Map.of(
                "total", totalCoaches,
                "active", activeCoaches,
                "inactive", totalCoaches - activeCoaches
        ));

        userStats.put("growthRate", Math.round(growthRate * 10.0) / 10.0);

        return userStats;
    }

    /**
     * Thống kê Appointments
     */
    public Map<String, Object> getAppointmentStatistics(LocalDate startDate, LocalDate endDate) {
        final LocalDate finalStartDate = startDate != null ? startDate : LocalDate.now().minusMonths(1);
        final LocalDate finalEndDate = endDate != null ? endDate : LocalDate.now();

        List<Appointment> appointments = appointmentRepository.findAll().stream()
                .filter(apt -> apt.getAppointmentDate() != null
                        && !apt.getAppointmentDate().isBefore(finalStartDate)
                        && !apt.getAppointmentDate().isAfter(finalEndDate))
                .collect(Collectors.toList());

        Map<String, Object> appointmentStats = new HashMap<>();

        // Status breakdown
        Map<AppointmentEnum, Long> statusCount = appointments.stream()
                .collect(Collectors.groupingBy(Appointment::getStatus, Collectors.counting()));

        // Daily appointments (for chart)
        Map<LocalDate, Long> dailyAppointments = appointments.stream()
                .collect(Collectors.groupingBy(Appointment::getAppointmentDate, Collectors.counting()));

        // Coach performance
        Map<String, Long> coachAppointments = appointments.stream()
                .filter(apt -> apt.getCoach() != null)
                .collect(Collectors.groupingBy(
                        apt -> apt.getCoach().getName(),
                        Collectors.counting()
                ));

        appointmentStats.put("total", appointments.size());
        appointmentStats.put("statusBreakdown", statusCount);
        appointmentStats.put("dailyTrend", dailyAppointments);
        appointmentStats.put("coachPerformance", coachAppointments);
        appointmentStats.put("period", Map.of("startDate", finalStartDate, "endDate", finalEndDate));

        return appointmentStats;
    }

    /**
     * Thống kê Health Metrics & Progress
     */
    public Map<String, Object> getHealthProgressStatistics() {
        Map<String, Object> healthStats = new HashMap<>();

        List<Members> allMembers = membersRepository.findAll();
        List<DailyProcess> allDailyProcesses = dailyProcessRepository.findAll();

        // Average days smoke-free
        double avgDaysSmokeFree = allMembers.stream()
                .mapToLong(member -> dailyProcessRepository.countByMember_MemberID(member.getMemberID()))
                .average()
                .orElse(0.0);

        // Success distribution (by days smoke-free ranges)
        Map<String, Long> successDistribution = new HashMap<>();
        allMembers.forEach(member -> {
            long daysSmokeFree = dailyProcessRepository.countByMember_MemberID(member.getMemberID());
            String range;
            if (daysSmokeFree == 0) range = "0 days";
            else if (daysSmokeFree <= 7) range = "1-7 days";
            else if (daysSmokeFree <= 30) range = "1-4 weeks";
            else if (daysSmokeFree <= 90) range = "1-3 months";
            else if (daysSmokeFree <= 365) range = "3-12 months";
            else range = "1+ years";

            successDistribution.merge(range, 1L, Long::sum);
        });

        // Total money saved across all members
        int totalMoneySaved = allMembers.stream()
                .mapToInt(member -> {
                    long days = dailyProcessRepository.countByMember_MemberID(member.getMemberID());
                    return (int) (days * 500); // 500 VND per cigarette saved per day
                })
                .sum();

        // Most improved members (top 10 by days smoke-free)
        List<Map<String, Object>> topMembers = allMembers.stream()
                .map(member -> {
                    long daysSmokeFree = dailyProcessRepository.countByMember_MemberID(member.getMemberID());
                    Map<String, Object> memberInfo = new HashMap<>();
                    memberInfo.put("name", member.getName());
                    memberInfo.put("daysSmokeFree", daysSmokeFree);
                    memberInfo.put("moneySaved", daysSmokeFree * 500);
                    return memberInfo;
                })
                .sorted((a, b) -> Long.compare((Long) b.get("daysSmokeFree"), (Long) a.get("daysSmokeFree")))
                .limit(10)
                .collect(Collectors.toList());

        healthStats.put("avgDaysSmokeFree", Math.round(avgDaysSmokeFree * 10.0) / 10.0);
        healthStats.put("totalMoneySaved", totalMoneySaved);
        healthStats.put("successDistribution", successDistribution);
        healthStats.put("topPerformers", topMembers);

        return healthStats;
    }

    /**
     * Thống kê Subscriptions & Revenue
     */
    public Map<String, Object> getSubscriptionStatistics() {
        Map<String, Object> subscriptionStats = new HashMap<>();

        List<Subscription> allSubscriptions = subscriptionRepository.findAll();

        // Subscription status breakdown
        Map<String, Long> statusBreakdown = allSubscriptions.stream()
                .collect(Collectors.groupingBy(
                        sub -> sub.isActive() ? "Active" : "Inactive",
                        Collectors.counting()
                ));

        // Revenue calculation (if subscription has pricing)
        double totalRevenue = allSubscriptions.stream()
                .filter(Subscription::isActive)
                .mapToDouble(sub -> {
                    // Assuming basic plan costs
                    if (sub.getMembershipPlan() != null && sub.getMembershipPlan().getPrice() != null) {
                        return sub.getMembershipPlan().getPrice().doubleValue();
                    }
                    return 0.0;
                })
                .sum();

        // Monthly subscription trend (last 12 months)
        Map<String, Long> monthlyTrend = new HashMap<>();
        for (int i = 11; i >= 0; i--) {
            LocalDateTime monthStart = LocalDateTime.now().minusMonths(i).withDayOfMonth(1);
            LocalDateTime monthEnd = monthStart.plusMonths(1).minusDays(1);

            long subscriptionsInMonth = allSubscriptions.stream()
                    .filter(sub -> sub.getCreatedAt() != null
                            && !sub.getCreatedAt().isBefore(monthStart)
                            && !sub.getCreatedAt().isAfter(monthEnd))
                    .count();

            monthlyTrend.put(monthStart.getMonth().name(), subscriptionsInMonth);
        }

        subscriptionStats.put("total", allSubscriptions.size());
        subscriptionStats.put("statusBreakdown", statusBreakdown);
        subscriptionStats.put("totalRevenue", totalRevenue);
        subscriptionStats.put("monthlyTrend", monthlyTrend);

        return subscriptionStats;
    }

    /**
     * Thống kê theo thời gian (Trends)
     */
    public Map<String, Object> getTrendStatistics(int days, String period) {
        Map<String, Object> trendStats = new HashMap<>();
        LocalDate endDate = LocalDate.now();
        LocalDate startDate = endDate.minusDays(days);

        // User registration trend
        List<Members> newMembers = membersRepository.findAll().stream()
                .filter(member -> member.getCreatedAt() != null
                        && !member.getCreatedAt().toLocalDate().isBefore(startDate))
                .collect(Collectors.toList());

        Map<String, Long> registrationTrend = newMembers.stream()
                .collect(Collectors.groupingBy(
                        member -> member.getCreatedAt().toLocalDate().toString(),
                        Collectors.counting()
                ));

        // Appointment completion trend
        List<Appointment> completedAppointments = appointmentRepository.findAll().stream()
                .filter(apt -> apt.getAppointmentDate() != null
                        && !apt.getAppointmentDate().isBefore(startDate)
                        && apt.getStatus() == AppointmentEnum.COMPLETED)
                .collect(Collectors.toList());

        Map<String, Long> completionTrend = completedAppointments.stream()
                .collect(Collectors.groupingBy(
                        apt -> apt.getAppointmentDate().toString(),
                        Collectors.counting()
                ));

        trendStats.put("period", period);
        trendStats.put("days", days);
        trendStats.put("registrationTrend", registrationTrend);
        trendStats.put("completionTrend", completionTrend);

        return trendStats;
    }

    /**
     * Top performers (Coaches, Active Members)
     */
    public Map<String, Object> getTopPerformers() {
        Map<String, Object> performers = new HashMap<>();

        // Top coaches by completed appointments
        List<Map<String, Object>> topCoaches = coachRepository.findAll().stream()
                .map(coach -> {
                    long completedAppointments = appointmentRepository.findAll().stream()
                            .filter(apt -> apt.getCoach() != null
                                    && apt.getCoach().getId().equals(coach.getId())
                                    && apt.getStatus() == AppointmentEnum.COMPLETED)
                            .count();

                    Map<String, Object> coachInfo = new HashMap<>();
                    coachInfo.put("id", coach.getId());
                    coachInfo.put("name", coach.getName());
                    coachInfo.put("specialization", coach.getSpecialization());
                    coachInfo.put("completedAppointments", completedAppointments);
                    coachInfo.put("isActive", coach.isActive());
                    return coachInfo;
                })
                .sorted((a, b) -> Long.compare((Long) b.get("completedAppointments"), (Long) a.get("completedAppointments")))
                .limit(10)
                .collect(Collectors.toList());

        // Most active members (by daily process entries)
        List<Map<String, Object>> activeMembers = membersRepository.findAll().stream()
                .map(member -> {
                    long dailyProcessCount = dailyProcessRepository.countByMember_MemberID(member.getMemberID());

                    Map<String, Object> memberInfo = new HashMap<>();
                    memberInfo.put("id", member.getMemberID());
                    memberInfo.put("name", member.getName());
                    memberInfo.put("daysSmokeFree", dailyProcessCount);
                    memberInfo.put("isActive", member.isActive());
                    return memberInfo;
                })
                .sorted((a, b) -> Long.compare((Long) b.get("daysSmokeFree"), (Long) a.get("daysSmokeFree")))
                .limit(10)
                .collect(Collectors.toList());

        performers.put("topCoaches", topCoaches);
        performers.put("activeMembers", activeMembers);

        return performers;
    }

    /**
     * Activity heatmap data
     */
    public Map<String, Object> getActivityHeatmap(LocalDate startDate, LocalDate endDate) {
        final LocalDate finalStartDate = startDate != null ? startDate : LocalDate.now().minusMonths(3);
        final LocalDate finalEndDate = endDate != null ? endDate : LocalDate.now();

        Map<String, Object> heatmapData = new HashMap<>();

        // Daily process submissions heatmap
        List<DailyProcess> dailyProcesses = dailyProcessRepository.findAll().stream()
                .filter(dp -> dp.getDate() != null
                        && !dp.getDate().toLocalDate().isBefore(finalStartDate)
                        && !dp.getDate().toLocalDate().isAfter(finalEndDate))
                .collect(Collectors.toList());

        Map<String, Long> dailyActivity = dailyProcesses.stream()
                .collect(Collectors.groupingBy(
                        dp -> dp.getDate().toLocalDate().toString(),
                        Collectors.counting()
                ));

        // Appointment activity heatmap
        List<Appointment> appointments = appointmentRepository.findAll().stream()
                .filter(apt -> apt.getCreateAt() != null
                        && !apt.getCreateAt().isBefore(finalStartDate)
                        && !apt.getCreateAt().isAfter(finalEndDate))
                .collect(Collectors.toList());

        Map<String, Long> appointmentActivity = appointments.stream()
                .collect(Collectors.groupingBy(
                        apt -> apt.getCreateAt().toString(),
                        Collectors.counting()
                ));

        heatmapData.put("period", Map.of("startDate", finalStartDate, "endDate", finalEndDate));
        heatmapData.put("dailyProcessActivity", dailyActivity);
        heatmapData.put("appointmentActivity", appointmentActivity);

        return heatmapData;
    }
}