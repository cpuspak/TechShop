package com.ecommercestore.tech.model;


import lombok.Data;

import javax.persistence.*;

@Entity
@Table
@Data
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private long noOfUnits;

    @ManyToOne
    @JoinColumn(name="productId", referencedColumnName = "id")
    private Product product;

    @ManyToOne
    @JoinColumn(name="customerId", referencedColumnName = "id")
    private Customer customer;

    public CartItem(){}

    public CartItem(long noOfUnits, Product product, Customer customer) {
        this.noOfUnits = noOfUnits;
        this.product = product;
        this.customer = customer;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }
}
