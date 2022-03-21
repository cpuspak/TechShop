package com.ecommercestore.tech.model;

import org.springframework.security.authentication.AuthenticationManager;

import java.io.Serializable;

public class UserAuthenticationResponse implements Serializable {
    private final String jwt;

    public UserAuthenticationResponse(String jwt){
        this.jwt = jwt;
    }

    public String getJwt(){
        return this.jwt;
    }
}
