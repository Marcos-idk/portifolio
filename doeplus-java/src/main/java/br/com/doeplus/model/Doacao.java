package br.com.doeplus.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "doacoes")
public class Doacao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String doador;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private TipoDoacao tipo;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal quantidade;

    @Column(nullable = false)
    private LocalDate data;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private StatusDoacao status;

    @Column(length = 300)
    private String observacao;

    public Doacao() {}

    public Long getId() { return id; }
    public String getDoador() { return doador; }
    public void setDoador(String doador) { this.doador = doador; }
    public TipoDoacao getTipo() { return tipo; }
    public void setTipo(TipoDoacao tipo) { this.tipo = tipo; }
    public BigDecimal getQuantidade() { return quantidade; }
    public void setQuantidade(BigDecimal quantidade) { this.quantidade = quantidade; }
    public LocalDate getData() { return data; }
    public void setData(LocalDate data) { this.data = data; }
    public StatusDoacao getStatus() { return status; }
    public void setStatus(StatusDoacao status) { this.status = status; }
    public String getObservacao() { return observacao; }
    public void setObservacao(String observacao) { this.observacao = observacao; }
}
