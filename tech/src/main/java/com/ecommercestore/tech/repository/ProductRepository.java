package com.ecommercestore.tech.repository;


import com.ecommercestore.tech.model.Product;
import com.ecommercestore.tech.model.ProductCategories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    @Override
    Optional<Product> findById(Long aLong);

    List<Product> findByProductCategories(ProductCategories productCategories);
}
