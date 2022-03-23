package com.ecommercestore.tech.model;


import lombok.Data;
import net.bytebuddy.asm.Advice;

import javax.persistence.*;

@Entity
@Table
@Data
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String name;
    private String description;
    private String image;
    private float price;
    private int availableUnits;
    @ManyToOne
    @JoinColumn(name = "productCategoryId", referencedColumnName = "id")
    private ProductCategories productCategories;

    public Product(){}

    public Product(String name, String description, String image, float price, int availableUnits) {
        this.name = name;
        this.description = description;
        this.image = image;
        this.price = price;
        this.availableUnits = availableUnits;
    }
}
