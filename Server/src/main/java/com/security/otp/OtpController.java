package com.security.otp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/otp")
@CrossOrigin(origins="*")
public class OtpController {
	
	 @Autowired
	    private OtpService otpService;

	    @PostMapping("/send/{phoneNumber}")
	    public ResponseEntity<String> sendOtp(@PathVariable("phoneNumber") String phoneNumber) {
	        String otpCode = otpService.generateOtp();
	        System.out.println("Generated OTP: " + otpCode);
	        otpService.sendOtp(phoneNumber, otpCode);
	        return ResponseEntity.ok("OTP sent successfully.");
	    }
}
