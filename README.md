# Lume Reports
Lume Reports é um projeto que automatiza a geração de relatórios semanais para o setor de marketing da Rubeus, utilizando Node.js, Lighthouse e Chart.js. Ele coleta métricas de desempenho de páginas web, gera gráficos e compila os dados em um formato acessível para análise.

<br>

## 🛠️ Tecnologias
Node.js – Plataforma para execução do JavaScript no backend.
Lighthouse – Ferramenta para auditoria de desempenho e acessibilidade de páginas.
Chart.js – Biblioteca para criação de gráficos dinâmicos e visualmente intuitivos.

<br>

## 🔧 Instalação
Clone o repositório:
```
git clone https://github.com/ricardobelinato/lume-reports.git
cd nome-do-projeto
```

Instale as dependências:
```
npm install
```

Teste a instalação do Lighthouse:
```
npx lighthouse https://example.com --view
```

<br>

## 🚀 Como Usar
Configure as URLs a serem analisadas no arquivo de configuração.
Execute o script de automação:
```
node index.js
```

Os relatórios gerados serão armazenados na pasta reports/.

<br>

## 📊 Funcionalidades
✅ Auditoria automatizada de páginas web.
✅ Geração de gráficos com métricas semanais.
✅ Relatórios exportáveis para análise.