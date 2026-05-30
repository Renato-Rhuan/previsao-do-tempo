# Previsão do Tempo

Projeto simples de previsão do tempo com sugestão de roupa usando APIs externas.

## Descrição

Este site permite pesquisar a condição do tempo de uma cidade e receber uma sugestão de roupa com base na temperatura e umidade.

## Funcionalidades

- Pesquisa por cidade usando OpenWeather
- Exibe temperatura, umidade e ícone do clima
- Possui comando de voz para ditar a cidade
- Envia dados para uma API de IA para sugerir roupa

## Como usar

1. Abra o arquivo `index.html` em um navegador.
2. Digite o nome da cidade no campo de texto.
3. Clique no botão de busca para ver a previsão.
4. Clique em "Sugestão de Roupa" para receber a sugestão via IA.
5. Use o botão de microfone para ditar o nome da cidade (se o navegador suportar `webkitSpeechRecognition`).

## Estrutura do projeto

- `index.html` - estrutura da página
- `styles.css` - estilos visuais
- `script.js` - lógica de busca, voz e IA
- `img/` - imagens usadas no site

## Melhorias recomendadas

- Mover as chamadas de API para um servidor seguro
- Proteger chaves com variáveis de ambiente
- Tratar erros de forma mais robusta
- Melhorar acessibilidade e feedback visual

## Licença

Este projeto é livre para uso e estudo.
