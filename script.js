const buscar = document.querySelector("#Buscar")
const spanErro = document.querySelector("#spanErro")
const nomePokemon = document.querySelector("#tituloPokemon")
const idPokemon = document.querySelector("#idPokemon")
const imgPokemon = document.querySelector("#FotoPokemon")
const resultadoCard = document.querySelector("#resultado");

const tipoPokemon = document.querySelector("#tipoPokemon")
const alturaPokemon = document.querySelector("#alturaPokemon")
const pesoPokemon = document.querySelector("#pesoPokemon")

const ataque = document.querySelector("#ataquePokemon")
const defesa = document.querySelector("#defesaPokemon")
const hp = document.querySelector("#hpPokemon")
const velocidade = document.querySelector("#velocidadePokemon")

const barraAtaque = document.querySelector("#barraAtaque")
const barraDefesa = document.querySelector("#barraDefesa")
const barraHp = document.querySelector("#barraHp")
const barraVelocidade = document.querySelector("#barraVelocidade")

const botaoBuscar = document.querySelector("#BotaoBuscar")
const modoShinny = document.querySelector("#modoShinny")
const botaoAleatorio = document.querySelector("#BuscarAleatorio")
const botaoProximo = document.querySelector("#proximo")
const botaoAnterior = document.querySelector("#anterior")

function BuscarPokemon(pokemon) {

    return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then(resposta => {
            if (resposta.ok) {
                console.log("Deu certo.")
                spanErro.classList.remove("styleSpanErro");
                spanErro.innerText = "";

                resultado = resposta.json()
                return resultado;
            } else {
                spanErro.innerText = "Erro. Pokemon não encontrado.";
                spanErro.classList.add("styleSpanErro");
                return;
            }
        })
        .catch(erro => {
            console.log("Erro", erro.message)
        })

}

function validarPokemon(pokemon) {
    if (pokemon != "") {
        return true;
    } else {
        spanErro.classList.add("styleSpanErro");
        spanErro.innerText = "Erro. Digite o número ou nome de algum pokemon válido."
    }
}

function adicionarDados(pokemon) {

    BuscarPokemon(pokemon).then(info => {
        if (info) { // fiz com o .then aqui para executar o seguintes comandos quando a api retornar um valor, e o if para se caso tenha entrado no catch na func buscarPokemon.
            nomePokemon.innerText = info.name;
            idPokemon.innerText = info.id;

            imgPokemon.src = info.sprites.front_default;
            alturaPokemon.innerText = "Altura: " + (info.height / 10) + "m";
            pesoPokemon.innerText = "Peso: " + (info.weight / 10) + "kg";

            const tipos = info.types.map(item => item.type.name);
            tipoPokemon.innerText = "Tipo(s): " + tipos.join(", ");

            const ataqueStats = info.stats[1].base_stat;
            const defesaStats = info.stats[2].base_stat;
            const hpStats = info.stats[0].base_stat;
            const velocidadeStats = info.stats[5].base_stat;

            ataque.innerText = "Ataque: " + ataqueStats;
            defesa.innerText = "Defesa: " + defesaStats;
            hp.innerText = "HP: " + hpStats;
            velocidade.innerText = "Velocidade: " + velocidadeStats;

            barraAtaque.style.width = (ataqueStats / 225 * 100) + "%";

            barraDefesa.style.width = (defesaStats / 225 * 100) + "%";
            barraHp.style.width = (hpStats / 225 * 100) + "%";
            barraVelocidade.style.width = (velocidadeStats / 225 * 100) + "%";

            const tipoStyle = tipos[0];
            resultadoCard.className = "";
            resultadoCard.classList.add(tipoStyle)

        }
    });

}

botaoBuscar.addEventListener('click', (event) => {

    event.preventDefault();

    let pokemonEscolhido = buscar.value.trim().toLowerCase();

    if (validarPokemon(pokemonEscolhido)) {
        adicionarDados(pokemonEscolhido);
    }
})

buscar.addEventListener('input', (event) => {

    event.preventDefault();

    let pokemonEscolhido = buscar.value.trim().toLowerCase();

    if (validarPokemon(pokemonEscolhido)) {
        adicionarDados(pokemonEscolhido);
    }
})

let contadorImg = 1

imgPokemon.addEventListener('click', () => {
    let pokemon = nomePokemon.textContent;
    BuscarPokemon(pokemon).then(info => {
        if (info) {
            if (contadorImg == 1) {
                imgPokemon.src = info.sprites.back_default;
                contadorImg = 2;
            } else {
                imgPokemon.src = info.sprites.front_default;
                contadorImg = 1;
            }
        }
    })

})

let contadorShinny = 1;

modoShinny.addEventListener('click', () => {
    let pokemon = nomePokemon.textContent;
    BuscarPokemon(pokemon).then(info => {
        if(info) {

            if(contadorShinny == 1){

                if(contadorImg == 1) {
                    imgPokemon.src = info.sprites.front_shiny;
                } else {
                    imgPokemon.src = info.sprites.back_shiny;
                }

                contadorShinny = 2;

            } else {

                if(contadorImg == 1) {
                    imgPokemon.src = info.sprites.front_default;
                } else {
                    imgPokemon.src = info.sprites.back_default;
                }
                contadorShinny = 1;
            }
        }
    })
})

botaoAleatorio.addEventListener('click', () => {
    let numSorteado = Math.floor(Math.random() * 1025) + 1
    if (validarPokemon(numSorteado)) {
        adicionarDados(numSorteado);
    }
})

botaoProximo.addEventListener('click', () => {
    const id = parseInt(idPokemon.textContent); // pesquisei e encontrei essa funcao que transforma a string retornada pelo textContent em um int
    let idProximo = id + 1;

     if(validarPokemon(idProximo)) {
        adicionarDados(idProximo);
    }
})

botaoAnterior.addEventListener('click', () => {
    const id = parseInt(idPokemon.textContent); 
    let idAnterior = id - 1;
    

    if(validarPokemon(idAnterior)) {
        adicionarDados(idAnterior);
    }
})