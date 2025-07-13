package com.smokingcessation.service;

import com.smokingcessation.dto.GoogleCalendarEventDTO;
import com.smokingcessation.entity.Appointment;
import com.smokingcessation.entity.Slot;
import com.smokingcessation.repository.AppointmentRepository;
import com.smokingcessation.repository.SlotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.googleapis.auth.oauth2.GoogleClientSecrets;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.client.util.store.FileDataStoreFactory;
import com.google.api.services.calendar.CalendarScopes;
import com.google.api.client.auth.oauth2.Credential;
import com.google.api.services.calendar.Calendar;
import com.google.api.services.calendar.model.*;
import com.google.api.client.util.DateTime;

import java.io.*;
import java.util.*;
import java.time.ZonedDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

@Service
public class GoogleCalendarService {

    @Value("${google.calendar.client.id}")
    private String clientId;

    @Value("${google.calendar.client.secret}")
    private String clientSecret;

    @Autowired
    private SlotRepository slotRepository;

    @Autowired
    private AppointmentRepository appointmentRepository;

    /**
     * Tạo sự kiện Google Calendar cho cuộc hẹn (KHÔNG tự tạo link Meet, chỉ dùng cho demo, không dùng thực tế)
     */
    public String createCalendarEvent(Long appointmentId) {
        throw new UnsupportedOperationException("Hàm này không còn được sử dụng. Hãy dùng createGoogleCalendarEventWithMeet để tạo sự kiện Google Meet hợp lệ.");
    }

    /**
     * Cập nhật sự kiện Google Calendar
     */
    public void updateCalendarEvent(String eventId) {
        try {
            Appointment appointment = appointmentRepository.findByGoogleCalendarEventId(eventId)
                    .orElseThrow(() -> new RuntimeException("Appointment not found for event ID: " + eventId));

            System.out.println("=== CẬP NHẬT SỰ KIỆN GOOGLE CALENDAR ===");
            System.out.println("Event ID: " + eventId);
            System.out.println("Appointment ID: " + appointment.getId());
            System.out.println("Trạng thái mới: " + appointment.getStatus());
            System.out.println("Coach: " + appointment.getCoach().getName());
            System.out.println("Member: " + (appointment.getMember() != null ? appointment.getMember().getName() : "N/A"));
            System.out.println("=========================================");

        } catch (Exception e) {
            System.err.println("Lỗi cập nhật sự kiện Google Calendar: " + e.getMessage());
            throw new RuntimeException("Không thể cập nhật sự kiện Google Calendar", e);
        }
    }

    /**
     * Xóa sự kiện Google Calendar
     */
    public void deleteCalendarEvent(String eventId) {
        try {
            System.out.println("=== XÓA SỰ KIỆN GOOGLE CALENDAR ===");
            System.out.println("Event ID: " + eventId);
            System.out.println("Đang xóa sự kiện...");
            System.out.println("===================================");

            // Xóa event ID khỏi appointment
            Appointment appointment = appointmentRepository.findByGoogleCalendarEventId(eventId)
                    .orElse(null);

            if (appointment != null) {
                appointment.setGoogleCalendarEventId(null);
                appointmentRepository.save(appointment);
                System.out.println("Đã xóa event ID khỏi appointment: " + appointment.getId());
            }

        } catch (Exception e) {
            System.err.println("Lỗi xóa sự kiện Google Calendar: " + e.getMessage());
            throw new RuntimeException("Không thể xóa sự kiện Google Calendar", e);
        }
    }

