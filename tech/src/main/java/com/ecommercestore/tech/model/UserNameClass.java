package com.ecommercestore.tech.model;

import java.io.Serializable;

public class UserNameClass implements Serializable {
    private String userName;

    public UserNameClass(){
        
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public UserNameClass(String userName) {
        this.userName = userName;
    }

    @Override
    public String toString() {
        return "UserNameClass{" +
                "userName='" + userName + '\'' +
                '}';
    }
}
