package com.ecommercestore.tech.repository;

import com.ecommercestore.tech.model.ProductCategories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductCategoriesRepository extends JpaRepository<ProductCategories, Long> {
    ProductCategories findByName(String name);

}
