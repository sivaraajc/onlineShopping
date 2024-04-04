package com.security.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.security.Exception.InvalidUserException;
import com.security.configs.dto.AuthRequest;
import com.security.configs.entity.UserInfo;
import com.security.configs.service.JwtService;
import com.security.repository.JwtExampleRepository;


@RestController
@RequestMapping(value="/jwt")
@CrossOrigin(origins = "*")
public class JwtExampleController {
	
	

	@Autowired
	JwtExampleRepository jwtRepo;
	
	@Autowired
	PasswordEncoder passwordEncoder;
	
	@Autowired
	JwtService jwtService;
	
	@Autowired
	AuthenticationManager authManager;
	
	
	@Autowired
	JwtExampleRepository jwtres;
	
	
	@GetMapping(value="/get")
	public String getMessage() {
		return "hello everyone";
	}
	
	@GetMapping(value="/getAdmin")
//	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	public String getAdmin() {
		return "hello admin";
	}

	@GetMapping(value="/getUser/{name}")
	public UserInfo getUser(@PathVariable("name") String name) {
		return jwtres.findByName(name).get();
	}
	
	@GetMapping(value="/getAllUser")
	public List<UserInfo> getAllUser() {
		return jwtres.findAll();
	}
	
	@PutMapping(value="/ForgetPassword")
	public UserInfo ForgetPassword(@RequestBody UserInfo useri) {
		
		UserInfo x= this.getUser(useri.getName());
		System.out.println(x);
		
		x.setPassword(passwordEncoder.encode(useri.getPassword()));
		return jwtres.save(x);
	}
	
	 	
	@PostMapping(value="/addUser")
	public UserInfo addUser(@RequestBody UserInfo user) {
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		user.setRoles("USER");
		 return jwtRepo.save(user);
	}
	
	@PutMapping(value="/updateRoles/{id}")
	public UserInfo updateRoles(@PathVariable("id") int id,@RequestBody UserInfo u) {
		UserInfo x=jwtRepo.findById(id).get();
		x.setRoles(u.getRoles());
		return jwtRepo.save(x);
		
	}
	

	
	@PostMapping(value="/addDefaultAdmin")
	public UserInfo addDefaultAdmin(@RequestBody UserInfo u) {
		
		u.setName("admin");
		u.setPassword(passwordEncoder.encode("Admin@123"));
		u.setAge(25);
		u.setGender("male");
		u.setRoles("ADMIN");
		u.setMobile(9876543210l);
		return jwtRepo.save(u);
	}
	
	
	
	
	@PostMapping(value="/authenticate")
	public ResponseEntity<?> createToken(@RequestBody AuthRequest authRequest) {
	    try {
	        Authentication authentication = authManager.authenticate(
	                new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));

	        if (authentication.isAuthenticated()) {
	            UserInfo ex = getUser(authRequest.getUsername());
	            return ResponseEntity.ok(ex);
	        } else {
	            throw new InvalidUserException("Invalid user");
	        }
	    } catch (InvalidUserException e) {
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid user");
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Invalid Username or Password");
	    }
	}
	
	
//	@PostMapping(value="/authenticate")
//	public String autheniticateAndGetToken(@RequestBody AuthRequest authRequest) {
//		Authentication authenticator= authManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
//		if(authenticator.isAuthenticated()) {
//			return jwtService.generateToken(authRequest.getUsername());
//		}
//		else {
//			throw new UsernameNotFoundException("invalid user request!");
//		}
//
//	
//	}



}
