package com.ecommercestore.tech.repository;

import com.ecommercestore.tech.model.CartItem;
import org.springframework.data.domain.Example;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    long countByCustomerId(long customerId);

    List<CartItem> findByCustomerId(long customerId);

    Optional<CartItem> findByCustomerIdAndProductId(long customerId, long productId);




}
