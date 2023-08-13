function quantidade_acertos_linha(res, lin){
    res = res.split(' ')
    lin = lin.split(' ')
    let s = 0
    return lin.filter(e=>res.includes(e)).length
}

function joinspan(result, lin){
    result = result.split(' ')
    lin = lin.split(' ')
    
    if(!lin[lin.length-1] == '')
        lin.push('')
   
        
    return lin.map(e=> {
        if(e!="")
        return result.includes(e) ? `<span class='active'>${e}</span>` : `<span>${e}</span>`
    }   
    ).join('')
}

let resultado = "01 02 04 07 08 10 12 13 15 17 19 20 22 24 25"

let apostas = `01 03 04 07 09 10 11 15 17 18 19 20 22 24 25 
02 03 05 06 07 10 13 14 15 16 17 18 20 22 25 
01 03 04 05 07 08 09 11 12 14 17 19 20 21 25 
02 03 05 08 09 12 13 14 15 16 17 18 20 21 23 
02 05 10 12 13 15 16 17 18 19 20 21 23 24 25 
01 02 03 04 05 08 10 15 16 17 18 19 22 23 25 
02 06 08 09 10 12 14 15 18 19 20 21 22 23 24 
01 05 06 08 09 10 11 12 13 14 15 16 17 18 22 
01 04 05 06 08 09 10 11 12 13 14 17 19 20 21 
01 02 03 05 06 08 10 11 14 15 16 19 20 23 25 
01 02 04 05 06 09 10 11 13 15 16 19 20 22 24 
01 03 05 07 08 09 12 14 17 18 19 21 22 23 24 
01 03 04 05 06 07 09 11 13 17 18 19 21 23 25 
01 02 03 08 09 11 12 13 14 16 17 18 21 23 25 
03 04 06 08 11 12 13 15 16 17 18 20 21 22 23 
01 07 08 09 11 12 13 14 15 16 18 20 22 23 25 
02 05 06 08 09 10 11 13 14 15 18 21 22 24 25 
02 03 05 08 09 10 11 12 13 14 15 16 17 18 25`

function render(){
    let t1 = apostas
    t1[t1.length-1] = "x"
    console.log(t1)

    t1 = t1.split("\n").map(e=>{
        let txt = e.split(" ").join(" ")
        return joinspan(resultado, txt)+"<b>"+quantidade_acertos_linha(resultado, txt)+"</b>"
    }).join("<br>")
    return t1
}


// lotofacil_resultado.innerHTML = render()
lotofacil_resultado.innerHTML = render()

lotofacil_apostas.value = apostas

lotofacil_apostas.onkeyup = function(){
    lotofacil_resultado.innerHTML = ""
    apostas = lotofacil_apostas.value
    lotofacil_resultado.innerHTML = render()
}

tag_resultado.onkeyup=function(){
    resultado = this.value
    lotofacil_resultado.innerHTML = render()
}
