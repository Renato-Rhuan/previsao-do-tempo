/*
  Lógica de programação
  - Algoritmo(Receita de bolo - Passo a passo)

   Fluxo basico
   [x] Descobrir quando o botao foi clicado
   [x] Pegar o nome da cidade do input
   [x] Enviar o nome da cidade para o servidor
   [x] Pegar a resposta e colocar na tela

   Fluxo de voz
    [x] Descobrir quando o botao de voz foi clicado
    [x] Começar a ouvir e pegar a trasncrição
    [x] Enviar a trasncrição para o servidor
    [x] Pegar a resposta e colocar na tela

    Fluxo da IA
    [x] Pegar os dados da cidade
    [x] Enviar os dados para a IA
    [x] Colocar os dados na tela

    document = html
    querySelector = pegar um elemento do html
*/



async function cliqueiNoBotao() {
    let cidade = document.querySelector(".city-input").value
    let caixa = document.querySelector(".caixa-media")

    if (!cidade) {
        caixa.innerHTML = '<p class="erro">Digite o nome de uma cidade.</p>'
        return
    }

    let respostaServidor = await fetch(`/api/weather?city=${encodeURIComponent(cidade)}`)
    let dadosJson = await respostaServidor.json()

    if (!respostaServidor.ok) {
        caixa.innerHTML = `<p class="erro">Erro: ${dadosJson.message || dadosJson.error || 'Não foi possível buscar o tempo.'}</p>`
        return
    }

    caixa.innerHTML = `
    <h2 class="cidade">${dadosJson.name}</h2>
    <p class="temp">${Math.floor(dadosJson.main.temp)}°C</p>
    <img src="https://openweathermap.org/img/wn/${dadosJson.weather[0].icon}.png" class="icone" alt="icone-info-tempo">
    <p class="umidade">Umidade: ${dadosJson.main.humidity}%</p>
    <button class="botao-ia" onclick="pedirSugestaoRoupa()">Sugestão de Roupa</button>
    <p class="resposta-ia"></p>`
}

function detectaVoz() {
    let reconhecimento = new window.webkitSpeechRecognition()
    reconhecimento.lang = "pt-BR"
    reconhecimento.start()

    reconhecimento.onresult = function (evento) {
        let textoTranscrito = evento.results[0][0].transcript
        document.querySelector(".city-input").value = textoTranscrito
        cliqueiNoBotao()
    }

}

async function pedirSugestaoRoupa() {
    let temperatura = document.querySelector(".temp").textContent
    let umidade = document.querySelector(".umidade").textContent
    let cidade = document.querySelector(".cidade").textContent

    let resposta = await fetch('/api/ai', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            cidade,
            temperatura,
            umidade
        })
    })

    let dados = await resposta.json()

    if (!resposta.ok) {
        document.querySelector('.resposta-ia').innerHTML = `Erro: ${dados.error || 'Não foi possível obter sugestão.'}`
        return
    }

    document.querySelector('.resposta-ia').innerHTML = dados.choices?.[0]?.message?.content || 'Resposta inválida da IA.'
    console.log(dados)

    /*
        Metodo HTTP: GET, POST, PUT, DELETE
        GET: Pegar dados do servidor
        POST: Enviar dados para o servidor
        PUT: Atualizar dados no servidor
        DELETE: Deletar dados no servidor

    
    */



}
