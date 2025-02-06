package com.shagiesCode.FitnessTrackerServer.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JWTFilter extends OncePerRequestFilter {

    @Autowired
    private JWTUtils jwtUtils;

    @Autowired
    private ApplicationContext applicationContext;

    private static final Logger logger = LoggerFactory.getLogger(JWTFilter.class);

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        logger.info("Entering JWTFilter for request: {}", request.getRequestURI());

        // ✅ Handle CORS Preflight Requests (OPTIONS)
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            logger.info("Handling CORS preflight request for: {}", request.getRequestURI());
            response.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
            response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
            response.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type, Accept");
            response.setHeader("Access-Control-Allow-Credentials", "true");
            response.setStatus(HttpServletResponse.SC_OK);
            return; // 🚀 Stop further processing for preflight
        }

        // ✅ Extract Authorization Header
        String authHeader = request.getHeader("Authorization");
        String token = null;
        String username = null;

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            token = authHeader.substring(7);
            logger.debug("Extracted token: {}", token);
            username = jwtUtils.extractUserName(token);
            logger.debug("Extracted username from token: {}", username);
        } else {
            if (authHeader == null) {
                logger.warn("No Authorization header present in request: {}", request.getRequestURI());
            } else {
                logger.warn("Authorization header is malformed: {}", authHeader);
            }
        }

        // ✅ Validate Token & Set Authentication
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            try {
                UserDetails userDetails = applicationContext.getBean(CustomUserDetailsService.class).loadUserByUsername(username);
                if (jwtUtils.validateToken(token, userDetails)) {
                    logger.debug("Token validation succeeded for username: {}", username);
                    UsernamePasswordAuthenticationToken authenticationToken =
                            new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                    authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                    logger.debug("Authentication set for user: {}", username);
                } else {
                    logger.error("Token validation failed for username: {}", username);
                }
            } catch (Exception e) {
                logger.error("Unexpected error during JWT filtering: {}", e.getMessage(), e);
            }
        } else if (username != null) {
            logger.debug("Security context already contains authentication for: {}",
                    SecurityContextHolder.getContext().getAuthentication().getName());
        }

        logger.info("Exiting JWTFilter after processing request: {}", request.getRequestURI());
        filterChain.doFilter(request, response);
    }
}
