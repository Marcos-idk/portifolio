package br.com.doeplus.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;
import br.com.doeplus.dto.DoacaoRequest;
import br.com.doeplus.model.StatusDoacao;
import br.com.doeplus.model.TipoDoacao;
import br.com.doeplus.repository.DoacaoRepository;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.web.server.ResponseStatusException;

class DoacaoServiceTest {
    private final DoacaoRepository repository = Mockito.mock(DoacaoRepository.class);
    private final DoacaoService service = new DoacaoService(repository);

    @Test
    void resumoVazio() {
        when(repository.findAll()).thenReturn(List.of());
        assertEquals(0, service.resumo().totalDoacoes());
        assertEquals(BigDecimal.ZERO, service.resumo().valorRecebido());
    }

    @Test
    void naoAceitaQuantidadeFracionadaParaItens() {
        DoacaoRequest request = new DoacaoRequest("Pessoa", TipoDoacao.ALIMENTO,
                new BigDecimal("1.5"), LocalDate.now(), StatusDoacao.RECEBIDA, "");
        assertThrows(ResponseStatusException.class, () -> service.criar(request));
    }
}
