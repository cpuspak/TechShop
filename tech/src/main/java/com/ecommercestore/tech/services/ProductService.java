package com.ecommercestore.tech.services;

import com.ecommercestore.tech.model.Product;
import com.ecommercestore.tech.model.ProductCategories;
import com.ecommercestore.tech.repository.ProductCategoriesRepository;
import com.ecommercestore.tech.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    @Autowired
    ProductRepository productRepository;

    @Autowired
    ProductCategoriesRepository productCategoriesRepository;

    public List<Product> getProductByProductCategory(long productCategoryId){
        ProductCategories productCategories = new ProductCategories();
        productCategories.setId(productCategoryId);
        return productRepository.findByProductCategories(productCategories);
    }

    public List<Product> getProductByProductCategryName(String productCategoryName){
        ProductCategories productCategories = productCategoriesRepository.findByName(productCategoryName);
        return this.getProductByProductCategory(productCategories.getId());
    }

}
