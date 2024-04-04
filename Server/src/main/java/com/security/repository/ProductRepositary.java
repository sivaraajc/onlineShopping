package com.security.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.security.configs.entity.Product;

@Repository
public interface ProductRepositary  extends JpaRepository<Product, Integer>{

	
	@Query(value="select * from product where category=?",nativeQuery = true)
	List<Product> getByCategory(String category);

	@Query(value="select * from product where type=?",nativeQuery = true)
	List<Product> getBytype(String type);
    
	  @Query(value = "select * from product where type = :type and category = :category", nativeQuery = true)
	    List<Product> getByTypeAndCategory(@Param("type") String type, @Param("category") String category);
	  
	  @Query(value = "SELECT * FROM product WHERE LOWER(product_name) LIKE LOWER(CONCAT(?1, '%'))", nativeQuery = true)
	  List<Product> getProductsByNameUsingFilter(String productNameOrPrice);







}
