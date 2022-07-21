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

    @GetMapping("/getById")
    ResponseEntity<?> getProductByProductId(@RequestParam long productId) {
        System.out.println(productService.getProductByProductId(productId).toString());
        return ResponseEntity.ok().body(productService.getProductByProductId(productId));
    }


    @GetMapping("/getByProductCategoryId")
    ResponseEntity<?> getProductByProductCategoryId(@RequestParam long productCategoryId){
        return ResponseEntity.ok().body(productService.getProductByProductCategory(productCategoryId));
    }

    @GetMapping("/getByProductCategoryName")
    ResponseEntity<?> getProductByProductCategoryName(@RequestParam String productCategoryName){
        return ResponseEntity.ok().body(productService.getProductByProductCategryName(productCategoryName));
    }

    @GetMapping("/getByProductCategoryNameAndPrice")
    ResponseEntity<?> getProductByProductCategoryNameAndPrice(@RequestParam String productCategoryName, @RequestParam float minPrice, @RequestParam float maxPrice){
        return ResponseEntity.ok().body(productService.getProductByProductCategryNameAndPrice(productCategoryName, minPrice, maxPrice));
    }

}
