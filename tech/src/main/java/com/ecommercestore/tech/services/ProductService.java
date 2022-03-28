package com.ecommercestore.tech.services;

import com.ecommercestore.tech.model.Product;
import com.ecommercestore.tech.model.ProductCategories;
import com.ecommercestore.tech.repository.ProductCategoriesRepository;
import com.ecommercestore.tech.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
        System.out.println(productCategories.toString());
        System.out.println(this.getProductByProductCategory(productCategories.getId()));
        return this.getProductByProductCategory(productCategories.getId());
    }

}
