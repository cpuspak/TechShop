package com.ecommercestore.tech.services;

import com.ecommercestore.tech.model.Product;
import com.ecommercestore.tech.model.ProductCategories;
import com.ecommercestore.tech.repository.ProductCategoriesRepository;
import com.ecommercestore.tech.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    @Autowired
    ProductRepository productRepository;

    @Autowired
    ProductCategoriesRepository productCategoriesRepository;

    public Product getProductByProductId(long productId){
        Optional<Product> product = productRepository.findById(productId);
        if (product.isPresent()){
            return product.get();
        }
        return null;
    }

    public List<Product> getProductByProductCategory(long productCategoryId){
        ProductCategories productCategories = new ProductCategories();
        productCategories.setId(productCategoryId);
        return productRepository.findByProductCategories(productCategories);
    }

    public List<Product> getProductByProductCategryName(String productCategoryName){
        ProductCategories productCategories = productCategoriesRepository.findByName(productCategoryName);
        return this.getProductByProductCategory(productCategories.getId());
    }

    public List<Product> getProductByProductCategryNameAndPrice(String productCategoryName, float minPrice, float maxPrice){
        ProductCategories productCategories = productCategoriesRepository.findByName(productCategoryName);
        if (minPrice == -1) return  productRepository.findByProductCategoriesAndMaxPrice(productCategories.getId(), maxPrice);
        else if (maxPrice == -1) return productRepository.findByProductCategoriesAndMinPrice(productCategories.getId(), minPrice);
        else return productRepository.findByProductCategoriesAndPrice(productCategories.getId(), minPrice, maxPrice);

    }

}
