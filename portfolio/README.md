# Portfólio — Marcos Santos (atualizado com Doe+ Java)

Página pessoal minimalista e responsiva, com categorias **Projetos NASA**, **Projetos pessoais** e **Projetos acadêmicos**. Inclui o SW4N e uma apresentação do Doe+ refeito em Java.

## Novidades

- Alternância entre tema **claro e escuro** no cabeçalho do portfólio e na página de detalhes do Doe+.
- Tema lembrado pelo navegador (localStorage).
- Projeto Doe+ atualizado para apresentar a versão **Java 21 + Spring Boot + JPA + H2**.
- Download do código Java do Doe+ disponível na seção de projetos pessoais e na página de detalhes em `downloads/doeplus-java.zip`.

## Como abrir

Abra o arquivo `index.html` em um navegador. As categorias, a navegação e o botão de tema funcionam sem servidor.

**Atenção:** o Doe+ completo é um aplicativo diferente, que usa Java no backend. Para testar o cadastro de doações, extraia o arquivo `downloads/doeplus-java.zip` e siga seu `README.md`.

## Como publicar o portfólio no GitHub Pages

1. Crie um repositório público chamado `portfolio`.
2. Envie os arquivos e pastas desta pasta **com `index.html` na raiz**.
3. Acesse **Settings → Pages → Deploy from a branch** e escolha `main` e `/ (root)`.
4. O portfólio ficará disponível em `https://USUARIO.github.io/portfolio/` (troque `USUARIO` pelo seu login).

O botão de baixar o Doe+ oferecerá o código-fonte Java para download, mas a aplicação Java **não será executada no GitHub Pages**. Para ter uma demonstração ao vivo do Doe+, hospede o backend em uma plataforma compatível.

## Estrutura

```text
portfolio-marcos-santos-java-doeplus/
├── index.html
├── styles.css
├── script.js
├── theme.js
├── assets/
├── projetos/doe-mais.html
└── downloads/doeplus-java.zip
```

- `index.html`: apresentação e categorias.
- `styles.css`: layout pastel e temas claro e escuro.
- `script.js`: categorias NASA/pessoais/acadêmicos.
- `theme.js`: troca de tema com persistência local.
- `projetos/doe-mais.html`: detalhes sobre o Doe+.
- `downloads/doeplus-java.zip`: código-fonte completo da aplicação Java.

## Projetos e créditos

O SW4N foi desenvolvido pela equipe do NASA Space Apps Challenge e a descrição de pesquisa/dados foi baseada no projeto enviado anteriormente.

O Doe+ desta entrega é uma **nova implementação demonstrativa** feita para o portfólio; ela não substitui automaticamente o conteúdo do antigo repositório `doe-`.

As imagens SVG dos projetos são ilustrações de capa, não capturas de tela das aplicações. Contatos públicos do portfólio: LinkedIn e GitHub fornecidos anteriormente.
