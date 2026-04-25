package co.edu.unicauca.gateway.config;


import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.security.core.context.ReactiveSecurityContextHolder;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Component
public class GlobalIdentityFilter implements GlobalFilter, Ordered {

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {

        // Accedemos al Contexto de Seguridad Reactivo
        return ReactiveSecurityContextHolder.getContext()
                .map(SecurityContext::getAuthentication)
                .flatMap(authentication -> {

                    // Verificamos si hay un token JWT válido en la sesión actual
                    if (authentication != null && authentication.getPrincipal() instanceof Jwt jwt) {

                        String email = jwt.getClaimAsString("email");
                        String uniqueId = jwt.getSubject();

                        // 2. Si encontramos el email, generamos el ID y mutamos la petición
                        if (email != null) {

                            ServerHttpRequest mutatedRequest = exchange.getRequest().mutate()
                                    .header("X-User-Id", uniqueId)
                                    .header("X-User-Email", email)
                                    .build();

                            ServerWebExchange mutatedExchange = exchange.mutate()
                                    .request(mutatedRequest)
                                    .build();

                            return chain.filter(mutatedExchange);
                        }
                    }

                    // Si no es JWT o no tiene email, seguimos sin tocar nada
                    return chain.filter(exchange);
                })
                // Si no hay contexto de seguridad (ruta pública), seguimos normal
                .switchIfEmpty(chain.filter(exchange));
    }

    @Override
    public int getOrder() {
        // Ejecutar después de la seguridad pero antes del enrutamiento
        return Ordered.LOWEST_PRECEDENCE;
    }
}