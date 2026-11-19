package br.com.doeplus.dto;

import br.com.doeplus.model.StatusDoacao;
import br.com.doeplus.model.TipoDoacao;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Size;
import java.math.BigDecimal;
import java.time.LocalDate;

public record DoacaoRequest(
        @NotBlank @Size(max = 100) String doador,
        @NotNull TipoDoacao tipo,
        @NotNull @DecimalMin("0.01") @Digits(integer = 10, fraction = 2) BigDecimal quantidade,
        @NotNull @PastOrPresent LocalDate data,
        @NotNull StatusDoacao status,
        @Size(max = 300) String observacao
) {}
