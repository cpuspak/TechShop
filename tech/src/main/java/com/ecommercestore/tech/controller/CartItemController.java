package com.ecommercestore.tech.controller;


import com.ecommercestore.tech.model.CartItem;
import com.ecommercestore.tech.model.CartItemList;
import com.ecommercestore.tech.model.UserNameClass;
import com.ecommercestore.tech.services.CartItemService;
import com.ecommercestore.tech.services.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ecommercestore.tech.model.CartItemAdd;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/cartItem")
@CrossOrigin
public class CartItemController {

    @Autowired
    CartItemService cartItemService;

    @GetMapping("/getNumberOfCartItemsByCustomerUserName")
    ResponseEntity<?> getNumberOfCartItemsByCustomerUserName(@RequestParam String customerUserName){
        return ResponseEntity.ok().body(cartItemService.getCartItemCountByCustomerUserName(customerUserName));
    }

    @GetMapping("/getCartItemsByCustomerUserName")
    ResponseEntity<?> getCartItemsByCustomerUserName(@RequestParam String customerUserName){
        return ResponseEntity.ok().body(cartItemService.getCartItemsByCustomerName(customerUserName));
    }

    @DeleteMapping("/removeCartItemByCartItemId")
    ResponseEntity<?> removeCartItemByCartItemId(@RequestParam long cartItemId){
        CartItem cartItem = cartItemService.removeCartItemByCartItemId(cartItemId);
        if (cartItem == null) {
            return ResponseEntity.status(400).body("invalid cart item id");
        }
        return ResponseEntity.ok().body(cartItem);
    }

    @PutMapping("/addCartItemByCustomerIdAndProductId")
    ResponseEntity<?> addCartItemByCustomerUserNameAndProductId(@RequestBody CartItemAdd cartItemAddObject){
        System.out.println("Add cart items");
        System.out.println(cartItemAddObject.toString());
        CartItem cartItem = cartItemService.addCartItemByCustomerUserNameAndProductId(
                cartItemAddObject.getCustomerUserName(),
                cartItemAddObject.getProductId(),
                cartItemAddObject.getCount()
        );
        if (cartItem == null) {
            return ResponseEntity.status(400).body("invalid input params");
        }
        return ResponseEntity.ok().body(cartItem);
    }

    @PostMapping("/checkoutCartItemByCartItemsList")
    ResponseEntity<?> checkoutCartItemsByCustomerUserName(@RequestBody CartItemList cartItemList){
        try{
            System.out.println(cartItemList);
            List<CartItem> returnCartItems = this.cartItemService.checkoutCartItemByCartItemsList(cartItemList.getCartItemList());
            return ResponseEntity.ok().body(returnCartItems);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("internal server error");
        }

    }

    @DeleteMapping("/deleteCartItemsByCartItemsList")
    ResponseEntity<?> deleteCartItemsByCartItemsList(@RequestBody CartItemList cartItemList){
        try{
            System.out.println(cartItemList);
            List<CartItem> availableCartItems = this.cartItemService.deleteCartItemsByCartItemsList(cartItemList.getCartItemList());
            return ResponseEntity.ok().body(availableCartItems);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("internal server error");
        }
    }
}