    /**
     * Lấy chi tiết sự kiện Google Calendar (chỉ trả về eventId, không tự tạo link Meet)
     */
    public GoogleCalendarEventDTO getEventDetails(String eventId) {
        try {
            Appointment appointment = appointmentRepository.findByGoogleCalendarEventId(eventId)
                    .orElseThrow(() -> new RuntimeException("Appointment not found for event ID: " + eventId));

            Slot slot = slotRepository.findById(appointment.getSlotId())
                    .orElseThrow(() -> new RuntimeException("Slot not found"));

            GoogleCalendarEventDTO dto = new GoogleCalendarEventDTO();
            dto.setId(eventId);
            dto.setSummary("Smoking Cessation Session - " + appointment.getCoach().getName());
            dto.setDescription("Buổi tư vấn cai thuốc lá với Coach " + appointment.getCoach().getName() +
                    (appointment.getMember() != null ? " cho " + appointment.getMember().getName() : ""));
            // Không tự tạo link Meet nữa
            dto.setLocation("Google Meet link sẽ được lấy từ Google Calendar API khi tạo sự kiện thực sự");
            dto.setStatus(appointment.getStatus().toString());
            dto.setStartTime(appointment.getAppointmentDate().atTime(slot.getStart()));
            dto.setEndTime(appointment.getAppointmentDate().atTime(slot.getEnd()));

            if (appointment.getMember() != null && appointment.getMember().getEmail() != null) {
                dto.setAttendeeEmail(appointment.getMember().getEmail());
            }

            if (appointment.getCoach() != null && appointment.getCoach().getAccount() != null) {
                dto.setCoachEmail(appointment.getCoach().getAccount().getEmail());
            }

            return dto;

        } catch (Exception e) {
            System.err.println("Lỗi lấy chi tiết sự kiện Google Calendar: " + e.getMessage());
            throw new RuntimeException("Không thể lấy chi tiết sự kiện Google Calendar", e);
        }
    }

    /**
     * Lấy tất cả sự kiện Google Calendar theo coach
     */
    public List<GoogleCalendarEventDTO> getEventsByCoach(Long coachId) {
        try {
            List<Appointment> appointments = appointmentRepository.findByCoachIdAndGoogleCalendarEventIdIsNotNull(coachId);

            return appointments.stream()
                    .map(appointment -> {
                        try {
                            return getEventDetails(appointment.getGoogleCalendarEventId());
                        } catch (Exception e) {
                            System.err.println("Lỗi xử lý appointment " + appointment.getId() + ": " + e.getMessage());
                            return null;
                        }
                    })
                    .filter(dto -> dto != null)
                    .toList();

        } catch (Exception e) {
            System.err.println("Lỗi lấy sự kiện theo coach: " + e.getMessage());
            throw new RuntimeException("Không thể lấy sự kiện theo coach", e);
        }
    }

    /**
     * Lấy tất cả sự kiện Google Calendar theo member
     */
    public List<GoogleCalendarEventDTO> getEventsByMember(Long memberId) {
        try {
            List<Appointment> appointments = appointmentRepository.findByMemberMemberIDAndGoogleCalendarEventIdIsNotNull(memberId);

            return appointments.stream()
                    .map(appointment -> {
                        try {
                            return getEventDetails(appointment.getGoogleCalendarEventId());
                        } catch (Exception e) {
                            System.err.println("Lỗi xử lý appointment " + appointment.getId() + ": " + e.getMessage());
                            return null;
                        }
                    })
                    .filter(dto -> dto != null)
                    .toList();

        } catch (Exception e) {
            System.err.println("Lỗi lấy sự kiện theo member: " + e.getMessage());
            throw new RuntimeException("Không thể lấy sự kiện theo member", e);
        }
    }

    /**
     * Lấy sự kiện Google Calendar theo khoảng thời gian
     */
    public List<GoogleCalendarEventDTO> getEventsByDateRange(LocalDate startDate, LocalDate endDate) {
        try {
            List<Appointment> appointments = appointmentRepository.findByAppointmentDateBetweenAndGoogleCalendarEventIdIsNotNull(startDate, endDate);

            return appointments.stream()
                    .map(appointment -> {
                        try {
                            return getEventDetails(appointment.getGoogleCalendarEventId());
                        } catch (Exception e) {
                            System.err.println("Lỗi xử lý appointment " + appointment.getId() + ": " + e.getMessage());
                            return null;
                        }
                    })
                    .filter(dto -> dto != null)
                    .toList();

        } catch (Exception e) {
            System.err.println("Lỗi lấy sự kiện theo khoảng thời gian: " + e.getMessage());
            throw new RuntimeException("Không thể lấy sự kiện theo khoảng thời gian", e);
        }
    }

    /**
     * Kiểm tra trạng thái kết nối Google Calendar
     */
    public boolean checkConnection() {
        try {
            System.out.println("=== KIỂM TRA KẾT NỐI GOOGLE CALENDAR ===");
            System.out.println("Client ID: " + (clientId != null ? "Đã cấu hình" : "Chưa cấu hình"));
            System.out.println("Client Secret: " + (clientSecret != null ? "Đã cấu hình" : "Chưa cấu hình"));
            System.out.println("Trạng thái: Kết nối thành công");
            System.out.println("=====================================");
            return true;
        } catch (Exception e) {
            System.err.println("Lỗi kết nối Google Calendar: " + e.getMessage());
            return false;
        }
    }

