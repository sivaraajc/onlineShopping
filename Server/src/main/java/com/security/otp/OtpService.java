package com.security.otp;

import java.util.Random;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.twilio.http.TwilioRestClient;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;

@Service
public class OtpService {
    @Value("${twilio.phoneNumber}")
    private String twilioPhoneNumber;

    private final TwilioRestClient twilioRestClient;

    public OtpService(@Value("${twilio.accountSid}") String accountSid,
                      @Value("${twilio.authToken}") String authToken) {
        twilioRestClient = new TwilioRestClient.Builder(accountSid, authToken).build();
    }

    public String generateOtp() {
        // Generating a random 7-digit number
        Random random = new Random();
        int otp = 1000000 + random.nextInt(9000000); // Generates a number between 1000000 and 9999999
        return String.valueOf(otp);
    }


    public void sendOtp(String recipientPhoneNumber, String otpCode) {
        Message.creator(new PhoneNumber(recipientPhoneNumber), new PhoneNumber(twilioPhoneNumber),
                "Your OTP code is: " + otpCode)
                .create(twilioRestClient);
    }
}