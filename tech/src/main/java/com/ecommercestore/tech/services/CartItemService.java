package com.ecommercestore.tech.services;


import com.ecommercestore.tech.model.CartItem;
import com.ecommercestore.tech.model.Customer;
import com.ecommercestore.tech.model.Product;
import com.ecommercestore.tech.repository.CartItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CartItemService {
    @Autowired
    CartItemRepository cartItemRepository;

    @Autowired
    CustomerService customerService;

    @Autowired
    ProductService productService;


    public long getCartItemCountByCustomerUserName(String customerUserName){
        Customer customer = customerService.getByUserName(customerUserName);
        long customerId = customer.getId();
        return cartItemRepository.countByCustomerId(customerId);
    }

    public List<CartItem> getCartItemsByCustomerName(String customerUserName){
        Customer customer = customerService.getByUserName(customerUserName);
        long customerId = customer.getId();
        return cartItemRepository.findByCustomerId(customerId);
    }

    public CartItem removeCartItemByCartItemId(long cartItemId){
        Optional<CartItem> cartItemOptional = cartItemRepository.findById(cartItemId);
        if (cartItemOptional.isPresent()){
            CartItem cartItem = cartItemOptional.get();
            if (cartItem.getNoOfUnits() == 1){
                cartItemRepository.deleteById(cartItemId);
                cartItem.setNoOfUnits(cartItem.getNoOfUnits() - 1);
                return cartItem;
            } else if(cartItem.getNoOfUnits() > 1){
                cartItem.setNoOfUnits(cartItem.getNoOfUnits() - 1);
                cartItemRepository.save(cartItem);
                return cartItem;
            }
        }
        return null;
    }

    public CartItem addCartItemByCustomerUserNameAndProductId(String customerUserName, long productId) {
        Customer customer = customerService.getByUserName(customerUserName);
        if (customer == null) return null;
        long customerId = customer.getId();
        Optional<CartItem> optionalCartItem = cartItemRepository.findByCustomerIdAndProductId(customerId, productId);
        if (optionalCartItem.isPresent()){
            CartItem cartItem = optionalCartItem.get();
            cartItem.setNoOfUnits(cartItem.getNoOfUnits() + 1);
            cartItemRepository.save(cartItem);
            return cartItem;
        }
        else {
            long noOfUnits = 1;
            Product product = productService.getProductByProductId(productId);
            if (product == null) return null;

            CartItem cartItem = new CartItem(noOfUnits, product, customer);
            cartItemRepository.save(cartItem);
            return cartItem;
        }
    }
}