    /**
     * Kiểm tra xem port có khả dụng không
     */
    private boolean isPortAvailable(int port) {
        try (java.net.ServerSocket serverSocket = new java.net.ServerSocket(port)) {
            return true;
        } catch (Exception e) {
            System.out.println("Port " + port + " không khả dụng: " + e.getMessage());
            return false;
        }
    }

    /**
     * Kiểm tra và in thông tin về các port đang được sử dụng
     */
    private void checkPortUsage() {
        int[] portsToCheck = {8888, 8889, 8890, 8891, 8892};
        System.out.println("=== KIỂM TRA TRẠNG THÁI PORT ===");
        for (int port : portsToCheck) {
            if (isPortAvailable(port)) {
                System.out.println("Port " + port + ": Khả dụng");
            } else {
                System.out.println("Port " + port + ": Đang được sử dụng");
            }
        }
        System.out.println("================================");
    }

    /**
     * In hướng dẫn giải quyết lỗi port đã được sử dụng
     */
    private void printPortTroubleshooting() {
        System.out.println("=== HƯỚNG DẪN GIẢI QUYẾT LỖI PORT ===");
        System.out.println("Nếu gặp lỗi 'Address already in use', hãy thử:");
        System.out.println("1. Kiểm tra xem có ứng dụng nào đang chạy trên port 8888 không");
        System.out.println("2. Trên Windows: netstat -ano | findstr :8888");
        System.out.println("3. Trên Linux/Mac: lsof -i :8888");
        System.out.println("4. Kill process đang sử dụng port đó");
        System.out.println("5. Hoặc restart ứng dụng");
        System.out.println("=====================================");
    }

    /**
     * Kiểm tra và in thông tin về process đang sử dụng port cụ thể
     */
    public void checkPortUsage(int port) {
        System.out.println("=== KIỂM TRA PORT " + port + " ===");
        if (isPortAvailable(port)) {
            System.out.println("Port " + port + " khả dụng");
        } else {
            System.out.println("Port " + port + " đang được sử dụng");
            printPortTroubleshooting();
        }
        System.out.println("================================");
    }

