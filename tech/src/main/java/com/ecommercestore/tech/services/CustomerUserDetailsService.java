package com.ecommercestore.tech.services;

import com.ecommercestore.tech.model.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;

@Service
public class CustomerUserDetailsService implements UserDetailsService {
    @Autowired
    CustomerService customerService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Customer customer = customerService.getByUserName(username);
        if (customer == null){
            throw new UsernameNotFoundException("user name not found");
        }
        return new User(customer.getUserName(), customer.getPassword(), new ArrayList<>());
    }
}
