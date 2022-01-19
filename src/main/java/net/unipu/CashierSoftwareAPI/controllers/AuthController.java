package net.unipu.CashierSoftwareAPI.controllers;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.validation.Valid;

import net.unipu.CashierSoftwareAPI.exception.TokenRefreshException;
import net.unipu.CashierSoftwareAPI.models.RefreshToken;
import net.unipu.CashierSoftwareAPI.payload.request.LogOutRequest;
import net.unipu.CashierSoftwareAPI.payload.request.TokenRefreshRequest;
import net.unipu.CashierSoftwareAPI.payload.response.TokenRefreshResponse;
import net.unipu.CashierSoftwareAPI.security.services.RefreshTokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import net.unipu.CashierSoftwareAPI.models.ERole;
import net.unipu.CashierSoftwareAPI.models.Role;
import net.unipu.CashierSoftwareAPI.models.User;
import net.unipu.CashierSoftwareAPI.payload.request.LoginRequest;
import net.unipu.CashierSoftwareAPI.payload.request.SignupRequest;
import net.unipu.CashierSoftwareAPI.payload.response.JwtResponse;
import net.unipu.CashierSoftwareAPI.payload.response.MessageResponse;
import net.unipu.CashierSoftwareAPI.repository.RoleRepository;
import net.unipu.CashierSoftwareAPI.repository.UserRepository;
import net.unipu.CashierSoftwareAPI.security.jwt.JwtUtils;
import net.unipu.CashierSoftwareAPI.security.services.UserDetailsImpl;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
  @Autowired
  AuthenticationManager authenticationManager;

  @Autowired
  UserRepository userRepository;

  @Autowired
  RoleRepository roleRepository;

  @Autowired
  PasswordEncoder encoder;

  @Autowired
  JwtUtils jwtUtils;

  @Autowired
  RefreshTokenService refreshTokenService;

  @PostMapping("/signin")
  public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

    Authentication authentication = authenticationManager
            .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

    SecurityContextHolder.getContext().setAuthentication(authentication);

    UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

    String jwt = jwtUtils.generateJwtToken(userDetails);

    List<String> roles = userDetails.getAuthorities().stream().map(GrantedAuthority::getAuthority)
            .collect(Collectors.toList());

    RefreshToken refreshToken = refreshTokenService.createRefreshToken(userDetails.getId());

    return ResponseEntity.ok(new JwtResponse(jwt, refreshToken.getToken(), userDetails.getId(),
            userDetails.getUsername(), userDetails.getEmail(), roles));
  }

  @PostMapping("/signup")
  public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
    if (userRepository.existsByUsername(signUpRequest.getUsername())) {
      return ResponseEntity.badRequest().body(new MessageResponse("Error: Username is already taken!"));
    }

    if (userRepository.existsByEmail(signUpRequest.getEmail())) {
      return ResponseEntity.badRequest().body(new MessageResponse("Error: Email is already in use!"));
    }

    // Create new user's account
    User user = new User(signUpRequest.getUsername(), signUpRequest.getEmail(),
            encoder.encode(signUpRequest.getPassword()));

    Set<String> strRoles = signUpRequest.getRole();
    Set<Role> roles = new HashSet<>();

    if (strRoles == null) {
      Role userRole = roleRepository.findByName(ERole.ROLE_USER)
              .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
      roles.add(userRole);
    } else {
      strRoles.forEach(role -> {
        switch (role) {
          case "admin" -> {
            Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(adminRole);
          }
          case "mod" -> {
            Role modRole = roleRepository.findByName(ERole.ROLE_MODERATOR)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(modRole);
          }
          default -> {
            Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
          }
        }
      });
    }

    user.setRoles(roles);
    userRepository.save(user);

    return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
  }

  @PostMapping("/refreshtoken")
  public ResponseEntity<?> refreshtoken(@Valid @RequestBody TokenRefreshRequest request) {
    String requestRefreshToken = request.getRefreshToken();

    return refreshTokenService.findByToken(requestRefreshToken)
            .map(refreshTokenService::verifyExpiration)
            .map(RefreshToken::getUser)
            .map(user -> {
              String token = jwtUtils.generateTokenFromUsername(user.getUsername());
              return ResponseEntity.ok(new TokenRefreshResponse(token, requestRefreshToken));
            })
            .orElseThrow(() -> new TokenRefreshException(requestRefreshToken,
                    "Refresh token is not in database!"));
  }

  @PostMapping("/logout")
  public ResponseEntity<?> logoutUser(@Valid @RequestBody LogOutRequest logOutRequest) {
    refreshTokenService.deleteByUserId(logOutRequest.getUserId());
    return ResponseEntity.ok(new MessageResponse("Log out successful!"));
  }

}