package br.com.doeplus.controller;

import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.server.ResponseStatusException;

@RestControllerAdvice
public class ApiErrorHandler {
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> invalidos(MethodArgumentNotValidException exception) {
        return ResponseEntity.badRequest().body(Map.of("mensagem", "Verifique os dados informados."));
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<Map<String, String>> formatoInvalido(HttpMessageNotReadableException exception) {
        return ResponseEntity.badRequest().body(Map.of("mensagem", "Formato inválido. Confira os campos e tente novamente."));
    }

    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<Map<String, String>> status(ResponseStatusException exception) {
        HttpStatus codigo = HttpStatus.valueOf(exception.getStatusCode().value());
        return ResponseEntity.status(codigo).body(Map.of("mensagem", exception.getReason() == null ? "Erro na solicitação." : exception.getReason()));
    }
}
