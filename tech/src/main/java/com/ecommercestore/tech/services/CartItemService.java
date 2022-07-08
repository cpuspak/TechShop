package com.ecommercestore.tech.services;


import com.ecommercestore.tech.model.CartItem;
import com.ecommercestore.tech.model.Customer;
import com.ecommercestore.tech.model.Product;
import com.ecommercestore.tech.repository.CartItemRepository;
import com.ecommercestore.tech.repository.ProductRepository;
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

    @Autowired
    ProductRepository productRepository;


    public long getCartItemCountByCustomerUserName(String customerUserName){
        Customer customer = customerService.getByUserName(customerUserName);
        long customerId = customer.getId();
        List<CartItem> cartItems = this.getCartItemsByCustomerId(customerId);

        long noOfCartItems = 0;

        for(CartItem cartItem: cartItems) {
            noOfCartItems += cartItem.getNoOfUnits();
        }

        return noOfCartItems;
        //return cartItemRepository.countByCustomerId(customerId);
    }

    private List<CartItem> getCartItemsByCustomerId(long customerId){
        return cartItemRepository.findByCustomerId(customerId);
    }

    private Optional<CartItem> getCartItemsByCustomerIdAndProductId(long customerId, long productId){
        return cartItemRepository.findByCustomerIdAndProductId(customerId, productId);
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

    public CartItem addCartItemByCustomerUserNameAndProductId(String customerUserName, long productId, long count) {
        Customer customer = customerService.getByUserName(customerUserName);
        System.out.println("flag0 " + customerUserName);
        if (customer == null) return null;
        long customerId = customer.getId();
        System.out.println("flag1");
        Product product = productService.getProductByProductId(productId);
        if (product == null) return null;
        System.out.println("flag2");
        if (product.getAvailableUnits() - count < 0) return null;
        System.out.println("flag3");

        Optional<CartItem> presentCartItem = this.getCartItemsByCustomerIdAndProductId(customerId, productId);
        CartItem cartItem;
        if (presentCartItem.isPresent()){
            cartItem = presentCartItem.get();
            cartItem.setNoOfUnits(cartItem.getNoOfUnits() + count);
        }
        else {
            cartItem = new CartItem(count, product, customer);
        }
        cartItemRepository.save(cartItem);
        product.setAvailableUnits(product.getAvailableUnits() - (int)count);
        productRepository.save(product);
        return cartItem;
    }
}
