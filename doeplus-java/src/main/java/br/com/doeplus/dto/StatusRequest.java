package br.com.doeplus.dto;

import br.com.doeplus.model.StatusDoacao;
import jakarta.validation.constraints.NotNull;

public record StatusRequest(@NotNull StatusDoacao status) {}
