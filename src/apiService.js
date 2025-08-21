import axios from "axios";
const API_BASE_URL = "http://localhost:8080/api";

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token if available
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear user data and redirect to login
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

class ApiService {
  // Authentication
  static async login(credentials) {
    const response = await apiClient.post("/login", credentials);
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
    return response.data;
  }

  static async logout() {
    try {
      await apiClient.post("/logout");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  }

  // User Profile
  static async getUserProfile(userId) {
    const response = await apiClient.get(`/users/${userId}`);
    return response.data;
  }

  static async updateUserProfile(userId, profileData) {
    const response = await apiClient.put(`/users/${userId}`, profileData);
    return response.data;
  }

  // Health Metrics
  static async getHealthMetrics(userId) {
    const response = await apiClient.get(`/health-metrics?userId=${userId}`);
    return response.data;
  }

  static async getLungCancerRisk(userId) {
    const response = await apiClient.get(
      `/health-metrics/risk/lung-cancer?userId=${userId}`
    );
    return response.data;
  }

  static async getHeartDiseaseRisk(userId) {
    const response = await apiClient.get(
      `/health-metrics/risk/heart-disease?userId=${userId}`
    );
    return response.data;
  }

  static async getDaysSmokeFree(userId) {
    const response = await apiClient.get(
      `/health-metrics/days-free?userId=${userId}`
    );
    return response.data;
  }

  static async getMoneySaved(userId) {
    const response = await apiClient.get(
      `/health-metrics/money-saved?userId=${userId}`
    );
    return response.data;
  }

  static async getHealthImproved(userId) {
    const response = await apiClient.get(
      `/health-metrics/percent/health-improved?userId=${userId}`
    );
    return response.data;
  }

  static async getHealthImprovementRate(userId) {
    const response = await apiClient.get(
      `/health-metrics/health-improvement-rate?userId=${userId}`
    );
    return response.data;
  }

  // Daily Check-in
  static async submitDailyCheckIn(userId, dailyProcessData) {
    const response = await apiClient.post("/daily-process", {
      userId,
      ...dailyProcessData,
    });
    return response.data;
  }

  // Forgot Password
  static async forgotPassword(email) {
    const response = await apiClient.post("/forgot-password", { email });
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
    return response.data;
  }

  // Reset Password
  static async resetPassword(token, newPassword) {
    const response = await apiClient.post("/reset-password", {
      token,
      newPassword,
    });
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
    return response.data;
  }

  static async getAdminList() {
    const response = await apiClient.get("/members/admin/list");
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
    return response.data;
  }

  // Coach APIs
  static async getCoaches() {
    const response = await apiClient.get("/coaches");
    return response.data;
  }

  static async getAllCoaches() {
    const response = await apiClient.get("/coaches");
    return response.data;
  }

  static async createCoach(coachData) {
    const response = await apiClient.post("/coaches", coachData);
    return response.data;
  }

  static async getCoachesDashboard() {
    const response = await apiClient.get("/coaches/dashboard");
    return response.data;
  }

  static async getCoachById(coachId) {
    const response = await apiClient.get(`/coaches/${coachId}`);
    return response.data;
  }

  static async getCoachProfile(coachId) {
    const response = await apiClient.get(`/coaches/${coachId}/profile`);
    return response.data;
  }

  static async getCoachDashboard() {
    const response = await apiClient.get("/coaches/dashboard");
    return response.data;
  }

  static async updateCoachProfile(coachId, profileData) {
    const response = await apiClient.put(`/coaches/${coachId}`, profileData);
    return response.data;
  }

  // Edit coach by admin
  static async editCoach(coachId, coachData) {
    const response = await apiClient.put(
      `/coaches/admin/${coachId}/edit`,
      coachData
    );
    return response.data;
  }

  // Appointment APIs
  static async createAppointment(appointmentData) {
    const response = await apiClient.post(
      "/appointment/api/members/appoiment/",
      appointmentData
    );
    return response.data;
  }

  // New member booking API with correct endpoint and format
  static async bookAppointment(bookingData) {
    const response = await apiClient.post(
      "/appointment/members/appointment",
      bookingData
    );
    return response.data;
  }

  static async getUpcomingAppointments(coachId) {
    const response = await apiClient.get(
      `/appointment/upcoming/coach/${coachId}`
    );
    return response.data;
  }

  // Get booked appointments for a coach
  static async getBookedAppointments(coachId, fromDate, toDate) {
    const response = await apiClient.get(
      `/appointment/booked/coach/${coachId}?from=${fromDate}&to=${toDate}`
    );
    return response.data;
  }

  // Complete an appointment
  static async completeAppointment(appointmentId) {
    const response = await apiClient.post(
      `/appointment/${appointmentId}/complete`
    );
    return response.data;
  }

  // Cancel an appointment
  static async cancelAppointment(appointmentId) {
    const response = await apiClient.post(
      `/appointment/${appointmentId}/cancel`
    );
    return response.data;
  }

  // Slot APIs (if needed for booking)
  static async getAvailableSlots() {
    const response = await apiClient.get("/slot");
    return response.data;
  }

  static async registerSlot(slotData) {
    const response = await apiClient.post("/slot/register", slotData);
    return response.data;
  }

  static async getRegisteredSlots() {
    const response = await apiClient.get("/slot/registered");
    return response.data;
  }

  // Daily Process APIs
  static async getDailyProcess(memberId) {
    const response = await apiClient.get(`/daily-process/member/${memberId}`);
    return response.data;
  }

  static async getMilestoneData(memberId) {
    const response = await apiClient.get(
      `/daily-process/member/${memberId}/milestone-simple`
    );
    return response.data;
  }

  static async submitDailyProgress(memberId, dailyProgressData) {
    const response = await apiClient.post(
      `/daily-process/member/${memberId}/submit`,
      dailyProgressData
    );
    return response.data;
  }

  static async getDailyProcessByDate(memberId, date) {
    const response = await apiClient.get(
      `/daily-process/member/${memberId}/date/${date}`
    );
    return response.data;
  }

  static async getDailyProcessRange(memberId, startDate, endDate) {
    const response = await apiClient.get(
      `/daily-process/member/${memberId}/range?startDate=${startDate}&endDate=${endDate}`
    );
    return response.data;
  }

  static async deleteDailyProcess(processId) {
    const response = await apiClient.delete(`/daily-process/${processId}`);
    return response.data;
  }

  // Rating/Feedback APIs
  static async submitRating(ratingData) {
    const response = await apiClient.post("/rating", ratingData);
    return response.data;
  }

  static async submitCoachRating(ratingData) {
    const response = await apiClient.post("/rating/coach", ratingData);
    return response.data;
  }

  static async getCompletedAppointments(memberId) {
    const response = await apiClient.get(
      `/rating/appointments/completed?memberId=${memberId}`
    );
    return response.data;
  }

  static async getCoachRatings(coachId) {
    const response = await apiClient.get(`/rating/coach/${coachId}`);
    return response.data;
  }

  // Weekly Schedule API
  static async getWeeklySchedule(fromDate, toDate, coachId = null) {
    let url = `/appointment/weekly-schedule?from=${fromDate}&to=${toDate}`;
    if (coachId) {
      url += `&coachId=${coachId}`;
    }
    const response = await apiClient.get(url);
    return response.data;
  }

  // Appointment Status Management APIs
  static async confirmAppointment(appointmentId) {
    console.log(
      `Calling POST ${API_BASE_URL}/appointment/${appointmentId}/confirm`
    );
    const response = await apiClient.post(
      `/appointment/${appointmentId}/confirm`
    );
    console.log("Confirm appointment response:", response.data);
    return response.data;
  }

  static async rejectAppointment(appointmentId) {
    console.log(
      `Calling POST ${API_BASE_URL}/appointment/${appointmentId}/reject`
    );
    const response = await apiClient.post(
      `/appointment/${appointmentId}/reject`
    );
    console.log("Reject appointment response:", response.data);
    return response.data;
  }

  // Membership Plans APIs
  static async getMembershipPlans() {
    const response = await apiClient.get("/membership-plans");
    return response.data;
  }

  static async createMembershipPlan(planData) {
    const response = await apiClient.post("/membership-plans", planData);
    return response.data;
  }

  static async updateMembershipPlan(planId, planData) {
    const response = await apiClient.put(
      `/membership-plans/admin/${planId}`,
      planData
    );
    return response.data;
  }

  static async deleteMembershipPlan(planId) {
    const response = await apiClient.delete(
      `/membership-plans/admin/${planId}`
    );
    return response.data;
  }

  static async buyMembershipPlan(packageId) {
    const response = await apiClient.post(`/membership-plans/buy/${packageId}`);
    return response.data;
  }

  static async createPayment(paymentData) {
    const response = await apiClient.post("/payment", paymentData);
    return response.data;
  }

  // Ratings APIs
  static async getRatingsAdmin() {
    const response = await apiClient.get("/rating/admin/all");
    return response.data;
  }

  // Member APIs
  static async getMemberById(memberId) {
    const response = await apiClient.get(`/members/${memberId}`);
    return response.data;
  }

  static async updateMemberProfile(memberId, memberData) {
    const response = await apiClient.put(
      `/members/${memberId}/edit-profile`,
      memberData
    );
    return response.data;
  }

  // Quit Plans API
  static async createQuitPlan(memberId, quitPlanData) {
    const response = await apiClient.post(
      `/quit-plans/member/${memberId}`,
      quitPlanData
    );
    return response.data;
  }

  static async getQuitPlan(memberId) {
    const response = await apiClient.get(`/quit-plans/member/${memberId}`);
    return response.data;
  }

  static async updateQuitPlan(memberId, quitPlanData) {
    const response = await apiClient.put(
      `/quit-plans/member/${memberId}`,
      quitPlanData
    );
    return response.data;
  }

  // Coach Schedule APIs
  static async registerWeekSchedule(scheduleData) {
    const response = await apiClient.post(
      "/appointment/work/register-week",
      scheduleData
    );
    return response.data;
  }

  static async getCoachScheduleStatus(fromDate, toDate, coachId = null) {
    let url = `/appointment/coach/schedule-status?from=${fromDate}&to=${toDate}`;
    if (coachId) {
      url += `&coachId=${coachId}`;
    }
    const response = await apiClient.get(url);
    return response.data;
  }

  static async getPendingApprovalSchedules(fromDate, toDate, coachId = null) {
    let url = `/appointment/pending-approval?from=${fromDate}&to=${toDate}`;
    if (coachId) {
      url += `&coachId=${coachId}`;
    }
    const response = await apiClient.get(url);
    return response.data;
  }

  // Available Schedules API for users to view coach availability
  static async getAvailableSchedules(fromDate, toDate, coachId = null) {
    let url = `/appointment/available-schedules?from=${fromDate}&to=${toDate}`;
    if (coachId) {
      url += `&coachId=${coachId}`;
    }
    const response = await apiClient.get(url);
    return response.data;
  }

  // Admin Reminder APIs
  static async sendReminderToAllMembers(content) {
    const response = await apiClient.post("/admin/reminders/all-members", {
      content: content,
    });
    return response.data;
  }

  // Admin Statistics APIs
  static async getAdminOverview() {
    const response = await apiClient.get("/admin/statistics/overview");
    return response.data;
  }

  static async getAdminDashboard(startDate = null, endDate = null) {
    let url = "/admin/statistics/dashboard";
    const params = new URLSearchParams();

    if (startDate) {
      params.append("startDate", startDate);
    }
    if (endDate) {
      params.append("endDate", endDate);
    }

    if (params.toString()) {
      url += `?${params.toString()}`;
    }

    const response = await apiClient.get(url);
    return response.data;
  }

  // Create meeting after appointment booking
  static async createMeet(appointmentId) {
    const response = await apiClient.post(`/calendar/events/create-meet/${appointmentId}`);
    return response.data;
  }

  // Account Membership API
  static async getAccountMembership(accountId) {
    const response = await apiClient.get(`/account/${accountId}/membership`);
    return response.data;
  }
    // Upload avatar for coach
    static async uploadCoachAvatar(coachId, formData) {
      const response = await apiClient.post(
        `/coaches/${coachId}/avatar`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    }  
}

export default ApiService;
