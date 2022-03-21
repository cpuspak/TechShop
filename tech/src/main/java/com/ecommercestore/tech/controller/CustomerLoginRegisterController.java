package com.ecommercestore.tech.controller;

import com.ecommercestore.tech.model.Customer;
import com.ecommercestore.tech.model.UserAuthenticationBody;
import com.ecommercestore.tech.model.UserAuthenticationResponse;
import com.ecommercestore.tech.model.UserRegistrationBody;
import com.ecommercestore.tech.services.CustomerService;
import com.ecommercestore.tech.services.CustomerUserDetailsService;
import com.ecommercestore.tech.utils.JwtUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/customer")
@CrossOrigin
public class CustomerLoginRegisterController {

    @Autowired
    CustomerService customerService;

    @Autowired
    CustomerUserDetailsService customerUserDetailsService;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    JwtUtil jwtUtil;

    @GetMapping("/login/unsecuredPath")
    String unsecurePath(){
        return "unsecurePath";
    }

    @PostMapping("/authenticate")
    ResponseEntity<?> createAuthenticationHeader(@RequestBody UserAuthenticationBody userAuthenticationBody)
    throws  Exception{
        try {
            log.info(userAuthenticationBody.toString());
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(userAuthenticationBody.getUserName(),
                            userAuthenticationBody.getPassword())
            );
        } catch (BadCredentialsException e) {
            throw new Exception("Incorrect username or password", e);
        }

        final UserDetails userDetails = customerUserDetailsService.loadUserByUsername(
                userAuthenticationBody.getUserName()
        );

        final String jwt = jwtUtil.generateToken(userDetails);

        return ResponseEntity.ok(new UserAuthenticationResponse(jwt));
    }

    @PostMapping("/registerCustomer")
    ResponseEntity<?> registerCustomer(@RequestBody UserRegistrationBody userRegistrationBody) throws Exception {
        try{
            Customer customer = customerService.registerCustomer(userRegistrationBody);
            return ResponseEntity.ok().body(customer);
        } catch (Exception e) {
            throw new Exception("Unable to save customer details", e);
        }
    }


}
