package br.com.doeplus.dto;

import java.math.BigDecimal;

public record ResumoResponse(long totalDoacoes, long recebidas, long pendentes, BigDecimal valorRecebido) {}
