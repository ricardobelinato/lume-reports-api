# Lume Reports
Lume Reports é um projeto backend que automatiza a geração de desempenho e acessibilidade para páginas web. Utilizando o Google Lighthouse, ele coleta e processa métricas essenciais, fornecendo relatórios detalhados em formato JSON.

<br>

## 🛠️ Tecnologias
- **Node.js:** Plataforma para execução do JavaScript no backend.
- **Express:** Framework para criação da API.
- **Lighthouse:** Ferramenta para auditoria de desempenho e acessibilidade de páginas.
- **Chrome Launcher:** Utilizado para executar o Lighthouse em instâncias headless do Chrome.
- **Jest:** Framework para testes automatizados.
- **Swagger:** Utilizado para documentar e testar a API de forma interativa.

<br>

## 📊 Funcionalidades
• Auditoria automatizada de páginas web utilizando Lighthouse.<br>
• Geração de relatórios JSON com métricas essenciais.<br>
• Endpoints para iniciar auditorias e consultar relatórios.<br>
• Armazenamento local de relatórios para análise posterior.<br>
• Configuração personalizável de categorias de auditoria e métodos de throttling.<br>
• Testes automatizados para garantir a confiabilidade da API.<br>
• Documentação interativa da API com Swagger para fácil exploração e teste dos endpoints.

<br>

## 👤 Como Usar
1. Instale as dependências
```js
npm install
```

2. Inicie o servidor
```js
npm start
```

3. Acesse a documentação da API Após iniciar o servidor, acesse a documentação interativa da API no Swagger em:
```
http://localhost:3000/api-docs
```

4. Teste a API: <br>
```
Verifique se a API está rodando acessando:  
http://localhost:3000/

Gere um relatório enviando uma requisição POST para:  
http://localhost:3000/generate-report
```

Com o seguinte corpo JSON:
```json
{
  "url": "https://exemplo.com",
  "categories": ["performance", "accessibility", "best-practices", "seo"],
  "logLevel": "info"
}
```

<br>

## 🧪 Testes
Para rodar os testes automatizados com Jest, execute:
```js
npm test
```
Isso garantirá que os endpoints e funcionalidades estejam operando corretamente.

<br>

## 📄 Licença
Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](./LICENSE) para mais detalhes.
