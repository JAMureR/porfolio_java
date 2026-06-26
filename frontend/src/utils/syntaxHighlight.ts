// src/utils/syntaxHighlight.ts
// Función de resaltado de sintaxis Java extraída de Projects.tsx

/**
 * Aplica resaltado de sintaxis a código Java.
 * Soporta: comentarios, strings, anotaciones, keywords, clases/tipos.
 * Devuelve HTML con spans coloreados.
 */
export const highlightJava = (code: string): string => {
  const strings: string[] = [];
  const comments: string[] = [];

  // Escapar HTML
  let html = code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // 1. Extraer strings para que no interfieran
  html = html.replace(/("[^"\\]*(?:\\.[^"\\]*)*")/g, (match) => {
    strings.push(`<span class="text-green-400 font-medium">${match}</span>`);
    return `___STRING_TOKEN_${strings.length - 1}___`;
  });

  // 2. Extraer comentarios multilinea
  html = html.replace(/(\/\*[\s\S]*?\*\/)/g, (match) => {
    comments.push(`<span class="text-gray-500 italic">${match}</span>`);
    return `___COMMENT_TOKEN_${comments.length - 1}___`;
  });

  // 3. Extraer comentarios de una linea
  html = html.replace(/(\/\/.*)/g, (match) => {
    comments.push(`<span class="text-gray-500 italic">${match}</span>`);
    return `___COMMENT_TOKEN_${comments.length - 1}___`;
  });

  // 4. Anotaciones de Spring/Java
  html = html.replace(/(@\w+)/g, '<span class="text-yellow-500 font-semibold">$1</span>');

  // 5. Palabras clave Java
  const keywords = [
    "package", "import", "public", "private", "protected", "class", "interface",
    "extends", "implements", "return", "new", "throw", "try", "catch", "final",
    "static", "void", "boolean", "int", "long", "double", "float", "if", "else",
    "for", "while", "this", "super", "null", "true", "false", "throws"
  ];
  keywords.forEach(keyword => {
    const regex = new RegExp(`\\b(${keyword})\\b`, 'g');
    html = html.replace(regex, '<span class="text-[#ff79c6] font-bold">$1</span>');
  });

  // 6. Clases y Tipos comunes en Spring Boot
  const classes = [
    "SecurityFilterChain", "HttpSecurity", "JwtFilter", "JwtRequestFilter", "JwtAuthenticationFilter",
    "UsernamePasswordAuthenticationToken", "SecurityContextHolder", "UserDetails", "UserDetailsService",
    "JwtTokenProvider", "JwtUtil", "Authentication", "AuthenticationPrincipal",
    "String", "Long", "Integer", "Boolean", "ResponseEntity", "RestController", "Autowired",
    "GetMapping", "PostMapping", "PutMapping", "DeleteMapping", "RequestMapping",
    "RequestBody", "PathVariable", "RequestParam", "PreAuthorize", "Bean", "Configuration",
    "EnableWebSecurity", "EnableMethodSecurity", "Component", "Service", "Repository", "Transactional",
    "Exception", "RuntimeException", "JWTVerificationException",
    "List", "Optional", "Map", "Collections", "User", "Product", "Investment",
    "InvestmentRepository", "UserRepository", "ProductRepository",
    "BCryptPasswordEncoder", "PasswordEncoder",
    "OncePerRequestFilter", "HttpServletRequest", "HttpServletResponse", "FilterChain",
    "Claims", "Jwts", "JWT", "Algorithm", "SignatureAlgorithm", "DecodedJWT", "JWTVerifier",
    "Keys", "Key", "Date", "HashMap", "Function", "Void", "System",
    "HttpMethod", "SessionCreationPolicy",
    "CorsConfiguration", "CorsConfigurationSource", "UrlBasedCorsConfigurationSource",
    "SimpleGrantedAuthority", "WebAuthenticationDetailsSource",
    "SimulationRequest", "SimulationResponse", "SimulationService",
    "HttpStatus", "Valid", "Operation", "Tag", "SecurityRequirement",
    "Value"
  ];
  classes.forEach(cls => {
    const regex = new RegExp(`\\b(${cls})\\b`, 'g');
    html = html.replace(regex, '<span class="text-[#8be9fd] font-medium">$1</span>');
  });

  // 7. Restaurar comentarios y strings
  comments.forEach((comment, i) => {
    html = html.replace(`___COMMENT_TOKEN_${i}___`, comment);
  });
  strings.forEach((str, i) => {
    html = html.replace(`___STRING_TOKEN_${i}___`, str);
  });

  return html;
};
