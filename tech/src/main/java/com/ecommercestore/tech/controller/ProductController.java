package com.ecommercestore.tech.controller;

import com.ecommercestore.tech.model.ProductCategories;
import com.ecommercestore.tech.repository.ProductRepository;
import com.ecommercestore.tech.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/product")
@CrossOrigin
public class ProductController {

    @Autowired
    ProductService productService;

    @GetMapping("/getByProductCategoryId")
    ResponseEntity<?> getProductByProductCategoryId(@RequestParam long productCategoryId){
        return ResponseEntity.ok().body(productService.getProductByProductCategory(productCategoryId));
    }

    @GetMapping("/getByProductCategoryName")
    ResponseEntity<?> getProductByProductCategoryName(@RequestParam String productCategoryName){
        return ResponseEntity.ok().body(productService.getProductByProductCategryName(productCategoryName));
    }
}
