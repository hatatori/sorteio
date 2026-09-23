

const tag_resultado = document.getElementById('tag_resultado')
const tag_apostas = document.getElementById('tag_apostas')
const tag_render = document.getElementById('tag_render')

function numerosAleatorios(min, max, quantidade) {
    const numeros = new Set();

    while (numeros.size < quantidade) {
        numeros.add(Math.floor(Math.random() * max) + min);
    }

    return [...numeros].sort((a, b) => a - b);
}

function quantidade_acertos_linha(res, lin) {
    res = res.split(' ')
    lin = lin.split(' ')
    let s = 0
    return lin.filter(e => res.includes(e)).length
}

function joinspan(result, lin) {
    result = result.split(' ')
    lin = lin.split(' ')

    if (!lin[lin.length - 1] == '')
        lin.push('')


    return lin.map(e => {
        if (e != "")
            return result.includes(e) ? `<span class='active'>${e}</span>` : `<span class='desactive'>${e}</span>`
    }
    ).join('')
}

function random6(min = 1, max = 60, lines = 4) {
    // const min = 1
    // const max = 60
    const text = []
    for (let j = 0; j < lines; j++) {
        const lista = []
        numerosAleatorios(min, max, 6).map(e => lista.push(e))
        lista.map(e => text.push(e.toString().padStart(2, "0")))
        if (j < lines - 1) text.push(";");
    }

    return text.join(" ").replace(/ ; /g, "\n")

}

let resultado = random6(min = 1, max = 60, lines = 1)
let apostas = random6()
tag_resultado.value = resultado
tag_apostas.value = apostas

function randomize() {
    let resultado = random6(min = 1, max = 60, lines = 1)
    apostas = random6()
    tag_resultado.value = resultado
    tag_apostas.value = apostas
    tag_render.innerHTML = render()
}

function randomize2(l) {
    resultado = random6(min = 1, max = 60, lines = 1)
    apostas = random6(min = 1, max = 60, lines = l)
    tag_resultado.value = resultado
    tag_apostas.value = apostas
    tag_render.innerHTML = render()
}

function render() {
    let t1 = apostas
    t1[t1.length - 1] = "x"

    t1 = t1.split("\n").map(e => {
        let txt = e.split(" ").join(" ")
        return joinspan(resultado, txt) + "<span class='result'>" + quantidade_acertos_linha(resultado, txt) + "</span>"
    }).join("<br>")
    return t1
}

tag_render.innerHTML = render()

tag_apostas.value = apostas

tag_apostas.onkeyup = function () {
    tag_render.innerHTML = ""
    apostas = tag_apostas.value
    tag_render.innerHTML = render()
}

tag_resultado.onkeyup = function () {
    resultado = this.value
    tag_render.innerHTML = render()
}
