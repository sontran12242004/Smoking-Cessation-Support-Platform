import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../UserContext";
import ApiService from "../apiService";
import journeyPath from "../assets/journey_path.jpg";

const EliteBookAppointment = (props) => {
  const { user } = useUser();
  const location = useLocation();
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [selectedSlotId, setSelectedSlotId] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [meetingLink, setMeetingLink] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // API States
  const [availableSlots, setAvailableSlots] = useState([]);
  const [availableSchedules, setAvailableSchedules] = useState([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [bookedDates, setBookedDates] = useState([]);
  const [scheduleFromDate, setScheduleFromDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });
  const [scheduleToDate, setScheduleToDate] = useState(() => {
    const today = new Date();
    const nextMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      today.getDate()
    );
    return nextMonth.toISOString().split("T")[0];
  });

  // Lấy coachData từ props hoặc từ location.state
  const coachData =
    props.coachData ||
    (location.state && location.state.selectedCoach) ||
    (location.state && location.state.coachData);

  // Load data from APIs
  useEffect(() => {
    const loadAppointmentData = async () => {
      if (!coachData?.id) return;

      try {
        setLoading(true);

        // Fetch available slots
        const slotsData = await ApiService.getAvailableSlots();
        setAvailableSlots(Array.isArray(slotsData) ? slotsData : []);

        // Fetch available schedules
        const schedulesResponse = await ApiService.getAvailableSchedules(
          scheduleFromDate,
          scheduleToDate,
          coachData.id
        );

        // Parse the new API response format
        let parsedSchedules = [];
        if (
          schedulesResponse &&
          schedulesResponse.days &&
          Array.isArray(schedulesResponse.days)
        ) {
          parsedSchedules = schedulesResponse.days.flatMap((day) => {
            if (!day.appointments || !Array.isArray(day.appointments)) {
              return [];
            }

            return day.appointments.map((appointment) => ({
              id: appointment.id,
              date: convertDateArrayToDate(day.date),
              timeSlot: appointment.time,
              time: appointment.time,
              coachId: appointment.coachId,
              coachName: appointment.coachName,
              specialization: appointment.specialization,
              status: appointment.canBook ? "AVAILABLE" : "UNAVAILABLE",
              canBook: appointment.canBook,
              originalStatus: appointment.status,
              week: schedulesResponse.week,
            }));
          });
        }

        setAvailableSchedules(parsedSchedules);

        // Fetch upcoming appointments for coach
        const appointmentsData = await ApiService.getUpcomingAppointments(
          coachData.id
        );
        setUpcomingAppointments(
          Array.isArray(appointmentsData) ? appointmentsData : []
        );

        // Extract booked dates from appointments
        const bookedDatesList = (
          Array.isArray(appointmentsData) ? appointmentsData : []
        )
          .map((appointment) => appointment.appointmentDate)
          .filter((date) => date);
        setBookedDates(bookedDatesList);
      } catch (err) {
        console.error("Error loading appointment data:", err);
        setError("Failed to load appointment data");
      } finally {
        setLoading(false);
      }
    };

    loadAppointmentData();
  }, [coachData?.id, scheduleFromDate, scheduleToDate]);

  // Helper function to format time from API format
  const formatTimeFromArray = (timeArray) => {
    if (!Array.isArray(timeArray) || timeArray.length < 2) return "";
    const [hour, minute] = timeArray;
    const period = hour >= 12 ? "PM" : "AM";
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${displayHour}:${minute.toString().padStart(2, "0")} ${period}`;
  };

  // Helper function to convert time slot number to readable format (for available schedules)
  const getTimeSlotFromNumber = (timeSlot) => {
    // Starting from 9:00 AM, each slot is 45 minutes
    const baseMinutes = 9 * 60; // 9:00 AM in minutes
    const slotDurationMinutes = 45;

    const startMinutes = baseMinutes + (timeSlot - 1) * slotDurationMinutes;
    const endMinutes = startMinutes + slotDurationMinutes;

    const formatTime = (totalMinutes) => {
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      const period = hours >= 12 ? "PM" : "AM";
      const displayHour = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
      return `${displayHour}:${minutes.toString().padStart(2, "0")} ${period}`;
    };

    return `${formatTime(startMinutes)} - ${formatTime(endMinutes)}`;
  };

  // Helper function to convert date array [2025, 7, 9] to Date object
  const convertDateArrayToDate = (dateArray) => {
    if (!Array.isArray(dateArray) || dateArray.length < 3) {
      return new Date();
    }
    const [year, month, day] = dateArray;
    // Month in Date constructor is 0-based, but API seems to provide 1-based
    return new Date(year, month - 1, day);
  };

  // Helper function to check if a time slot is in the past
  const isTimeSlotInPast = (date, timeSlot) => {
    const now = new Date();
    const slotDateTime = new Date(date);

    let hours, minutes;
    if (typeof timeSlot === "number") {
      // Convert time slot number to exact time (starting from 9:00 AM, 45 min slots)
      const baseMinutes = 9 * 60; // 9:00 AM in minutes
      const slotDurationMinutes = 45;
      const startMinutes = baseMinutes + (timeSlot - 1) * slotDurationMinutes;

      hours = Math.floor(startMinutes / 60);
      minutes = startMinutes % 60;
    } else {
      // For legacy slots with time strings, extract hour from time string
      const timeStr = timeSlot;
      const timeMatch = timeStr.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
      if (timeMatch) {
        let timeHour = parseInt(timeMatch[1]);
        const timeMinute = parseInt(timeMatch[2]);
        const period = timeMatch[3].toUpperCase();
        if (period === "PM" && timeHour !== 12) timeHour += 12;
        if (period === "AM" && timeHour === 12) timeHour = 0;
        hours = timeHour;
        minutes = timeMinute;
      } else {
        return false; // Can't parse time, assume not past
      }
    }

    slotDateTime.setHours(hours, minutes, 0, 0);
    return slotDateTime < now;
  };

  // Generate time slots based on available schedules and selected date
  const getTimeSlotsForDate = (date) => {
    const dateStr = date.toISOString().slice(0, 10); // YYYY-MM-DD format

    // First priority: Use available schedules from new API
    if (availableSchedules.length > 0) {
      const schedulesForDate = availableSchedules.filter((schedule) => {
        // Check if schedule matches the selected date
        if (schedule.date) {
          const scheduleDate = new Date(schedule.date)
            .toISOString()
            .slice(0, 10);
          return scheduleDate === dateStr;
        }
        return false;
      });

      if (schedulesForDate.length > 0) {
        return schedulesForDate
          .filter((schedule) => {
            // Filter out past time slots
            return !isTimeSlotInPast(date, schedule.timeSlot);
          })
          .map((schedule, index) => ({
            id: schedule.id || `schedule-${index}`,
            time: schedule.timeSlot
              ? getTimeSlotFromNumber(schedule.timeSlot)
              : "Time TBD",
            label: `Slot ${schedule.timeSlot || "TBD"}`,
            available: schedule.canBook && schedule.status === "AVAILABLE",
            scheduleData: schedule,
            source: "available-schedules",
            appointmentId: schedule.id,
            coachName: schedule.coachName,
            specialization: schedule.specialization,
          }));
      }
    }

    // Second priority: If we have API slots data, use it
    if (availableSlots.length > 0) {
      return availableSlots
        .filter((slot) => !slot.delete) // Filter out deleted slots
        .filter((slot) => {
          // Filter out past time slots
          const startTime = formatTimeFromArray(slot.start);
          return !isTimeSlotInPast(date, startTime);
        })
        .map((slot) => {
          const startTime = formatTimeFromArray(slot.start);
          const endTime = formatTimeFromArray(slot.end);
          const timeRange = `${startTime} - ${endTime}`;

          // Check if slot is booked by checking accountSlots
          const isSlotBooked =
            Array.isArray(slot.accountSlots) && slot.accountSlots.length > 0;
          const isDateBooked = bookedDates.includes(dateStr);

          return {
            id: slot.id,
            time: timeRange,
            label: slot.label,
            available: !isSlotBooked && !isDateBooked,
            start: slot.start,
            end: slot.end,
            source: "legacy-slots",
          };
        });
    }

    // Default fallback slots if no API data - 9:00 AM to 4:30 PM, 45-min slots (10 slots)
    const defaultSlots = [
      { id: 1, time: "9:00 AM - 9:45 AM", available: true },
      { id: 2, time: "9:45 AM - 10:30 AM", available: true },
      { id: 3, time: "10:30 AM - 11:15 AM", available: true },
      { id: 4, time: "11:15 AM - 12:00 PM", available: true },
      { id: 5, time: "12:00 PM - 12:45 PM", available: true },
      { id: 6, time: "12:45 PM - 1:30 PM", available: true },
      { id: 7, time: "1:30 PM - 2:15 PM", available: true },
      { id: 8, time: "2:15 PM - 3:00 PM", available: true },
      { id: 9, time: "3:00 PM - 3:45 PM", available: true },
      { id: 10, time: "3:45 PM - 4:30 PM", available: true },
    ];

    // Mark default slots as unavailable if date is booked and filter out past slots
    return defaultSlots
      .filter((slot) => {
        // Filter out past time slots
        return !isTimeSlotInPast(date, slot.time);
      })
      .map((slot) => ({
        ...slot,
        available: slot.available && !bookedDates.includes(dateStr),
        source: "fallback",
      }));
  };

  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const renderCalendar = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const numDays = daysInMonth(year, month);
    const startDay = firstDayOfMonth(year, month);

    const calendarDays = [];
    for (let i = 0; i < startDay; i++) {
      calendarDays.push(
        <td key={`empty-start-${i}`} style={styles.calendarCellEmpty}></td>
      );
    }

    for (let day = 1; day <= numDays; day++) {
      const currentDate = new Date(year, month, day);
      const isToday = currentDate.toDateString() === new Date().toDateString();
      const isSelected =
        currentDate.toDateString() === selectedDate.toDateString();
      const isPast = currentDate < new Date().setHours(0, 0, 0, 0);
      // Ngày đã có người đặt
      const dateStr = currentDate.toISOString().slice(0, 10); // 'YYYY-MM-DD'
      const isBooked = bookedDates.includes(dateStr);

      let cellStyle = { ...styles.calendarCell };
      if (!isToday)
        cellStyle = { ...cellStyle, color: "#222", background: "none" };
      if (isSelected)
        cellStyle = { ...cellStyle, backgroundColor: "#2E7D32", color: "#fff" };
      if (isBooked)
        cellStyle = {
          ...cellStyle,
          color: "red",
          textDecoration: "line-through",
          fontWeight: 600,
          cursor: "not-allowed",
        };
      if (isPast)
        cellStyle = { ...cellStyle, opacity: 0.6, cursor: "not-allowed" };

      calendarDays.push(
        <td
          key={day}
          style={cellStyle}
          onClick={() => !isBooked && !isPast && setSelectedDate(currentDate)}
        >
          {day}
        </td>
      );
    }

    const rows = [];
    let cells = [];
    calendarDays.forEach((day, i) => {
      cells.push(day);
      if (i % 7 === 6 || i === calendarDays.length - 1) {
        rows.push(<tr key={rows.length}>{cells}</tr>);
        cells = [];
      }
    });
    return rows;
  };

  const handleMonthChange = (direction) => {
    setSelectedDate((prev) => {
      const newMonth = prev.getMonth() + direction;
      const newDate = new Date(prev.getFullYear(), newMonth, 1);
      return newDate;
    });
  };

  const formatSelectedDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const handleNotificationClick = () => {
    navigate("/elitenotificationcenter");
  };

  const handleConfirm = async () => {
    if (!selectedTimeSlot || !coachData || !user || !user.userId) {
      setError("Please select a time slot and ensure you are logged in");
      return;
    }

    // Get slot data to determine booking method
    const timeSlotsForDate = getTimeSlotsForDate(selectedDate);
    const selectedSlotData = timeSlotsForDate.find(
      (slot) => slot.time === selectedTimeSlot
    );

    // Additional validation for new API booking
    if (
      selectedSlotData?.source === "available-schedules" &&
      !selectedSlotData?.appointmentId
    ) {
      setError(
        "Invalid appointment data. Please try selecting a different time slot."
      );
      return;
    }

    // Additional validation for legacy API booking
    if (selectedSlotData?.source !== "available-schedules" && !selectedSlotId) {
      setError("Please select a valid time slot");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      let response;

      // Check if this is from available schedules (new API) or legacy
      if (
        selectedSlotData?.source === "available-schedules" &&
        selectedSlotData?.appointmentId
      ) {
        // Use new booking API with correct format
        const bookingData = {
          appointmentId: selectedSlotData.appointmentId,
          memberId: user.userId,
          appointmentDate: selectedDate.toISOString().slice(0, 10), // YYYY-MM-DD format
          coachId: coachData.id,
          slotId:
            selectedSlotData.scheduleData?.timeSlot ||
            selectedSlotData.timeSlot,
        };

        console.log("Using new booking API with data:", bookingData);
        console.log("Selected slot data:", selectedSlotData);

        response = await ApiService.bookAppointment(bookingData);
        console.log("New booking API response:", response);
      } else {
        // Fallback to legacy appointment creation API
        const appointmentData = {
          memberId: user.userId,
          slotId: selectedSlotId,
          coachId: coachData.id,
          appointmentDate: selectedDate.toISOString().slice(0, 10), // YYYY-MM-DD format
          memberName: user.fullName || user.name || user.email || "Unknown",
          servicesId: [1], // Default service ID, adjust as needed
          createAt: new Date().toISOString().slice(0, 10),
          status: "PENDING",
        };

        console.log("Using legacy appointment API with data:", appointmentData);
        console.log("Selected slot data:", selectedSlotData);
        console.log("Time slots for date:", timeSlotsForDate);

        response = await ApiService.createAppointment(appointmentData);
        console.log("Legacy appointment API response:", response);
      }

      // Save booking to localStorage for UI consistency
      const booking = {
        id:
          response.id ||
          response.appointmentId ||
          selectedSlotData?.appointmentId ||
          `${user.userId}-${selectedSlotId}`,
        memberId: user.userId,
        slotId: selectedSlotData?.appointmentId || selectedSlotId,
        coachId: coachData.id,
        date: formatSelectedDate(selectedDate),
        dateISO: selectedDate.toISOString(),
        appointmentDate: selectedDate.toISOString().slice(0, 10),
        time: selectedTimeSlot,
        coach: coachData,
        memberName: user.fullName || user.name || user.email || "Unknown",
        status: response.status || "PENDING",
        bookingMethod:
          selectedSlotData?.source === "available-schedules"
            ? "new-api"
            : "legacy-api",
        appointmentId: selectedSlotData?.appointmentId || null,
      };
      localStorage.setItem("elite_booking_history", JSON.stringify(booking));

      setBookingSuccess(true);

      // Show success message with booking method info
      console.log(`Booking successful using ${booking.bookingMethod} method!`);

      // Create meeting after successful booking
      try {
        const appointmentId =
          response.id ||
          response.appointmentId ||
          selectedSlotData?.appointmentId;
        if (appointmentId) {
          console.log(`Creating meeting for appointment ID: ${appointmentId}`);
          const meetingResponse = await ApiService.createMeet(appointmentId);
          console.log("Meeting created successfully:", meetingResponse);

          // Extract meeting link from response
          let meetingUrl = null;

          if (typeof meetingResponse === "string") {
            // If response is a string like "Google Meet link: https://meet.google.com/tty-odvd-amj"
            const urlMatch = meetingResponse.match(
              /https:\/\/meet\.google\.com\/[a-z-]+/i
            );
            if (urlMatch) {
              meetingUrl = urlMatch[0];
            }
          } else if (typeof meetingResponse === "object" && meetingResponse) {
            // If response is an object, try different property names
            meetingUrl =
              meetingResponse.meetingUrl ||
              meetingResponse.url ||
              meetingResponse.meetingLink ||
              meetingResponse.link;
          }

          if (meetingUrl) {
            setMeetingLink(meetingUrl);
            console.log("Meeting link extracted:", meetingUrl);
          } else {
            console.warn(
              "Could not extract meeting link from response:",
              meetingResponse
            );
          }
        } else {
          console.warn("No appointment ID found, skipping meeting creation");
        }
      } catch (meetError) {
        console.error("Error creating meeting:", meetError);
        // Don't fail the booking if meeting creation fails
        // Just log the error and continue
      }

      // Don't auto-navigate, let user stay to view the meeting link
      // setTimeout(() => {
      //   navigate("/elite/coach");
      // }, 2000);
    } catch (err) {
      console.error("Error creating appointment:", err);
      setError(
        err.response?.data?.message ||
          "Failed to create appointment. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="elite-home-container">
      <style>{`
        .elite-home-container {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          font-family: Arial, sans-serif;
          background-color: #f0f2f5;
        }
        .welcome-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 40px;
          background-color: #fff;
          border-bottom: 1px solid #d0e8ef;
        }
        .header-left, .header-right {
          display: flex;
          align-items: center;
          gap: 15px;
        }
        .profile-btn {
          display: flex;
          align-items: center;
          background-color: #4CAF50;
          color: #fff;
          border: none;
          border-radius: 999px;
          padding: 8px 22px 8px 15px;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s, box-shadow 0.2s, transform 0.15s;
          box-shadow: 0 2px 8px rgba(76,175,80,0.10);
          outline: none;
        }
        .profile-btn:hover {
          background-color: #388E3C;
          transform: translateY(-2px) scale(1.04);
          box-shadow: 0 4px 16px rgba(76,175,80,0.18);
        }
        .profile-icon {
          color: #5B2A99;
          font-size: 20px;
          margin-right: 8px;
        }
        .header-center .logo-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
        }
        .header-center .app-name {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .header-center .logo {
          font-size: 24px;
          font-weight: bold;
          color: #333;
          margin-right: 10px;
        }
        .header-center .app-name h1 {
          margin: 0;
          font-size: 24px;
          color: #4CAF50;
        }
        .header-center .app-name p {
          margin: 0;
          font-size: 14px;
          color: #666;
        }
        .notification-icon {
          font-size: 24px;
          color: #f39c12;
          cursor: pointer;
        }
        .logout-button {
          background-color: #4CAF50;
          color: #fff;
          border: none;
          padding: 8px 15px;
          border-radius: 5px;
          cursor: pointer;
          font-size: 14px;
          transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.2s ease;
        }
        .logout-button:hover {
          background-color: #45a049;
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
        .elite-nav {
          background-color: #fff;
          padding: 10px 0;
          border-bottom: 1px solid #eee;
        }
        .elite-nav ul {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          justify-content: center;
          gap: 40px;
        }
        .elite-nav a {
          text-decoration: none;
          color: #5EBB34;
          font-weight: 400;
          font-size: 16px;
          padding: 5px 0;
          position: relative;
          transition: color 0.3s;
        }
        .elite-nav a::after {
          content: '';
          display: block;
          position: absolute;
          left: 0;
          bottom: -2px;
          width: 100%;
          height: 3px;
          background: #5EBB34;
          border-radius: 2px;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s cubic-bezier(0.4,0,0.2,1);
          z-index: 1;
        }
        .elite-nav a:hover::after, .elite-nav a:focus::after, .elite-nav a.active::after {
          transform: scaleX(1);
        }
        .main-content-elite {
          flex-grow: 1;
          padding: 20px;
        }
        .elite-footer {
          background-color: #333; 
          color: #fff;
          padding: 30px 20px;
          text-align: center;
          font-size: 14px;
        }
        .footer-content {
          display: flex;
          justify-content: space-around;
          align-items: flex-start;
          max-width: 1200px;
          margin: 0 auto 20px auto;
          text-align: left;
          flex-wrap: wrap;
        }
        .footer-column {
          flex: 1;
          min-width: 200px;
          padding: 10px;
        }
        .footer-column h3 {
          font-size: 18px;
          margin-bottom: 15px;
          color: #4CAF50; /* Keep green color */
        }
        .footer-column p, .footer-column a {
          font-size: 14px;
          color: #ccc;
          text-decoration: none;
          display: block;
          margin-bottom: 8px;
        }
        .footer-column a:hover {
          color: #fff;
        }
        .newsletter-input {
          padding: 8px;
          border: none;
          border-radius: 5px;
          margin-right: 10px;
          width: 150px;
        }
        .newsletter-button {
          background-color: #4CAF50;
          color: #fff;
          border: none;
          padding: 8px 15px;
          border-radius: 5px;
          cursor: pointer;
        }
        .newsletter-button:hover {
          background-color: #45a049;
        }
        .copyright {
          border-top: 1px solid #555;
          padding-top: 15px;
          margin-top: 15px;
        }
      `}</style>
      <header className="welcome-header">
        <div className="header-left">
          <button
            className="profile-btn"
            onClick={() => navigate("/elite/edit-profile")}
          >
            Elite Member
          </button>
        </div>
        <div className="header-center">
          <div className="logo-section">
            <div className="app-name">
              <h1>NicOff</h1>
              <p>Turn Off Nicotine, Turn On Life!</p>
            </div>
          </div>
        </div>
        <div className="header-right">
          <span
            className="notification-icon"
            onClick={() => navigate("/elitenotificationcenter")}
          >
            🔔
          </span>
          <button className="logout-button" onClick={() => navigate("/login")}>
            Logout
          </button>
        </div>
      </header>
      <nav className="elite-nav">
        <ul>
          <li>
            <Link to="/elite/home">Home</Link>
          </li>
          <li>
            <Link to="/elite/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/elite/achievement">Achievement</Link>
          </li>
          <li>
            <Link to="/elite/coach">Coach</Link>
          </li>
          <li>
            <Link to="/elite/community">Community</Link>
          </li>
          <li>
            <Link to="/elite/feedback">Feedback</Link>
          </li>
        </ul>
      </nav>
      <main
        className="main-content-elite"
        style={{
          background: `linear-gradient(rgba(223,245,222,0.85), rgba(223,245,222,0.85)), url(${journeyPath}) center/cover no-repeat`,
          minHeight: "calc(100vh - 220px)",
          padding: "40px 0 0 0",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            minHeight: "70vh",
            width: "100%",
          }}
        >
          <div style={{ maxWidth: 1100, width: "100%" }}>
            <Link to="/elite/coach" style={styles.backButton}>
              ← Back To Coach
            </Link>

            {/* Coach Profile Section */}
            {coachData ? (
              <div style={styles.coachProfileCard}>
                <div style={styles.coachAvatar}>
                  <img
                    src={
                      coachData.avatar
                        ? `http://localhost:8080${coachData.avatar}`
                        : `https://randomuser.me/api/portraits/${
                            coachData.id % 2 === 0 ? "women" : "men"
                          }/${(coachData.id * 7) % 99}.jpg`
                    }
                    alt="Coach Avatar"
                    style={styles.avatarImage}
                  />
                </div>
                <div style={styles.coachInfo}>
                  <h2 style={styles.coachName}>{coachData.name}</h2>
                  <p style={styles.coachSpecialization}>
                    {coachData.title ||
                      coachData.specialization ||
                      "Smoking Cessation Specialist"}
                    {coachData.experience && ` - ${coachData.experience}`}
                  </p>
                  {coachData.bio && (
                    <p style={styles.coachBio}>{coachData.bio}</p>
                  )}
                  {coachData.hourlyRate && (
                    <p
                      style={{
                        ...styles.coachBio,
                        color: "#2E7D32",
                        fontWeight: "bold",
                      }}
                    >
                      Rate: ${coachData.hourlyRate}/hour
                    </p>
                  )}
                  {coachData.certifications && (
                    <p
                      style={{
                        ...styles.coachBio,
                        fontSize: "14px",
                        color: "#666",
                      }}
                    >
                      <strong>Certifications:</strong>{" "}
                      {coachData.certifications}
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div
                style={{
                  color: "#C62828",
                  fontWeight: "bold",
                  margin: "30px 0",
                  textAlign: "center",
                  padding: "20px",
                  backgroundColor: "#ffebee",
                  borderRadius: "8px",
                  border: "1px solid #ffcdd2",
                }}
              >
                ⚠️ No coach selected. Please go back and select a coach first.
                <br />
                <Link
                  to="/elite/coach"
                  style={{
                    color: "#2E7D32",
                    textDecoration: "none",
                    fontWeight: "bold",
                    marginTop: "10px",
                    display: "inline-block",
                  }}
                >
                  ← Back to Coach Selection
                </Link>
              </div>
            )}

            {/* Available Schedules Date Range Controls */}
            {coachData && (
              <div
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "10px",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
                  padding: "20px",
                  marginBottom: "20px",
                }}
              >
                <h3
                  style={{
                    fontSize: "18px",
                    color: "#333",
                    margin: "0 0 15px 0",
                    textAlign: "center",
                  }}
                >
                  Available Schedules Date Range
                </h3>
                <div
                  style={{
                    display: "flex",
                    gap: "16px",
                    alignItems: "center",
                    justifyContent: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <div>
                    <label
                      style={{
                        fontSize: "14px",
                        color: "#555",
                        marginRight: "8px",
                      }}
                    >
                      From:
                    </label>
                    <input
                      type="date"
                      value={scheduleFromDate}
                      onChange={(e) => setScheduleFromDate(e.target.value)}
                      style={{
                        padding: "8px 12px",
                        border: "2px solid #2E7D32",
                        borderRadius: "6px",
                        fontSize: "14px",
                      }}
                    />
                  </div>
                  <div>
                    <label
                      style={{
                        fontSize: "14px",
                        color: "#555",
                        marginRight: "8px",
                      }}
                    >
                      To:
                    </label>
                    <input
                      type="date"
                      value={scheduleToDate}
                      onChange={(e) => setScheduleToDate(e.target.value)}
                      style={{
                        padding: "8px 12px",
                        border: "2px solid #2E7D32",
                        borderRadius: "6px",
                        fontSize: "14px",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#666",
                      textAlign: "center",
                      marginTop: "8px",
                      width: "100%",
                    }}
                  >
                    Available schedules: {availableSchedules.length} time slots
                    found
                    {availableSchedules.length > 0 &&
                      availableSchedules[0].week && (
                        <div
                          style={{
                            fontSize: "11px",
                            color: "#888",
                            marginTop: "4px",
                          }}
                        >
                          Week: {availableSchedules[0].week}
                        </div>
                      )}
                  </div>
                </div>
              </div>
            )}

            {/* Calendar and Time Slots Section */}
            <div style={styles.scheduleContainer}>
              {/* Calendar */}
              <div style={styles.calendarCard}>
                <h3 style={styles.calendarTitle}>Select a Date</h3>
                <div style={styles.calendarNav}>
                  <button
                    onClick={() => handleMonthChange(-1)}
                    style={styles.calendarNavButton}
                  >
                    &lt;
                  </button>
                  <span style={styles.calendarMonthYear}>
                    {selectedDate.toLocaleString("en-US", {
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                  <button
                    onClick={() => handleMonthChange(1)}
                    style={styles.calendarNavButton}
                  >
                    &gt;
                  </button>
                </div>
                <table style={styles.calendarTable}>
                  <thead>
                    <tr style={styles.calendarHeaderRow}>
                      <th style={styles.calendarHeaderCell}>Sun</th>
                      <th style={styles.calendarHeaderCell}>Mon</th>
                      <th style={styles.calendarHeaderCell}>Tue</th>
                      <th style={styles.calendarHeaderCell}>Wed</th>
                      <th style={styles.calendarHeaderCell}>Thu</th>
                      <th style={styles.calendarHeaderCell}>Fri</th>
                      <th style={styles.calendarHeaderCell}>Sat</th>
                    </tr>
                  </thead>
                  <tbody>{renderCalendar()}</tbody>
                </table>
              </div>

              {/* Available Time Slots */}
              <div style={styles.timeSlotsCard}>
                <h3 style={styles.timeSlotsTitle}>Available Time Slots</h3>
                <p style={styles.selectedDateText}>
                  {formatSelectedDate(selectedDate)}
                </p>

                {/* Show loading state */}
                {loading && (
                  <div
                    style={{
                      textAlign: "center",
                      padding: "20px",
                      color: "#666",
                    }}
                  >
                    Loading available slots...
                  </div>
                )}

                <div style={styles.slotsContainer}>
                  {getTimeSlotsForDate(selectedDate).map((slot, index) => (
                    <button
                      key={slot.id || index}
                      style={
                        slot.available
                          ? selectedTimeSlot === slot.time
                            ? styles.timeSlotButtonActive
                            : styles.timeSlotButton
                          : styles.timeSlotButtonDisabled
                      }
                      onClick={() => {
                        if (slot.available) {
                          setSelectedTimeSlot(slot.time);
                          setSelectedSlotId(slot.id);
                        }
                      }}
                      disabled={!slot.available}
                      title={
                        slot.available
                          ? `Available: ${slot.time}`
                          : `Unavailable: ${slot.time}`
                      }
                    >
                      <div>{slot.time}</div>
                      {slot.label && (
                        <div style={{ fontSize: "12px", opacity: 0.8 }}>
                          {slot.label}
                        </div>
                      )}
                      {slot.coachName &&
                        slot.source === "available-schedules" && (
                          <div
                            style={{
                              fontSize: "11px",
                              opacity: 0.7,
                              marginTop: "2px",
                            }}
                          >
                            Coach: {slot.coachName}
                          </div>
                        )}
                      {slot.source && (
                        <div
                          style={{
                            fontSize: "10px",
                            opacity: 0.6,
                            marginTop: "4px",
                          }}
                        >
                          {slot.source === "available-schedules"
                            ? "Real-time"
                            : "Legacy"}
                        </div>
                      )}
                    </button>
                  ))}

                  {/* Show message if no slots available */}
                  {getTimeSlotsForDate(selectedDate).length === 0 &&
                    !loading && (
                      <div
                        style={{
                          textAlign: "center",
                          padding: "20px",
                          color: "#666",
                          fontStyle: "italic",
                        }}
                      >
                        No time slots available for this date
                      </div>
                    )}
                </div>
              </div>
            </div>

            {/* Error Display */}
            {error && (
              <div
                style={{
                  backgroundColor: "#ffebee",
                  color: "#d32f2f",
                  padding: "15px",
                  borderRadius: "8px",
                  margin: "20px 0",
                  border: "1px solid #ffcdd2",
                  textAlign: "center",
                }}
              >
                <strong>Error:</strong> {error}
              </div>
            )}

            {/* Loading Display */}
            {loading && (
              <div
                style={{
                  backgroundColor: "#e3f2fd",
                  color: "#1976d2",
                  padding: "15px",
                  borderRadius: "8px",
                  margin: "20px 0",
                  textAlign: "center",
                }}
              >
                <div>Processing your booking...</div>
              </div>
            )}

            {/* Session Summary dưới scheduleContainer */}
            {selectedTimeSlot && (
              <div style={styles.sessionSummaryCard}>
                <h3 style={styles.sessionSummaryTitle}>Session Summary</h3>
                <p style={styles.summaryDetail}>
                  Date: {formatSelectedDate(selectedDate)}
                </p>
                <p style={styles.summaryDetail}>Time: {selectedTimeSlot}</p>
                {coachData && (
                  <>
                    <p style={styles.summaryDetail}>Coach: {coachData.name}</p>
                    {coachData.hourlyRate && (
                      <p style={styles.summaryDetail}>
                        Rate: ${coachData.hourlyRate}/hour
                      </p>
                    )}
                  </>
                )}
                {user && (
                  <p style={styles.summaryDetail}>
                    Member: {user.fullName || user.name || user.email}
                  </p>
                )}
                <p style={styles.summaryDetail}>Duration: 45 minutes</p>
                <p style={styles.summaryDetail}>
                  Status: Will be PENDING until confirmed
                </p>
                {bookingSuccess && (
                  <div
                    style={{
                      color: "#43d13a",
                      fontWeight: 800,
                      fontSize: 22,
                      margin: "16px 0",
                    }}
                  >
                    ✅ Appointment booked successfully!
                    <div
                      style={{
                        fontSize: 16,
                        fontWeight: "normal",
                        color: "#666",
                        marginTop: "8px",
                      }}
                    >
                      Your appointment is PENDING confirmation. You will receive
                      a confirmation email shortly.
                    </div>
                    {meetingLink && (
                      <div
                        style={{
                          fontSize: 16,
                          fontWeight: "normal",
                          marginTop: "12px",
                          padding: "12px",
                          backgroundColor: "#f0f8ff",
                          border: "1px solid #4285f4",
                          borderRadius: "8px",
                        }}
                      >
                        <div
                          style={{
                            color: "#1a73e8",
                            fontWeight: "600",
                            marginBottom: "8px",
                          }}
                        >
                          📹 Google Meet Link Created:
                        </div>
                        <a
                          href={meetingLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: "#1a73e8",
                            textDecoration: "none",
                            fontSize: "15px",
                            wordBreak: "break-all",
                            fontFamily: "monospace",
                          }}
                          onMouseOver={(e) =>
                            (e.target.style.textDecoration = "underline")
                          }
                          onMouseOut={(e) =>
                            (e.target.style.textDecoration = "none")
                          }
                        >
                          {meetingLink}
                        </a>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginTop: "8px",
                          }}
                        >
                          <div style={{ color: "#666", fontSize: "14px" }}>
                            Click the link above to join the meeting when it's
                            time for your appointment.
                          </div>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(meetingLink);
                              // Could add a toast notification here
                              console.log("Meeting link copied to clipboard");
                            }}
                            style={{
                              backgroundColor: "#1a73e8",
                              color: "white",
                              border: "none",
                              padding: "6px 12px",
                              borderRadius: "4px",
                              fontSize: "12px",
                              cursor: "pointer",
                              marginLeft: "10px",
                            }}
                            onMouseOver={(e) =>
                              (e.target.style.backgroundColor = "#1557b0")
                            }
                            onMouseOut={(e) =>
                              (e.target.style.backgroundColor = "#1a73e8")
                            }
                          >
                            📋 Copy Link
                          </button>
                        </div>
                      </div>
                    )}
                    <div style={{ marginTop: "20px", textAlign: "center" }}>
                      <button
                        onClick={() => navigate("/elite/coach")}
                        style={{
                          backgroundColor: "#43d13a",
                          color: "white",
                          border: "none",
                          padding: "12px 24px",
                          borderRadius: "8px",
                          fontSize: "16px",
                          cursor: "pointer",
                          fontWeight: "600",
                        }}
                        onMouseOver={(e) =>
                          (e.target.style.backgroundColor = "#3bc832")
                        }
                        onMouseOut={(e) =>
                          (e.target.style.backgroundColor = "#43d13a")
                        }
                      >
                        🏠 Back to Coach Dashboard
                      </button>
                    </div>
                  </div>
                )}
                <button
                  style={{
                    ...styles.confirmButton,
                    opacity: loading || bookingSuccess ? 0.6 : 1,
                    cursor:
                      loading || bookingSuccess ? "not-allowed" : "pointer",
                  }}
                  onClick={handleConfirm}
                  disabled={loading || bookingSuccess}
                >
                  {loading
                    ? "Creating Appointment..."
                    : bookingSuccess
                    ? "Booking Confirmed!"
                    : "Confirm Booking"}
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
      <footer className="elite-footer">
        <div className="footer-content">
          <div className="footer-column">
            <h3>NicOff</h3>
            <p>
              We're dedicated to helping you break free from smoking addiction
              through science-backed methods and community support
            </p>
          </div>
          <div className="footer-column">
            <h3>Quick Links</h3>
            <Link to="/about-us">About Us</Link>
            <Link to="/our-programs">Our Programs</Link>
            <Link to="/success-stories">Success Stories</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/contact">Contact</Link>
          </div>
          <div className="footer-column">
            <h3>Support</h3>
            <Link to="/faq">FAQ</Link>
            <Link to="/help-center">Help Center</Link>
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms-of-service">Term Of Service</Link>
            <Link to="/cookie-policy">Cookie Policy</Link>
          </div>
          <div className="footer-column">
            <h3>NewsLetter</h3>
            <input
              type="email"
              placeholder="Your Email Address..."
              className="newsletter-input"
            />
            <button className="newsletter-button">Subscribe</button>
            <p style={{ fontSize: "0.8em", color: "#ccc", marginTop: "10px" }}>
              Get the latest tips and motivation to stay smoke-free delivered to
              your inbox
            </p>
          </div>
        </div>
        <div className="copyright">
          <p>© 2025 NicOff. All rights reserved</p>
        </div>
      </footer>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#F0F0F0",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  header: {
    width: "100%",
    backgroundColor: "#fff",
    padding: "15px 30px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
  },
  standardMember: {
    backgroundColor: "#A4E087",
    color: "#2E7D32",
    padding: "8px 15px",
    borderRadius: "20px",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  standardMemberIcon: {
    width: "16px",
    height: "16px",
    backgroundColor: "#2E7D32",
    borderRadius: "50%",
  },
  headerCenter: {
    display: "flex",
    alignItems: "center",
  },
  logoSection: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  logoText: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#333",
  },
  nicOffTitleSection: {
    textAlign: "left",
  },
  nicOffTitle: {
    fontSize: "24px",
    color: "#2E7D32",
    margin: "0",
    fontWeight: "bold",
  },
  nicOffSubtitle: {
    fontSize: "12px",
    color: "#666",
    margin: "0",
    fontStyle: "italic",
  },
  headerRight: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },
  navLinks: {
    listStyle: "none",
    padding: "0",
    margin: "0",
    display: "flex",
    gap: "20px",
  },
  navLink: {
    textDecoration: "none",
    color: "#555",
    fontWeight: "bold",
    ":hover": {
      color: "#2E7D32",
    },
  },
  notificationIcon: {
    fontSize: "24px",
    color: "#FFD700",
    marginRight: "10px",
    cursor: "pointer",
  },
  logoutButton: {
    backgroundColor: "#2E7D32",
    color: "#fff",
    border: "none",
    padding: "8px 15px",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    ":hover": {
      backgroundColor: "#388E3C",
    },
  },
  mainContent: {
    flex: 1,
    width: "100%",
    maxWidth: "900px",
    padding: "30px",
    margin: "30px 0",
  },
  backButton: {
    display: "inline-block",
    backgroundColor: "transparent",
    border: "none",
    color: "#2E7D32",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    marginBottom: "20px",
    textDecoration: "none",
  },
  coachProfileCard: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
    padding: "30px",
    display: "flex",
    alignItems: "center",
    gap: "20px",
    marginBottom: "30px",
  },
  coachAvatar: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    backgroundColor: "#E0E0E0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  coachInfo: {
    flex: 1,
  },
  coachName: {
    fontSize: "24px",
    color: "#333",
    margin: "0 0 5px 0",
  },
  coachSpecialization: {
    fontSize: "16px",
    color: "#2E7D32",
    margin: "0 0 10px 0",
    fontWeight: "bold",
  },
  coachBio: {
    fontSize: "14px",
    color: "#555",
    lineHeight: "1.6",
    margin: "0",
  },
  scheduleContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "30px",
  },
  calendarCard: {
    backgroundColor: "#fff",
    // borderRadius: '10px',
    // boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
    padding: "20px",
  },
  calendarTitle: {
    fontSize: "20px",
    color: "#333",
    margin: "0 0 20px 0",
    textAlign: "center",
  },
  calendarNav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px",
  },
  calendarNavButton: {
    backgroundColor: "#2E7D32",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
  },
  calendarMonthYear: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#333",
  },
  calendarTable: {
    width: "100%",
    tableLayout: "fixed",
    borderCollapse: "separate",
    borderSpacing: "4px",
    marginTop: "8px",
    marginBottom: "8px",
  },
  calendarHeaderRow: {
    backgroundColor: "#E8F5E9",
  },
  calendarHeaderCell: {
    padding: "10px",
    textAlign: "center",
    color: "#2E7D32",
    fontWeight: "bold",
  },
  calendarCell: {
    width: 36,
    height: 36,
    textAlign: "center",
    cursor: "pointer",
    borderRadius: 8,
    fontWeight: 500,
    fontSize: 16,
    transition: "background 0.2s, color 0.2s",
  },
  calendarCellEmpty: {
    width: 36,
    height: 36,
    background: "none",
  },
  calendarCellToday: {
    border: "1px solid #2E7D32",
    fontWeight: "bold",
  },
  calendarCellSelected: {
    backgroundColor: "#2E7D32",
    color: "#fff",
    fontWeight: "bold",
    borderRadius: "8px",
    width: "40px",
    height: "40px",
    minWidth: "40px",
    minHeight: "40px",
    lineHeight: "40px",
    display: "table-cell",
    boxSizing: "border-box",
    textAlign: "center",
    verticalAlign: "middle",
    fontSize: "18px",
  },
  calendarCellUnavailable: {
    color: "#C62828",
    textDecoration: "line-through",
    cursor: "not-allowed",
  },
  calendarCellPast: {
    color: "#ccc",
    cursor: "not-allowed",
    opacity: 0.6,
  },
  timeSlotsCard: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
    padding: "20px",
  },
  timeSlotsTitle: {
    fontSize: "20px",
    color: "#333",
    margin: "0 0 20px 0",
    textAlign: "center",
  },
  selectedDateText: {
    fontSize: "16px",
    color: "#555",
    marginBottom: "15px",
    textAlign: "center",
    fontWeight: "bold",
  },
  slotsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  timeSlotButton: {
    backgroundColor: "#E8F5E9",
    border: "1px solid #A4E087",
    color: "#2E7D32",
    padding: "12px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    minHeight: "60px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    transition: "background-color 0.2s ease, border-color 0.2s ease",
    ":hover": {
      backgroundColor: "#DCEDC8",
      borderColor: "#2E7D32",
    },
  },
  timeSlotButtonActive: {
    backgroundColor: "#2E7D32",
    border: "1px solid #2E7D32",
    color: "#fff",
    padding: "12px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    minHeight: "60px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  timeSlotButtonDisabled: {
    backgroundColor: "#F5F5F5",
    border: "1px solid #E0E0E0",
    color: "#999",
    padding: "12px 20px",
    borderRadius: "8px",
    cursor: "not-allowed",
    fontSize: "16px",
    fontWeight: "bold",
    minHeight: "60px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    textDecoration: "line-through",
  },
  sessionSummaryCard: {
    backgroundColor: "#2E7D32",
    color: "#fff",
    borderRadius: "10px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
    padding: "20px",
    marginTop: "30px",
    fontSize: "16px",
    fontWeight: "bold",
    textAlign: "center",
  },
  sessionSummaryTitle: {
    fontSize: "20px",
    margin: "0 0 20px 0",
    textAlign: "center",
    fontWeight: "bold",
  },
  summaryDetail: {
    fontSize: "16px",
    margin: "0 0 10px 0",
    lineHeight: "1.5",
  },
  confirmButton: {
    backgroundColor: "#A4E087",
    color: "#2E7D32",
    border: "none",
    padding: "12px 25px",
    borderRadius: "8px",
    fontSize: "18px",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "20px",
    width: "100%",
    ":hover": {
      backgroundColor: "#C8E6C9",
    },
  },
  footer: {
    width: "100%",
    maxWidth: "1440px",
    backgroundColor: "#333",
    color: "#fff",
    padding: "40px 30px 20px 30px",
    marginTop: "auto",
  },
  footerContent: {
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
    gap: "30px",
    marginBottom: "30px",
  },
  footerSection: {
    flex: "1 1 200px",
    minWidth: "180px",
  },
  footerSectionTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "15px",
    color: "#A4E087",
  },
  footerText: {
    fontSize: "14px",
    lineHeight: "1.6",
    color: "#ccc",
  },
  footerList: {
    listStyle: "none",
    padding: "0",
    margin: "0",
  },
  footerLink: {
    textDecoration: "none",
    color: "#ccc",
    fontSize: "14px",
    marginBottom: "8px",
    display: "block",
    ":hover": {
      color: "#fff",
    },
  },
  newsletterInput: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #555",
    backgroundColor: "#444",
    color: "#fff",
    marginBottom: "10px",
  },
  subscribeButton: {
    backgroundColor: "#2E7D32",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    ":hover": {
      backgroundColor: "#388E3C",
    },
  },
  newsletterText: {
    fontSize: "12px",
    color: "#ccc",
    marginTop: "10px",
  },
  copyright: {
    textAlign: "center",
    fontSize: "12px",
    color: "#888",
    paddingTop: "20px",
    borderTop: "1px solid #444",
  },
};

export default EliteBookAppointment;
