package br.com.doeplus.controller;

import br.com.doeplus.dto.DoacaoRequest;
import br.com.doeplus.dto.ResumoResponse;
import br.com.doeplus.dto.StatusRequest;
import br.com.doeplus.model.Doacao;
import br.com.doeplus.service.DoacaoService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class DoacaoController {
    private final DoacaoService service;

    public DoacaoController(DoacaoService service) {
        this.service = service;
    }

    @GetMapping("/doacoes")
    public List<Doacao> listar() { return service.listar(); }

    @PostMapping("/doacoes")
    @ResponseStatus(HttpStatus.CREATED)
    public Doacao criar(@Valid @RequestBody DoacaoRequest request) { return service.criar(request); }

    @PutMapping("/doacoes/{id}")
    public Doacao atualizar(@PathVariable Long id, @Valid @RequestBody DoacaoRequest request) {
        return service.atualizar(id, request);
    }

    @PatchMapping("/doacoes/{id}/status")
    public Doacao atualizarStatus(@PathVariable Long id, @Valid @RequestBody StatusRequest request) {
        return service.atualizarStatus(id, request.status());
    }

    @DeleteMapping("/doacoes/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void excluir(@PathVariable Long id) { service.excluir(id); }

    @GetMapping("/resumo")
    public ResumoResponse resumo() { return service.resumo(); }
}
