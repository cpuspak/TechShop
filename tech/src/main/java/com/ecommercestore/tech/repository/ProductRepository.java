package com.ecommercestore.tech.repository;


import com.ecommercestore.tech.model.Product;
import com.ecommercestore.tech.model.ProductCategories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    @Override
    Optional<Product> findById(Long aLong);

    List<Product> findByProductCategories(ProductCategories productCategories);

    @Query("from Product where product_category_id=:productCategoriesId and price >=:minPrice and price <=:maxPrice")
    List<Product> findByProductCategoriesAndPrice
            (@Param("productCategoriesId") long productCategoriesId,
             @Param("minPrice") float minPrice,
             @Param("maxPrice") float maxPrice);

    @Query("from Product where product_category_id=:productCategoriesId and price >=:minPrice")
    List<Product> findByProductCategoriesAndMinPrice
            (@Param("productCategoriesId") long productCategoriesId,
             @Param("minPrice") float minPrice);

    @Query("from Product where product_category_id=:productCategoriesId and price <=:maxPrice")
    List<Product> findByProductCategoriesAndMaxPrice
            (@Param("productCategoriesId") long productCategoriesId,
             @Param("maxPrice") float maxPrice);
}
