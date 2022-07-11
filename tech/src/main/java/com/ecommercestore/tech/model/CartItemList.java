package com.ecommercestore.tech.model;

import java.io.Serializable;
import java.util.List;

public class CartItemList implements Serializable {

    List<CartItem> cartItemList;

    public CartItemList(){

    }

    public CartItemList(List<CartItem> cartItemList){
        this.cartItemList = cartItemList;
    }

    public List<CartItem> getCartItemList() {
        return cartItemList;
    }

    public void setCartItemList(List<CartItem> cartItemList) {
        this.cartItemList = cartItemList;
    }
}
