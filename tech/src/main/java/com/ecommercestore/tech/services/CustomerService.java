package com.ecommercestore.tech.services;

import com.ecommercestore.tech.model.Customer;
import com.ecommercestore.tech.model.UserRegistrationBody;
import com.ecommercestore.tech.repository.CustomerRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class CustomerService {
    @Autowired
    CustomerRepository customerRepository;

    public Customer getByUserName(String userName){
        return customerRepository.findByUserName(userName);
    }

    public Customer registerCustomer(UserRegistrationBody userRegistrationBody) throws Exception {
        try{
            String userName = userRegistrationBody.getUserName();
            String name = userRegistrationBody.getName();
            String address = userRegistrationBody.getAddress();
            String encodedPassword = new BCryptPasswordEncoder().encode(userRegistrationBody.getPassword());
            Customer customer = new Customer(userName, name, encodedPassword, address);
            customerRepository.save(customer);
            return customer;
        } catch (Exception e) {
            throw new Exception("Unable to register", e);
        }
    }
}
