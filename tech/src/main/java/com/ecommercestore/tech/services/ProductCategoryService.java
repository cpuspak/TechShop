package com.ecommercestore.tech.services;


import com.ecommercestore.tech.model.ProductCategories;
import com.ecommercestore.tech.repository.ProductCategoriesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductCategoryService {

    @Autowired
    ProductCategoriesRepository productCategoriesRepository;

    public ProductCategories getCategoriesByName(String categoryName){
        return productCategoriesRepository.findByName(categoryName);
    }

    public List<ProductCategories> getAllProductCategories() {
        return productCategoriesRepository.findAll();
    }
}
