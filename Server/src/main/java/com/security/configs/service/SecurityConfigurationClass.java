package com.security.configs.service;

import java.util.Properties;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfigurationClass {

	@Autowired
	JwtAuthFilter authFilter;

	@Bean
	public UserDetailsService userDetailsService() {

		return new UserInfoUserDetailsService();

	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

//	@Bean
//	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//		return http.csrf().disable().authorizeHttpRequests()
//				.requestMatchers("/v2/api-docs",
//	                    "/configuration/**",
//	                    "/swagger-resources/**",
//	                    "/swagger-ui.html",
//	                    "/webjars/**",
//	                    "/swagger-ui/**",
//	                    "/spring/get","/user/**","/jwt/get", "/jwt/addUser", "/jwt/authenticate", "/jwt/newaccount", "/jwt/getAdmin",
//						"/jwt/getAllUser", "/jwt/getUser/{name}", "/product/productPost", "/product/getAllProduct",
//						"/product/getBytype/{type}", "product/getById/{id}", "product/deletebyId/{id}",
//						"product/updateById/{id}", "/cart/addCart", "/cart/getCart", "/cart/getCartId/{id}",
//						"/cart/deleteCartId/{productId}/{userId}", "/product/getproductByNameUsingFilter/{productName}",
//						"/product/getByCategory/{category}", "/image/addImage", "/image/getAllImage",
//						"/cart/updateCart/{productId}/{userId}", "/image/deleteImageById/{id}",
//						"product/getByTypeCategory/{type}/{category}", "/image/updateImageById/{id}",
//						"/image/getImageById/{id}", "/cart/getCart/{productId}/{userId}", "/jwt/updateRoles/{id}",
//						"/jwt/addDefaultAdmin", "/cart/send-email", "/cart/sendEmailConformation",
//						"/cart/sendOtpVerification","/jwt/ForgetPassword","/otp/send")
//				.permitAll().and().authorizeHttpRequests().requestMatchers("/jwt/**").authenticated().and()
////				
//
//				.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
//				.authenticationProvider(authenticationProvider())
//				.addFilterBefore(authFilter, UsernamePasswordAuthenticationFilter.class).build();
//	}
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf().disable()
            .authorizeRequests()
                .requestMatchers(
                    "/v2/api-docs",
                    "/configuration/**",
                    "/swagger-resources/**",
                    "/swagger-ui.html",
                    "/webjars/**",
                    "/swagger-ui/**",
                    "/spring/get","/user/**"
                ).permitAll()
                .and()
            .httpBasic()
                .and()
            .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        return http.build();
    }

	@Bean
	public AuthenticationProvider authenticationProvider() {
		DaoAuthenticationProvider daoAuthenticate = new DaoAuthenticationProvider();
		daoAuthenticate.setUserDetailsService(userDetailsService());
		daoAuthenticate.setPasswordEncoder(passwordEncoder());
		return daoAuthenticate;
	}

	@Bean
	public AuthenticationManager authManager(AuthenticationConfiguration authconfig) throws Exception {
		return authconfig.getAuthenticationManager();
	}

	@Bean
	public JavaMailSender javaMailSender() {
		JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
		mailSender.setHost("smtp.gmail.com");
		mailSender.setPort(587);
		mailSender.setUsername("prathapshanmugam5@gmail.com");
		mailSender.setPassword("hdlh hkrg lfby wkrb");

		Properties props = mailSender.getJavaMailProperties();
		props.put("mail.smtp.auth", "true");
		props.put("mail.smtp.starttls.enable", "true");

		return mailSender;
	}

}
