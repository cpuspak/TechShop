package com.ecommercestore.tech.securityConfig;


import com.ecommercestore.tech.filter.JwtCustomFilter;
import com.ecommercestore.tech.services.CustomerUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    CustomerUserDetailsService customerUserDetailsService;

    @Autowired
    JwtCustomFilter jwtCustomFilter;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(customerUserDetailsService);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable().authorizeRequests().antMatchers("/customer/authenticate").permitAll()
                .antMatchers("/customer/registerCustomer").permitAll()
                .antMatchers("/productCategories/getAllProductCategories").permitAll()
                .antMatchers("/product/getByProductCategoryId").permitAll()
                .antMatchers("/product/getByProductCategoryName").permitAll()
                .antMatchers("/product/getById").permitAll()
                .antMatchers("/cartItem/getNumberOfCartItemsByCustomerUserName").permitAll()
                .antMatchers("/cartItem/getCartItemsByCustomerUserName").permitAll()
                .antMatchers("/cartItem/removeCartItemByCartItemId").permitAll()
                .antMatchers("/cartItem/addCartItemByCustomerIdAndProductId").permitAll()
                .antMatchers("/cartItem/checkoutCartItemByCartItemsList").permitAll()
                .antMatchers("/product/getByProductCategoryNameAndPrice").permitAll()
                .anyRequest().authenticated().and()
                .exceptionHandling().and().sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http.addFilterBefore(jwtCustomFilter, UsernamePasswordAuthenticationFilter.class);
    }


    @Bean
    PasswordEncoder passwordEncoder() {
        //return NoOpPasswordEncoder.getInstance();
        return new BCryptPasswordEncoder();
    }

    @Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception{
        return super.authenticationManagerBean();
    }
}
