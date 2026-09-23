

const tag_resultado = document.getElementById('tag_resultado')
const tag_apostas = document.getElementById('tag_apostas')
const tag_render = document.getElementById('tag_render')
const tag_range1 = document.getElementById('tag_range1')
const tag_range2 = document.getElementById('tag_range2')

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

const informationDraw = {
    min: 1,
    max: 60,
    lines: 4,
    quantity: 6
}



function generateNumbersDraw(obj) {

    // generateNumbersDraw(informationDraw)

    if (obj.min == undefined) obj.min = 1;
    if (obj.max == undefined) obj.max = 60;
    if (obj.lines == undefined) obj.lines = 1;
    if (obj.quantity == undefined) obj.quantity = 6;

    const t1 = []
    for (let j = 0; j < obj.lines; j++) {

        numerosAleatorios(obj.min, obj.max, obj.quantity).map(e => t1.push(e.toString().padStart(2, "0")))
        // numerosAleatorios(obj.min, obj.max, obj.quantity).map(e => t1.push(e))
        // t1.push("\n");
        t1.push("\n");
    }

    return t1.slice(0, -1).join(" ").replace(/\n /g, "\n")


    const text = []

    for (let j = 0; j < obj.lines; j++) {
        const lista = []
        numerosAleatorios(obj.min, obj.max, obj.quantity).map(e => lista.push(e))
        lista.map(e => text.push(e.toString().padStart(2, "0")))

        if (j < obj.quantity) text.push(";");
    }

    // return text.slice(0, -1).join(" ").replace(/ ; /g, "\n")
    return text.slice(0, -1).join(" ").replace(/ ; /g, "\n")

}


// function random6(min = 1, max = 60, lines = 4) {
//     // const min = 1
//     // const max = 60
//     const text = []
//     for (let j = 0; j < lines; j++) {
//         const lista = []
//         numerosAleatorios(min, max, 6).map(e => lista.push(e))
//         lista.map(e => text.push(e.toString().padStart(2, "0")))
//         if (j < lines - 1) text.push(";");
//     }

//     return text.join(" ").replace(/ ; /g, "\n")

// }

// let resultado = random6(min = 1, max = 60, lines = 1)
// let apostas = random6()
let resultado = generateNumbersDraw({ lines: 1 })
let apostas = generateNumbersDraw(informationDraw)

tag_resultado.value = resultado
tag_apostas.value = apostas

// function randomize() {
//     let resultado = random6(min = 1, max = 60, lines = 1)
//     apostas = random6()
//     tag_resultado.value = resultado
//     tag_apostas.value = apostas
//     tag_render.innerHTML = render()
// }

// function randomize2(l) {
//     resultado = random6(min = 1, max = 60, lines = 1)
//     apostas = random6(min = 1, max = 60, lines = l)
//     tag_resultado.value = resultado
//     tag_apostas.value = apostas
//     tag_render.innerHTML = render()
// }

function randomize3(obj) {

    resultado = generateNumbersDraw({ quantity: obj.quantity })
    apostas = generateNumbersDraw(obj)

    tag_resultado.value = resultado
    tag_apostas.value = apostas

    render()
}

function render() {
    tag_render.innerHTML = ''
    const apostar_split = apostas.trim().split('\n')
    const resultado_arr = resultado.trim().split(' ').map(e => Number(e))
    for (let i = 0; i < apostar_split.length; i++) {
        const aposta_individual = apostar_split[i].trim().split(' ').map(e => Number(e))
        tag_render.appendChild(Tag.check(resultado_arr, aposta_individual))
    }
}

class Tag {
    static check(draw, bet) {
        // draw = [12, 32, 21, 22, 39, 58]
        // bet = [12, 32, 20, 20, 39, 58] 

        const div = document.createElement('div')
        let sum = 0

        bet.map(e => draw.indexOf(e)).map((e, i) => {
            const span = document.createElement('span')
            // span.className = (e == -1) ? 'desactive' : 'active'

            if (e == -1) {
                span.className = 'desactive'
            } else {
                sum++
                span.className = 'active'
            }

            // span.innerHTML = bet[i].toString().padStart(2, "0")
            span.innerHTML = bet[i].toString().padStart(2, "0")
            div.appendChild(span)
        })

        const span2 = document.createElement('span')
        span2.classList.add('result')
        span2.innerHTML = sum
        div.appendChild(span2)

        return div
    }
}

tag_apostas.value = apostas

render()

tag_apostas.onkeyup = function () {
    tag_render.innerHTML = ""
    apostas = tag_apostas.value
    render()
}

tag_resultado.onkeyup = function () {
    resultado = this.value
    render()
}


tag_range1.addEventListener('mousemove', e => {
    informationDraw.lines = tag_range1.value
    document.querySelectorAll('.val')[0].innerHTML = informationDraw.lines
    randomize3({ lines: informationDraw.lines, quantity: informationDraw.quantity })
})

tag_range2.addEventListener('mousemove', e => {
    informationDraw.quantity = tag_range2.value
    document.querySelectorAll('.val')[1].innerHTML = informationDraw.quantity
    randomize3({ lines: informationDraw.lines, quantity: informationDraw.quantity })
})
