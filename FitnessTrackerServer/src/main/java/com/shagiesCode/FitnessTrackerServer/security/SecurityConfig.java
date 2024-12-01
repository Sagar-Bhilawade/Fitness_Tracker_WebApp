package com.shagiesCode.FitnessTrackerServer.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration //
@EnableWebSecurity
public class SecurityConfig {
    @Autowired
    private final PasswordEncoder encoder;
    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private JWTFilter  jwtFilter;

    public SecurityConfig(PasswordEncoder encoder) {
        this.encoder = encoder;
    }

    //A bean method which will replace spring security chain by its own security chain
    @Bean
    public SecurityFilterChain customSecurityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(csrf -> csrf.disable()) // Disable CSRF for stateless APIs
                .authorizeHttpRequests(requests -> requests
                        .requestMatchers("/api/signup", "/api/signin").permitAll() // Public endpoints
                        .requestMatchers("/api/admin/**").hasRole("ADMIN") // Only ADMIN role can access admin APIs
                        .requestMatchers("/api/**").hasAnyRole("USER", "ADMIN") // All other API endpoints for USER or ADMIN
                        .anyRequest().authenticated() // Any other request requires authentication
                )
                .httpBasic(Customizer.withDefaults()) // Basic authentication
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // Stateless session
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class) // JWT filter
                .build();
    }

    @Bean
    public AuthenticationProvider customAuthentication()
    {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setPasswordEncoder(encoder);
        provider.setUserDetailsService(userDetailsService);
        return  provider;
    }

    @Bean
    public AuthenticationManager customAuthenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }


}
