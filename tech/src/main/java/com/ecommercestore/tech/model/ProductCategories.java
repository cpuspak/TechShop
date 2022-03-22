package com.ecommercestore.tech.model;


import lombok.Data;

import javax.persistence.*;

@Entity
@Table
@Data
public class ProductCategories{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    @Column(unique = true)
    private String name;
    private String description;

    public ProductCategories(){}

    public ProductCategories(String name, String description) {
        this.name = name;
        this.description = description;
    }
}
