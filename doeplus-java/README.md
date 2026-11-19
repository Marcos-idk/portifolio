# Doe+ — Sistema de Gestão de Doações

Sistema demonstrativo de gerenciamento de doações, desenvolvido com **Java 21**, **Spring Boot**, **Spring Data JPA** e banco de dados local **H2**.

A interface utiliza HTML, CSS e JavaScript para exibir o painel e alternar entre **tema claro e escuro**. O tema escolhido é lembrado pelo navegador (`localStorage`).

## O que o sistema faz

- Cadastra doações em dinheiro, alimentos, roupas, itens de higiene e outros itens.
- Lista, pesquisa e filtra doações recebidas ou pendentes.
- Permite editar, excluir e marcar doações como recebidas.
- Exibe resumo: quantidade total, recebidas, pendentes e valor recebido em dinheiro.
- Salva os registros localmente no banco H2, mantendo-os após reiniciar a aplicação.
- Apresenta layout responsivo com botão para alternar entre os temas claro e escuro.

**Aviso:** não é uma plataforma de pagamentos. Não há login, controle de acesso nem processamento de dinheiro real. A aplicação é para demonstração e estudos; não publique a API aberta na internet nem cadastre dados pessoais verdadeiros antes de adicionar autenticação, permissões, configurações de segurança e privacidade.

## Requisitos

- Java JDK 21.
- Maven 3.9+ **ou** IDE com suporte ao Maven (Eclipse, IntelliJ ou VS Code com extensões Java).
- Internet no primeiro uso para baixar dependências do Maven.

## Executar no Windows pelo Eclipse

1. Extraia o ZIP.
2. No Eclipse, selecione **File → Import → Maven → Existing Maven Projects**.
3. Selecione a pasta `doeplus-java` (a pasta que contém `pom.xml`).
4. Aguarde o Eclipse importar as dependências.
5. Abra `src/main/java/br/com/doeplus/DoePlusApplication.java`.
6. Clique com o botão direito → **Run As → Java Application**.
7. Acesse **http://localhost:8080** no navegador.

## Executar pelo terminal

Dentro da pasta `doeplus-java`:

```bash
mvn spring-boot:run
```

Ou criar e executar um JAR:

```bash
mvn clean package
java -jar target/doeplus-1.0.0.jar
```

Se a porta 8080 estiver em uso, você pode mudar `server.port` em `src/main/resources/application.properties` para `8081` e acessar `http://localhost:8081`.

**Não abra** `src/main/resources/static/index.html` diretamente como arquivo local. É preciso iniciar o Java, porque as funções de cadastro usam a API REST.

## Estrutura do projeto

```text
doeplus-java/
├── pom.xml
├── src/main/java/br/com/doeplus/
│   ├── DoePlusApplication.java
│   ├── controller/
│   │   ├── DoacaoController.java
│   │   └── ApiErrorHandler.java
│   ├── dto/
│   │   ├── DoacaoRequest.java
│   │   ├── ResumoResponse.java
│   │   └── StatusRequest.java
│   ├── model/
│   │   ├── Doacao.java
│   │   ├── TipoDoacao.java
│   │   └── StatusDoacao.java
│   ├── repository/
│   │   └── DoacaoRepository.java
│   └── service/
│       └── DoacaoService.java
└── src/main/resources/
    ├── application.properties
    └── static/
        ├── index.html
        ├── styles.css
        └── app.js
```

## Endpoints

| Método | URL | Ação |
|---|---|---|
| GET | `/api/doacoes` | Listar doações |
| POST | `/api/doacoes` | Cadastrar |
| PUT | `/api/doacoes/{id}` | Atualizar cadastro |
| PATCH | `/api/doacoes/{id}/status` | Atualizar situação |
| DELETE | `/api/doacoes/{id}` | Excluir |
| GET | `/api/resumo` | Resumo do painel |

Exemplo de `POST /api/doacoes`:

```json
{
  "doador": "Doador de exemplo",
  "tipo": "ALIMENTO",
  "quantidade": 3,
  "data": "2026-11-18",
  "status": "PENDENTE",
  "observacao": "Três unidades de alimento"
}
```

Valores válidos de `tipo`: `DINHEIRO`, `ALIMENTO`, `ROUPA`, `HIGIENE`, `OUTRO`.

Valores válidos de `status`: `PENDENTE`, `RECEBIDA`.

Para `DINHEIRO`, `quantidade` representa um valor em reais; nos outros tipos, o campo representa **unidades inteiras**. Os valores em reais são somados ao painel apenas quando a doação está marcada como recebida.

## Banco de dados

O banco H2 é armazenado no arquivo `doeplus-data.mv.db`, criado no diretório de execução. O arquivo está ignorado pelo Git.

## Testes

```bash
mvn test
```

## Hospedagem

Para executar o backend Java online, é necessário um serviço que rode aplicações Java e um banco persistente apropriado. **GitHub Pages não executa Spring Boot.**

O projeto está configurado com H2 local para facilitar o desenvolvimento. Antes de disponibilizá-lo publicamente, adicione autenticação, autorização, backups, controles de privacidade e migre para um banco adequado, como PostgreSQL.
