// src/data/projects.ts
// Catálogo interno de proyectos (Regla 5)
// Toda la información está extraída de los proyectos reales (Regla 2)
// Fuentes: pom.xml, README.md, package.json, estructura de carpetas y código fuente

import type { Project } from '../types';

export const projects: Project[] = [
  // ──────────────────────────────────────────────
  // PROYECTO 1: InvestLab
  // Fuente: /InvestLab/backend/pom.xml, src/main/java/...
  // ──────────────────────────────────────────────
  {
    title: "InvestLab",
    slug: "investlab",
    image: "/img/images/InvestLab/Panel_inversiones.jpg",
    technologies: ["Java", "Spring Boot", "Spring Security", "JWT", "MySQL", "H2", "Swagger", "React", "TypeScript"],
    links: {
      github: "https://github.com/JAMureR/InvestLab",
      web: "https://javiermuredev.com/InvestLab/",
    },
    description: "Plataforma de simulación de inversiones con arquitectura desacoplada. Backend Spring Boot 3.3 con API REST securizada mediante JWT (Auth0), documentación Swagger/OpenAPI, Spring Actuator para monitorización y persistencia con Spring Data JPA.",
    architecture: "Arquitectura por capas (Controller → Service → Repository) con seguridad stateless JWT",
    type: "java",
    status: "completed",
    features: [
      "Simulación de inversiones con fondos indexados y cuentas remuneradas",
      "Autenticación y autorización con JWT (biblioteca Auth0)",
      "API REST documentada con Swagger/OpenAPI (SpringDoc)",
      "CRUD completo de simulaciones con validación (@Valid)",
      "Monitorización con Spring Actuator",
      "Control de acceso por roles con @EnableMethodSecurity",
    ],
    codeFiles: [
      {
        name: "SecurityConfig.java",
        icon: "fa-solid fa-shield-halved",
        color: "#6DB33F",
        description: "Configuración centralizada de Spring Security: JWT stateless, CSRF deshabilitado, rutas públicas vs protegidas, integración con Swagger y H2 Console.",
        code: `package com.javiermuredev.investlab.config.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * Configuración centralizada de Spring Security para la API REST.
 * Usa JWT stateless (sin sesiones), BCrypt para contraseñas,
 * y define las rutas públicas vs protegidas.
 */
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    private final JwtFilter jwtFilter;

    public SecurityConfig(JwtFilter jwtFilter) {
        this.jwtFilter = jwtFilter;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            // Desactivar CSRF para API REST stateless
            .csrf(csrf -> csrf.disable())

            // Permitir frames para la consola H2
            .headers(headers -> headers.frameOptions(frame -> frame.disable()))

            // Política de sesiones: STATELESS (todo vía JWT)
            .sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )

            // Reglas de autorización
            .authorizeHttpRequests(auth -> auth
                // Rutas públicas
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/funds/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/accounts/**").permitAll()

                // Swagger / OpenAPI
                .requestMatchers("/swagger-ui/**", "/swagger-ui.html").permitAll()
                .requestMatchers("/v3/api-docs/**").permitAll()

                // Actuator
                .requestMatchers("/actuator/**").permitAll()

                // H2 Console (solo desarrollo)
                .requestMatchers("/h2-console/**").permitAll()

                // Todo lo demás requiere autenticación
                .anyRequest().authenticated()
            )

            // Insertar el filtro JWT antes del filtro de autenticación por defecto
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}`,
      },
      {
        name: "JwtFilter.java",
        icon: "fa-solid fa-key",
        color: "#F50057",
        description: "Filtro HTTP que intercepta cada petición, extrae el JWT de la cabecera Authorization (Bearer), valida la firma y establece el contexto de seguridad de Spring.",
        code: `package com.javiermuredev.investlab.config.security;

import com.javiermuredev.investlab.repository.UserRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

/**
 * Filtro que intercepta cada petición HTTP, extrae el JWT de la cabecera
 * Authorization y establece el contexto de seguridad de Spring Security.
 */
@Component
public class JwtFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;

    public JwtFilter(JwtUtil jwtUtil, UserRepository userRepository) {
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);

            if (jwtUtil.isTokenValid(token)) {
                String username = jwtUtil.extractUsername(token);

                userRepository.findByUsername(username).ifPresent(user -> {
                    SimpleGrantedAuthority authority = new SimpleGrantedAuthority(user.getRole());
                    UsernamePasswordAuthenticationToken authentication =
                            new UsernamePasswordAuthenticationToken(
                                    user, null, List.of(authority)
                            );
                    authentication.setDetails(
                            new WebAuthenticationDetailsSource().buildDetails(request)
                    );
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                });
            }
        }

        filterChain.doFilter(request, response);
    }
}`,
      },
      {
        name: "JwtUtil.java",
        icon: "fa-solid fa-user-lock",
        color: "#06B6D4",
        description: "Servicio de generación y validación de tokens JWT usando Auth0. Firma HMAC256, extracción de claims (username, role) y verificación de expiración.",
        code: `package com.javiermuredev.investlab.config.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtil {

    @Value("\${jwt.secret}")
    private String secret;

    @Value("\${jwt.expiration-ms}")
    private long expirationMs;

    /**
     * Genera un token JWT firmado con el username como subject y el rol como claim.
     */
    public String generateToken(String username, String role) {
        return JWT.create()
                .withSubject(username)
                .withClaim("role", role)
                .withIssuedAt(new Date())
                .withExpiresAt(new Date(System.currentTimeMillis() + expirationMs))
                .withIssuer("investlab-api")
                .sign(Algorithm.HMAC256(secret));
    }

    /**
     * Extrae el username (subject) de un token válido.
     */
    public String extractUsername(String token) {
        DecodedJWT jwt = verifyToken(token);
        return jwt.getSubject();
    }

    /**
     * Verifica la firma y expiración del token.
     */
    public DecodedJWT verifyToken(String token) throws JWTVerificationException {
        JWTVerifier verifier = JWT.require(Algorithm.HMAC256(secret))
                .withIssuer("investlab-api")
                .build();
        return verifier.verify(token);
    }

    /**
     * Comprueba si un token es válido (firma correcta y no expirado).
     */
    public boolean isTokenValid(String token) {
        try {
            verifyToken(token);
            return true;
        } catch (JWTVerificationException e) {
            return false;
        }
    }
}`,
      },
      {
        name: "SimulationController.java",
        icon: "fa-solid fa-code",
        color: "#f89820",
        description: "Controlador REST con CRUD de simulaciones, documentado con Swagger (@Operation, @Tag), validación con @Valid y seguridad con @AuthenticationPrincipal.",
        code: `package com.javiermuredev.investlab.controller;

import com.javiermuredev.investlab.dto.SimulationRequest;
import com.javiermuredev.investlab.dto.SimulationResponse;
import com.javiermuredev.investlab.model.User;
import com.javiermuredev.investlab.service.SimulationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/simulations")
@Tag(name = "Simulaciones", description = "CRUD de simulaciones guardadas por el usuario")
@SecurityRequirement(name = "bearerAuth")
public class SimulationController {

    private final SimulationService simulationService;

    public SimulationController(SimulationService simulationService) {
        this.simulationService = simulationService;
    }

    @PostMapping
    @Operation(summary = "Guardar simulación", description = "Persiste una nueva configuración de simulación en el historial del usuario")
    public ResponseEntity<SimulationResponse> saveSimulation(
            @Valid @RequestBody SimulationRequest request,
            @AuthenticationPrincipal User user) {
        SimulationResponse response = simulationService.saveSimulation(request, user);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    @Operation(summary = "Listar simulaciones", description = "Devuelve todas las simulaciones guardadas del usuario autenticado")
    public ResponseEntity<List<SimulationResponse>> getUserSimulations(
            @AuthenticationPrincipal User user) {
        List<SimulationResponse> simulations = simulationService.getUserSimulations(user.getId());
        return ResponseEntity.ok(simulations);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar simulación", description = "Elimina una simulación del historial del usuario")
    public ResponseEntity<Map<String, String>> deleteSimulation(
            @PathVariable Long id,
            @AuthenticationPrincipal User user) {
        simulationService.deleteSimulation(id, user.getId());
        return ResponseEntity.ok(Map.of("message", "Simulación eliminada correctamente"));
    }
}`,
      },
    ],
  },

  // ──────────────────────────────────────────────
  // PROYECTO 2: Aura Studio
  // Fuente: /Eclipse/Ecommerce---Spring-Boot-React/README.md, pom.xml, src/...
  // ──────────────────────────────────────────────
  {
    title: "Aura Studio",
    slug: "aura-studio",
    image: "/img/images/luxeaura/luxeaura.jpg",
    technologies: ["Java", "Spring Boot", "Spring Security", "JWT", "MySQL", "React", "TypeScript", "Vite", "TailwindCSS"],
    links: {
      github: "https://github.com/JAMureR/Ecommerce---Spring-Boot-React",
      web: "https://javiermuredev.com/AuraStudio/",
    },
    description: "Plataforma e-commerce de moda de lujo con Spring Boot 4.0.5 (Java 21) y React 19. Autenticación JWT con jjwt 0.11.5, persistencia MySQL con Spring Data JPA, filtrado avanzado de productos y modo dual backend/mock para Hostinger.",
    architecture: "Arquitectura desacoplada (Backend REST + Frontend SPA) con filtro JWT stateless",
    type: "java",
    status: "completed",
    features: [
      "Catálogo con 80 productos, filtrado por categoría, precio y búsqueda combinada",
      "Carrito interactivo con persistencia en contexto React",
      "Autenticación JWT con Spring Security y BCrypt",
      "Sistema de roles y rutas protegidas",
      "Blog de moda con 6 artículos premium",
      "Integración con Google Gemini AI para recomendaciones",
      "Modo dual: backend Spring Boot o datos mock para hosting estático",
    ],
    codeFiles: [
      {
        name: "SecurityConfig.java",
        icon: "fa-solid fa-shield-halved",
        color: "#6DB33F",
        description: "Configuración de seguridad del e-commerce: CSRF deshabilitado, CORS multi-origen, filtro JWT, rutas públicas para productos y autenticación requerida para carrito.",
        code: `package com.bc.backend_tienda.demo.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.util.List;

@Configuration
public class SecurityConfig {

    @Autowired
    private JwtRequestFilter jwtRequestFilter;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .cors(cors -> {})
            .headers(headers -> headers.frameOptions(frame -> frame.disable()))
            .authorizeHttpRequests(auth -> auth
                // Autenticación pública
                .requestMatchers("/api/auth/**").permitAll()
                // Productos públicos
                .requestMatchers("/api/products/**").permitAll()
                // El carrito requiere autenticación
                .requestMatchers("/api/cart/**").authenticated()
                // El resto requiere autenticación
                .anyRequest().authenticated()
            )
            .addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of(
            "http://localhost:3000", "http://localhost:5173"
        ));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setExposedHeaders(List.of("Authorization"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}`,
      },
      {
        name: "ProductController.java",
        icon: "fa-solid fa-code",
        color: "#f89820",
        description: "Controlador REST del catálogo de productos: CRUD completo + filtrado por nombre, categoría, precio y búsqueda combinada con múltiples criterios.",
        code: `package com.bc.backend_tienda.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.bc.backend_tienda.demo.model.Product;
import com.bc.backend_tienda.demo.repository.ProductRepository;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    // GET ALL
    @GetMapping
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // GET BY ID
    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Long id) {
        Optional<Product> product = productRepository.findById(id);
        return product.orElse(null);
    }

    // CREATE
    @PostMapping
    public Product createProduct(@RequestBody Product product) {
        return productRepository.save(product);
    }

    // Filtro combinado multi-criterio
    @GetMapping("/search")
    public List<Product> search(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice
    ) {
        if(name != null && category != null && minPrice != null && maxPrice != null) {
            return productRepository.findByNameContainingIgnoreCaseAndCategoryAndPriceBetween(
                    name, category, minPrice, maxPrice);
        }
        if(name != null && category != null) {
            return productRepository.findByNameContainingIgnoreCaseAndCategory(name, category);
        }
        if(category != null && minPrice != null && maxPrice != null) {
            return productRepository.findByCategoryAndPriceBetween(category, minPrice, maxPrice);
        }
        if(name != null) {
            return productRepository.findByNameContainingIgnoreCase(name);
        }
        if(category != null) {
            return productRepository.findByCategory(category);
        }
        if(minPrice != null && maxPrice != null) {
            return productRepository.findByPriceBetween(minPrice, maxPrice);
        }
        return productRepository.findAll();
    }
}`,
      },
      {
        name: "Product.java",
        icon: "fa-solid fa-database",
        color: "#4DB33D",
        description: "Entidad JPA que mapea la tabla de productos en MySQL. Incluye campos para catálogo, precios y categorías, con persistencia automática de fechas.",
        code: `package com.bc.backend_tienda.demo.model;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, length = 1000)
    private String description;

    @Column(nullable = false)
    private Double price;

    @Column(nullable = false)
    private String category;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "created_at", updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt = new Date();

    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public Date getCreatedAt() { return createdAt; }
    public void setCreatedAt(Date createdAt) { this.createdAt = createdAt; }
}`,
      },
      {
        name: "JwtRequestFilter.java",
        icon: "fa-solid fa-filter",
        color: "#E34F26",
        description: "Filtro personalizado que intercepta peticiones HTTP para extraer y validar el token JWT, estableciendo el contexto de seguridad en la aplicación.",
        code: `package com.bc.backend_tienda.demo.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {

        final String authorizationHeader = request.getHeader("Authorization");

        String username = null;
        String jwt = null;

        // Extraer JWT de la cabecera Authorization
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            jwt = authorizationHeader.substring(7);
            username = jwtUtil.extractUsername(jwt);
        }

        // Validar token y autenticar
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);

            if (jwtUtil.validateToken(jwt, userDetails)) {
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }
        chain.doFilter(request, response);
    }
}`,
      },
    ],
  },

  // ──────────────────────────────────────────────
  // PROYECTO 3: PWeb
  // Fuente: /Eclipse/PWeb/README.md, pom.xml
  // ──────────────────────────────────────────────
  {
    title: "PWeb",
    slug: "pweb",
    image: "/img/images/pweb/pweb.jpg",
    technologies: ["Angular", "Java", "Spring Boot", "MySQL"],
    links: {
      github: "https://github.com/JAMureR/Pweb",
      web: "https://javiermuredev.com/pweb",
    },
    description: "Plataforma web premium con Spring Boot 3.5.5 (Java 17) como backend y Angular en el frontend. Proyecto en construcción enfocado en la integración front-back y componentes Angular reutilizables.",
    architecture: "Arquitectura desacoplada (Spring Boot REST API + Angular SPA)",
    type: "java",
    status: "in-progress",
    features: [
      "Interfaz responsiva con diseño moderno Angular",
      "Separación front-end/back-end con arquitectura escalable",
      "Componentes Angular reutilizables",
      "Conexión con backend Java para lógica de negocio",
      "Preparado para login de usuario y gestión de usuarios",
    ],
    codeFiles: [],
  },

  // ──────────────────────────────────────────────
  // PROYECTO 4: Casaydecor
  // ──────────────────────────────────────────────
  {
    title: "Casaydecor",
    slug: "casaydecor",
    image: "/img/images/casaydecor/wordpress 1.jpg",
    technologies: ["WordPress", "PHP", "CSS3"],
    links: {
      web: "https://casaydecor.com/",
    },
    description: "Portal de propiedades inmobiliarias desarrollado con WordPress avanzado para Pyramica Net Services. Configuración profesional de plantillas, SEO y optimización de rendimiento.",
    architecture: "WordPress con plantillas personalizadas",
    type: "other",
    status: "completed",
    features: [
      "Portal inmobiliario con catálogo de propiedades",
      "Diseño responsive con CSS personalizado",
      "SEO optimizado para posicionamiento",
      "Configuración profesional de WordPress",
    ],
    codeFiles: [],
  },

  // ──────────────────────────────────────────────
  // PROYECTO 5: Mareinmo
  // ──────────────────────────────────────────────
  {
    title: "Mareinmo",
    slug: "mareinmo",
    image: "/img/images/mareinmo/mareinmo.jpg",
    technologies: ["WordPress", "PHP", "CSS3"],
    links: {
      web: "https://mareinmo.com/",
    },
    description: "Plataforma web de gestión y visualización de propiedades inmobiliarias desarrollada con WordPress y configuración avanzada para Pyramica Net Services.",
    architecture: "WordPress con configuración avanzada",
    type: "other",
    status: "completed",
    features: [
      "Gestión de propiedades inmobiliarias",
      "Visualización avanzada con galerías",
      "Diseño responsive profesional",
      "Configuración de plugins especializados",
    ],
    codeFiles: [],
  },

  // ──────────────────────────────────────────────
  // PROYECTO 6: LifeCapture
  // Fuente: /LifeCapture/README.md, composer.json
  // ──────────────────────────────────────────────
  {
    title: "LifeCapture",
    slug: "lifecapture",
    image: "/img/images/lifecapture/lifeCapture.png",
    technologies: ["PHP", "Laravel", "TailwindCSS", "MySQL"],
    links: {
      github: "https://github.com/JAMureR/LifeCapture",
      web: "https://lifecapture.javiermuredev.com/login",
    },
    description: "Red social completa desarrollada con Laravel 10 y Breeze. Implementa MVC, autenticación, CRUD completo de publicaciones, gestión de perfiles, sistema de likes/dislikes y comentarios.",
    architecture: "MVC (Model-View-Controller) con Laravel y Blade Templates",
    type: "other",
    status: "completed",
    features: [
      "Registro e inicio de sesión con Laravel Breeze",
      "CRUD de perfiles: crear, editar, eliminar y buscar",
      "Publicaciones con subida de imágenes",
      "Sistema de likes y dislikes en publicaciones y comentarios",
      "Comentarios con CRUD completo",
      "Filtros de contenido por categorías",
      "Sistema de notificaciones",
      "Configuración de privacidad",
    ],
    codeFiles: [],
  },

  // ──────────────────────────────────────────────
  // PROYECTO 7: Portfolio 1.0
  // ──────────────────────────────────────────────
  {
    title: "Mi Portfolio 1.0",
    slug: "portfolio-v1",
    image: "/img/images/porftolio/portfolio.png",
    technologies: ["JavaScript", "HTML5", "CSS3"],
    links: {
      github: "https://github.com/JAMureR/Portfolio",
    },
    description: "La versión previa de este espacio personal, enfocada en la simplicidad. Desarrollado con HTML, CSS y JavaScript vanilla.",
    architecture: "Single Page estática con HTML/CSS/JS",
    type: "other",
    status: "completed",
    features: [
      "Diseño responsive con CSS puro",
      "Animaciones con JavaScript vanilla",
      "Estructura semántica HTML5",
    ],
    codeFiles: [],
  },
];

/** Helper: proyectos Java */
export const javaProjects = projects.filter(p => p.type === 'java');

/** Helper: otros proyectos */
export const otherProjects = projects.filter(p => p.type === 'other');

/** Helper: todos los proyectos con código disponible */
export const projectsWithCode = projects.filter(p => p.codeFiles.length > 0);
