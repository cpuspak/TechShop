package com.ecommercestore.tech.controller;

import com.ecommercestore.tech.model.ProductCategories;
import com.ecommercestore.tech.services.ProductCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/productCategories")
@CrossOrigin
public class ProductCategoriesController {
    @Autowired
    ProductCategoryService productCategoryService;


    @GetMapping("/getAllProductCategories")
    public ResponseEntity<?> getAllProductCategories(){
        return ResponseEntity.ok().body(productCategoryService.getAllProductCategories());
    }

}
