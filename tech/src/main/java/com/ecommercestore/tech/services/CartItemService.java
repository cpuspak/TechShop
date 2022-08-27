package com.ecommercestore.tech.services;


import com.ecommercestore.tech.model.CartItem;
import com.ecommercestore.tech.model.Customer;
import com.ecommercestore.tech.model.Product;
import com.ecommercestore.tech.repository.CartItemRepository;
import com.ecommercestore.tech.repository.CustomerRepository;
import com.ecommercestore.tech.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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

    @Autowired
    CustomerRepository customerRepository;


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
        List<CartItem> returnListUnfiltered = cartItemRepository.findByCustomerId(customerId);
        for(int i = 0 ; i < returnListUnfiltered.size() ; i++)
            returnListUnfiltered.get(i).setCustomer(null);

        return returnListUnfiltered;
    }

    public CartItem removeCartItemByCartItemId(long cartItemId){
        Optional<CartItem> cartItemOptional = cartItemRepository.findById(cartItemId);
        if (cartItemOptional.isPresent()){
            CartItem cartItem = cartItemOptional.get();
            cartItemRepository.deleteById(cartItemId);
//            if (cartItem.getNoOfUnits() == 1){
//                cartItemRepository.deleteById(cartItemId);
//                cartItem.setNoOfUnits(cartItem.getNoOfUnits() - 1);
//                return cartItem;
//            } else if(cartItem.getNoOfUnits() > 1){
//                cartItem.setNoOfUnits(cartItem.getNoOfUnits() - 1);
//                cartItemRepository.save(cartItem);
//                return cartItem;
//            }
            cartItem.setCustomer(null);
            return cartItem;
        }
        return null;
    }

    public  List<CartItem> deleteCartItemsByCartItemsList(List<CartItem> cartItemList){
        ArrayList<Long> cartItemIds = new ArrayList<>();
        for(CartItem cartItem: cartItemList) cartItemIds.add(cartItem.getId());
        cartItemRepository.deleteAllById(cartItemIds);
        List<CartItem> remainingCartItems = cartItemRepository.findAll();
        return remainingCartItems;
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
            if (cartItem.getNoOfUnits()+count > product.getAvailableUnits()) return null;
            cartItem.setNoOfUnits(cartItem.getNoOfUnits() + count);
        }
        else {
            cartItem = new CartItem(count, product, customer);
        }
        cartItemRepository.save(cartItem);
//        product.setAvailableUnits(product.getAvailableUnits() - (int)count);
//        productRepository.save(product);
        return cartItem;
    }

    public List<CartItem> checkoutCartItemByCartItemsList(List<CartItem> cartItemList) throws Exception{

        List<CartItem> cartItemsReturnList = new ArrayList<>();
        for(int i = 0 ; i < cartItemList.size() ; i++) {
            CartItem tempCartItem = cartItemList.get(i);
            Product tempProduct = tempCartItem.getProduct();
            System.out.println(tempCartItem.getNoOfUnits());
            System.out.println(tempProduct.getAvailableUnits());
            if (tempCartItem.getNoOfUnits() > tempProduct.getAvailableUnits()) {
                tempCartItem.setInvalidNoOfItems(1);
                System.out.println(tempProduct.getName());
                cartItemsReturnList.add(tempCartItem);
            }
        }

        return cartItemsReturnList;
//        List<CartItem> emptyList = new ArrayList<>();
//        if (flag == 1)
//            return cartItemsReturnList;
//        else return emptyList;
    }

}
