package com.security.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.security.configs.entity.Carosual;
import com.security.repository.CarosualRepositary;


@RestController
@RequestMapping(value="/image")
@CrossOrigin(origins = "*")
public class CarosualController {
	@Autowired
	CarosualRepositary CarosualRepo;
	
	   @PostMapping(value="/addImage")
	    public Carosual CartPost(@RequestBody Carosual p) {
	        return CarosualRepo.save(p);
	    }
	    
	    @GetMapping(value="/getAllImage")
	    public List<Carosual> getAllImage() {
	        return CarosualRepo.findAll();
	    }
	    
	    @DeleteMapping(value="/deleteImageById/{id}")
	    public String deleteImageById(@PathVariable("id") int id) {
	    	CarosualRepo.deleteById(id);
	    	return "Image Deleted Success";
	    	
	    }
	    
	    @PutMapping(value="/updateImageById/{id}")
	    public Carosual updateImageById(@PathVariable("id") int id,@RequestBody Carosual i) {
	    	Carosual c= CarosualRepo.findById(id).get();
	    	c.setImage(i.getImage());
	    	return CarosualRepo.save(c);
	    }
	    
	    @GetMapping(value="/getImageById/{id}")
	    public Carosual getImageById(@PathVariable("id") int id) {
	    	return CarosualRepo.findById(id).get();
	    	
	    }
	    
	    

}
