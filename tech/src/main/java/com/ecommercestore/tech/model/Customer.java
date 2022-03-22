package com.ecommercestore.tech.model;


import lombok.Data;

import javax.persistence.*;

@Entity
@Table
@Data
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    @Column(unique = true)
    private String userName;   //stores the emailId
    private String name;
    private String password;
    private String address;

    public Customer(){}

    public Customer(String userName, String name, String password, String address) {
        this.userName = userName;
        this.name = name;
        this.password = password;
        this.address = address;
    }
}