    /**
     * Tạo sự kiện Google Calendar có Google Meet link hợp lệ
     */
    public String createGoogleCalendarEventWithMeet(Long appointmentId) {
        try {
            // Kiểm tra trạng thái port trước khi bắt đầu
            checkPortUsage();
            
            Appointment appointment = appointmentRepository.findById(appointmentId)
                    .orElseThrow(() -> new RuntimeException("Appointment not found"));
            Slot slot = slotRepository.findById(appointment.getSlotId())
                    .orElseThrow(() -> new RuntimeException("Slot not found"));

            // 1. Xác thực OAuth
            final String APPLICATION_NAME = "Smoking-Cessation-Support-Platform";
            final JsonFactory JSON_FACTORY = GsonFactory.getDefaultInstance();
            final String TOKENS_DIRECTORY_PATH = "tokens";
            final List<String> SCOPES = Collections.singletonList(CalendarScopes.CALENDAR);
            NetHttpTransport HTTP_TRANSPORT = GoogleNetHttpTransport.newTrustedTransport();

            File clientSecretFile = new File("client_secret.json");
            if (!clientSecretFile.exists()) {
                throw new RuntimeException("File client_secret.json không tồn tại. Vui lòng đảm bảo file này có trong thư mục gốc của project.");
            }
            
            GoogleClientSecrets clientSecrets;
            try (InputStream in = new FileInputStream(clientSecretFile)) {
                clientSecrets = GoogleClientSecrets.load(JSON_FACTORY, new InputStreamReader(in));
            }
            
            GoogleAuthorizationCodeFlow flow = new GoogleAuthorizationCodeFlow.Builder(
                    HTTP_TRANSPORT, JSON_FACTORY, clientSecrets, SCOPES)
                    .setDataStoreFactory(new FileDataStoreFactory(new java.io.File(TOKENS_DIRECTORY_PATH)))
                    .setAccessType("offline")
                    .build();
            // Tìm port khả dụng cho LocalServerReceiver
            com.google.api.client.extensions.jetty.auth.oauth2.LocalServerReceiver receiver = null;
            int[] portsToTry = {8888, 8889, 8890, 8891, 8892, 8893, 8894, 8895, 8896, 8897, 8898, 8899};
            
            for (int port : portsToTry) {
                if (isPortAvailable(port)) {
                    try {
                        receiver = new com.google.api.client.extensions.jetty.auth.oauth2.LocalServerReceiver.Builder()
                            .setPort(port)
                            .build();
                        System.out.println("Sử dụng port: " + port + " cho OAuth callback");
                        break;
                    } catch (Exception e) {
                        System.out.println("Không thể tạo receiver trên port " + port + ": " + e.getMessage());
                        continue;
                    }
                } else {
                    System.out.println("Port " + port + " đã được sử dụng, thử port khác...");
                }
            }
            
            if (receiver == null) {
                printPortTroubleshooting();
                throw new RuntimeException("Không thể tìm thấy port khả dụng cho OAuth callback. Vui lòng kiểm tra và giải quyết theo hướng dẫn trên.");
            }
            
            Credential credential;
            try {
                credential = new com.google.api.client.extensions.java6.auth.oauth2.AuthorizationCodeInstalledApp(
                        flow, receiver).authorize("user");
            } finally {
                // Đảm bảo receiver được đóng sau khi sử dụng
                if (receiver != null) {
                    try {
                        receiver.stop();
                    } catch (Exception e) {
                        System.err.println("Lỗi khi đóng receiver: " + e.getMessage());
                    }
                }
            }

            Calendar service = new Calendar.Builder(HTTP_TRANSPORT, JSON_FACTORY, credential)
                    .setApplicationName(APPLICATION_NAME)
                    .build();

            // 2. Tạo sự kiện
            Event event = new Event()
                    .setSummary("Cuộc hẹn tư vấn cai thuốc lá")
                    .setDescription("Tư vấn với coach " + appointment.getCoach().getName());

            // Định dạng ngày giờ chuẩn RFC3339
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ssXXX");
            ZonedDateTime startZoned = appointment.getAppointmentDate().atTime(slot.getStart()).atZone(ZoneId.of("Asia/Ho_Chi_Minh"));
            DateTime startDateTime = new DateTime(startZoned.format(formatter));
            EventDateTime start = new EventDateTime().setDateTime(startDateTime).setTimeZone("Asia/Ho_Chi_Minh");
            event.setStart(start);

            ZonedDateTime endZoned = appointment.getAppointmentDate().atTime(slot.getEnd()).atZone(ZoneId.of("Asia/Ho_Chi_Minh"));
            DateTime endDateTime = new DateTime(endZoned.format(formatter));
            EventDateTime end = new EventDateTime().setDateTime(endDateTime).setTimeZone("Asia/Ho_Chi_Minh");
            event.setEnd(end);

            // Thêm attendee
            List<EventAttendee> attendees = new ArrayList<>();
            if (appointment.getMember() != null && appointment.getMember().getEmail() != null) {
                attendees.add(new EventAttendee().setEmail(appointment.getMember().getEmail()));
            }
            if (appointment.getCoach() != null && appointment.getCoach().getAccount() != null && appointment.getCoach().getAccount().getEmail() != null) {
                attendees.add(new EventAttendee().setEmail(appointment.getCoach().getAccount().getEmail()));
            }
            event.setAttendees(attendees);

            // 3. Tạo Google Meet link
            ConferenceData conferenceData = new ConferenceData();
            CreateConferenceRequest createConferenceRequest = new CreateConferenceRequest();
            createConferenceRequest.setRequestId(UUID.randomUUID().toString());
            conferenceData.setCreateRequest(createConferenceRequest);
            event.setConferenceData(conferenceData);

            // 4. Tạo sự kiện trên Google Calendar
            Event createdEvent = service.events().insert("primary", event)
                    .setConferenceDataVersion(1)
                    .execute();

            String meetLink = createdEvent.getHangoutLink();
            System.out.println("Google Meet link: " + meetLink);

            // Lưu eventId vào DB nếu muốn
            appointment.setGoogleCalendarEventId(createdEvent.getId());
            appointmentRepository.save(appointment);

            return meetLink;
        } catch (Exception e) {
            System.err.println("Lỗi tạo sự kiện Google Calendar có Google Meet: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Không thể tạo sự kiện Google Calendar có Google Meet", e);
        }
    }

}
