document.querySelector('.busca').addEventListener('submit',async function(event){
    event.preventDefault()
    let dado = document.querySelector('#searchInput').value
    if(dado!== ''){
        mensagem("Carregando...")
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(dado)}&appid=533cd1f09564904a575cbfac2ed5a086&units=metric&lang=pt_br`

        let resultado = await fetch(url)
        let json = await resultado.json()
        if(json.cod == 200){
            informacao({
                name: json.name,
                country:json.sys.country,
                temp:json.main.temp,
                icone:json.weather[0].icon,
                vento: json.wind.speed,
                angulo: json.wind.deg
            })
        }else{
            mensagem("Nada encontrado")
            document.querySelector('.resultado').style.display='none'
        }
    }
})

function informacao(json){
    mensagem('')
    document.querySelector('.resultado').style.display='block'
    document.querySelector('.titulo').innerHTML=`${json.name} - ${json.country}`
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`
    document.querySelector('.ventoInfo').innerHTML=`${json.vento} <span>km/h</span>`
    document.querySelector('.temp img').setAttribute('src',`http://openweathermap.org/img/wn/${json.icone}@2x.png`)
    document.querySelector('.ventoPonto').style.transform=`rotate(${json.angulo-90}deg)`

}

function mensagem(msg){
    document.querySelector('.aviso').innerHTML = msg
}