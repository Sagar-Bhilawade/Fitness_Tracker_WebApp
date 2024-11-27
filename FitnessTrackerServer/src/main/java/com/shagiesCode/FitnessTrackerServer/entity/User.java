package com.shagiesCode.FitnessTrackerServer.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

@Data
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 50)
    @NotNull(message = "First name cannot be null")
    @Size(max = 50, message = "First name must not exceed 50 characters")
    private String firstName;

    @Column(nullable = false, length = 50)
    @NotNull(message = "Last name cannot be null")
    @Size(max = 50, message = "Last name must not exceed 50 characters")
    private String lastName;

    @Column(nullable = false, unique = true)
    @NotNull(message = "Email cannot be null")
    @Email(message = "Email must be valid")
    private String email;

    @Column(nullable = false)
    @NotNull(message = "Password cannot be null")
    @Size(min = 8, message = "Password must be at least 8 characters")
    private String password;

    @Column(nullable = false)
    @NotNull(message = "Contact number cannot be null")
    @Size(min = 10, max = 10, message = "Phone number must be exactly 10 digits")
    private String contactNumber;

}
