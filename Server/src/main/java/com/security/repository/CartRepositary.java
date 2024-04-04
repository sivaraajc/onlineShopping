package com.security.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.security.configs.entity.Cart;

@Repository
public interface CartRepositary extends JpaRepository<Cart, Integer>{

	
	@Query(value="select * from cart where user_id=?",nativeQuery = true)
	List<Cart> getUserIdProductDetails(int id);
	
	@Modifying
	@Query("DELETE FROM Cart c WHERE c.productId = :productId AND c.userId = :userId")
	void deleteByProductId(@Param("productId") int productId, @Param("userId") int userId);
	
	@Modifying
	@Query("UPDATE Cart c SET c.itemCount = :itemCount WHERE c.productId = :productId AND c.userId = :userId")
	void updateCart(@Param("productId") int productId, @Param("userId") int userId, @Param("itemCount") int itemCount);
	
	@Modifying
	@Query("SELECT c FROM Cart c WHERE c.productId = :productId AND c.userId = :userId")
	List<Cart> getCart(@Param("productId") int productId, @Param("userId") int userId);



}
