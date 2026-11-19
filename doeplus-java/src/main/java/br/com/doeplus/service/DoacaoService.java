package br.com.doeplus.service;

import br.com.doeplus.dto.DoacaoRequest;
import br.com.doeplus.dto.ResumoResponse;
import br.com.doeplus.model.Doacao;
import br.com.doeplus.model.StatusDoacao;
import br.com.doeplus.model.TipoDoacao;
import br.com.doeplus.repository.DoacaoRepository;
import java.math.BigDecimal;
import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class DoacaoService {
    private final DoacaoRepository repository;

    public DoacaoService(DoacaoRepository repository) {
        this.repository = repository;
    }

    public List<Doacao> listar() {
        return repository.findAll(Sort.by(Sort.Order.desc("data"), Sort.Order.desc("id")));
    }

    public Doacao criar(DoacaoRequest request) {
        validarQuantidade(request);
        Doacao doacao = new Doacao();
        preencher(doacao, request);
        return repository.save(doacao);
    }

    public Doacao atualizar(Long id, DoacaoRequest request) {
        validarQuantidade(request);
        Doacao doacao = buscar(id);
        preencher(doacao, request);
        return repository.save(doacao);
    }

    public Doacao atualizarStatus(Long id, StatusDoacao status) {
        Doacao doacao = buscar(id);
        doacao.setStatus(status);
        return repository.save(doacao);
    }

    public void excluir(Long id) {
        Doacao doacao = buscar(id);
        repository.delete(doacao);
    }

    public ResumoResponse resumo() {
        List<Doacao> doacoes = repository.findAll();
        long recebidas = doacoes.stream().filter(d -> d.getStatus() == StatusDoacao.RECEBIDA).count();
        BigDecimal valorRecebido = doacoes.stream()
                .filter(d -> d.getStatus() == StatusDoacao.RECEBIDA && d.getTipo() == TipoDoacao.DINHEIRO)
                .map(Doacao::getQuantidade)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        return new ResumoResponse(doacoes.size(), recebidas, doacoes.size() - recebidas, valorRecebido);
    }

    private Doacao buscar(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Doação não encontrada."));
    }

    private void preencher(Doacao doacao, DoacaoRequest request) {
        doacao.setDoador(request.doador().trim());
        doacao.setTipo(request.tipo());
        doacao.setQuantidade(request.quantidade());
        doacao.setData(request.data());
        doacao.setStatus(request.status());
        doacao.setObservacao(request.observacao() == null ? "" : request.observacao().trim());
    }

    private void validarQuantidade(DoacaoRequest request) {
        if (request.tipo() != TipoDoacao.DINHEIRO &&
                request.quantidade().stripTrailingZeros().scale() > 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Doações de itens devem ter quantidade inteira.");
        }
    }
}
