package com.security.MailService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.security.configs.entity.Product;
import com.security.configs.entity.UserInfo;
import com.security.controller.ProductController;
import com.security.entity.EmailRequest;
import com.security.repository.OrderRepositary;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {
	
	
	

	@Autowired
	ProductController prod;

	@Autowired
	OrderRepositary order;

	@Autowired
	private JavaMailSender javaMailSender;

	@Value("${spring.mail.username}")
	private String fromEmail;

	public void sendConfirmationEmail(EmailRequest pro) {

		MimeMessage mimeMessage = javaMailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(mimeMessage);
		ResponseEntity<Product> p = prod.getById(pro.getProductId());

		try {
			helper.setFrom(fromEmail);
			helper.setTo(pro.getEmail());
			helper.setSubject("Order Confirmation");
			// Construct the email content using HTML
			String emailContent = "<p>We are thrilled to inform you that your recent order with oYo has been successfully confirmed. We greatly appreciate your trust in our products/services and are committed to ensuring a seamless shopping experience for you.</p>"
					+ "<ul>" + "<li><b>Product Name: </b>" + p.getBody().getProductName() + "</li>"
					+ "<li><b>Product Details:</b> <span style='color: green;'>" + p.getBody().getProductDetails()
					+ "</span></li>" + "<li><b>Price: $</b> <span style='color: red;'>" + p.getBody().getPrice()
					+ "</span></li>" + "</ul>" + "<ul>" + "<li><b>Mail: </b>" + pro.getEmail() + "</li>"
					+ "<li><b>Mobile:</b> <span style='color: blue;'>" + pro.getMobile() + "</span></li>"
					+ "<li><b>Address: $</b><span style='color: blue;'>" + pro.getAddress() + "</span></li>" + "</ul>"
					+ "<p>Rest assured, our team is diligently working to process and fulfill your order promptly. You will receive further updates regarding the status of your order, including tracking information, once it has been dispatched.</p>"
					+ "<p>If you have any questions or require assistance regarding your order, please do not hesitate to contact our customer support team at aadhiaravindh007@gmail.com. We are here to help!</p>"
					+ "<p>Thank you once again for choosing oYo. We value your business and look forward to serving you again in the future.</p>"
					+ "<p>Warm regards,</p>" + "<p style='color: green;'>Aravindh<br>" + "CEO<br>" + "oYo<br>"
					+ "aadhiaravindh007@gmail.com</p>";

			helper.setText(emailContent, true);

			javaMailSender.send(mimeMessage);

		} catch (MessagingException e) {

		}
	}
	
	
	
	public void sendOtpVerification(UserInfo pro) {

		MimeMessage mimeMessage = javaMailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(mimeMessage);
		

		try {
			helper.setFrom(fromEmail);
			helper.setTo(pro.getEmail());
			helper.setSubject("Verify Your Account");
			// Construct the email content using HTML
			String emailContent = "<h1>"+pro.getOtp()+"</h1>";
					

			helper.setText(emailContent, true);

			javaMailSender.send(mimeMessage);

		} catch (MessagingException e) {

		}
	}
}
