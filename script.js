/* =========================================================
   PPo ESTÚDIOS
   SISTEMA COMPLETO
========================================================= */


/* =========================================================
   DADOS DOS PERFIS
========================================================= */

const perfis = [

    {
        id: "arthur",
        nome: "Arthur Aragão",
        foto: "REFERENCIAS/foto-arthur.png"
    },

    {
        id: "joao",
        nome: "João Pedro",
        foto: "REFERENCIAS/foto-joao.png"
    },

    {
        id: "jan",
        nome: "Jan Pietro",
        foto: "REFERENCIAS/foto-jan.png"
    },

    {
        id: "marcos",
        nome: "Marcos Felipe",
        foto: "REFERENCIAS/foto-marcos.png"
    },

    {
        id: "pedro",
        nome: "Pedro Lucas",
        foto: "REFERENCIAS/foto-pedro.png"
    },

    {
        id: "mateus",
        nome: "Mateus Alcântara",
        foto: "REFERENCIAS/foto-mateus.png"
    },

    {
        id: "miguel-lucas",
        nome: "Miguel Lucas",
        foto: "REFERENCIAS/foto-miguel-lucas.png"
    },

    {
        id: "miguel-olegario",
        nome: "Miguel Olegario",
        foto: "REFERENCIAS/foto-miguel-olegario.png"
    },

    {
        id: "yann",
        nome: "Yann",
        foto: "REFERENCIAS/foto-yann.png"
    },


    /* NOVOS PERFIS */

    {
        id: "artur",
        nome: "Artur",
        foto: "REFERENCIAS/foto-artur.png"
    },

    {
        id: "gabriel-soares",
        nome: "Gabriel Soares",
        foto: "REFERENCIAS/foto-gabriel-soares.png"
    },

    {
        id: "ana-claudia",
        nome: "Ana Claudia",
        foto: "REFERENCIAS/foto-ana-claudia.png"
    },

    {
        id: "jose-fernando",
        nome: "José Fernando",
        foto: "REFERENCIAS/foto-jose-fernando.png"
    },

    {
        id: "vitor",
        nome: "Vitor",
        foto: "REFERENCIAS/foto-vitor.png"
    },

    {
        id: "eline",
        nome: "Eline",
        foto: "REFERENCIAS/foto-eline.png"
    },

    {
        id: "cecilia",
        nome: "Cecilia",
        foto: "REFERENCIAS/foto-cecilia.png"
    }

];


/* =========================================================
   QUANTIDADE DE PERSONAGENS
========================================================= */

const quantidadePersonagens = 17;


/* =========================================================
   PERFIL QUE ESTÁ SENDO EDITADO
========================================================= */

let perfilSelecionado = null;


/* =========================================================
   ELEMENTOS DAS TELAS
========================================================= */

const telas = {

    inicial:
        document.getElementById("telaInicial"),

    perfis:
        document.getElementById("telaPerfis"),

    escolherPessoa:
        document.getElementById("telaEscolherPessoa"),

    personagens:
        document.getElementById("telaPersonagens"),

    filmes:
        document.getElementById("telaFilmes")

};


/* =========================================================
   TROCAR DE TELA
========================================================= */

function mostrarTela(nomeTela) {

    Object.values(telas).forEach(tela => {

        if (tela) {

            tela.classList.remove("ativa");

        }

    });


    if (telas[nomeTela]) {

        telas[nomeTela].classList.add("ativa");

    }


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


/* =========================================================
   TELA INICIAL → PERFIS
========================================================= */

function irParaPerfis() {

    mostrarTela("perfis");

}


/* =========================================================
   IR PARA PERFIS
========================================================= */

function voltarParaPerfis() {

    /*
     * NÃO apagamos o perfil selecionado.
     *
     * Isso permite que, quando a pessoa
     * voltar para os filmes, a bolinha
     * continue mostrando o perfil correto.
     */

    mostrarTela("perfis");

}


/* =========================================================
   CRIAR LISTA DE PERFIS
========================================================= */

function criarPerfis() {

    const container =
        document.getElementById("listaPerfis");

    container.innerHTML = "";


    perfis.forEach(perfil => {

        const botao =
            document.createElement("button");

        botao.className =
            "perfil-card";


        const imagem =
            document.createElement("img");

        imagem.className =
            "perfil-foto";

        imagem.alt =
            perfil.nome;

        imagem.src =
            obterFotoPerfil(perfil);


        const nome =
            document.createElement("span");

        nome.className =
            "perfil-nome";

        nome.textContent =
            perfil.nome;


        botao.appendChild(imagem);

        botao.appendChild(nome);


        /*
         * ALTERAÇÃO:
         *
         * Agora o perfil clicado é guardado.
         *
         * Assim, quando entrar na aba de filmes,
         * o header saberá qual foto deve mostrar.
         */

        botao.onclick = function() {

            abrirFilmes(perfil.id);

        };


        container.appendChild(botao);

    });

}


/* =========================================================
   FOTO SALVA DO PERFIL
========================================================= */

function obterFotoPerfil(perfil) {

    const chave =
        "fotoPerfil_" + perfil.id;


    const fotoSalva =
        localStorage.getItem(chave);


    if (fotoSalva) {

        return fotoSalva;

    }


    return perfil.foto;

}


/* =========================================================
   ABRIR ESCOLHA DE PESSOA
========================================================= */

function abrirEscolhaPerfil() {

    criarListaPessoas();

    mostrarTela("escolherPessoa");

}


/* =========================================================
   CRIAR LISTA DE PESSOAS
========================================================= */

function criarListaPessoas() {

    const container =
        document.getElementById("listaPessoas");

    container.innerHTML = "";


    perfis.forEach(perfil => {

        const botao =
            document.createElement("button");

        botao.className =
            "pessoa-card";


        const imagem =
            document.createElement("img");

        imagem.className =
            "pessoa-foto";

        imagem.src =
            obterFotoPerfil(perfil);

        imagem.alt =
            perfil.nome;


        const nome =
            document.createElement("span");

        nome.className =
            "pessoa-nome";

        nome.textContent =
            perfil.nome;


        botao.appendChild(imagem);

        botao.appendChild(nome);


        botao.onclick = function() {

            selecionarPessoa(perfil.id);

        };


        container.appendChild(botao);

    });

}


/* =========================================================
   SELECIONAR PESSOA
========================================================= */

function selecionarPessoa(idPerfil) {

    perfilSelecionado =
        idPerfil;


    criarPersonagens();

    mostrarTela("personagens");

}


/* =========================================================
   CRIAR PERSONAGENS 1 ATÉ 17
========================================================= */

function criarPersonagens() {

    const container =
        document.getElementById("listaPersonagens");

    container.innerHTML = "";


    for (
        let numero = 1;
        numero <= quantidadePersonagens;
        numero++
    ) {

        const botao =
            document.createElement("button");

        botao.className =
            "personagem-card";


        const imagem =
            document.createElement("img");

        imagem.className =
            "personagem-foto";


        /*
         * IMPORTANTE:
         *
         * Os arquivos precisam estar exatamente assim:
         *
         * personagem-1.png
         * personagem-2.png
         * ...
         * personagem-17.png
         */

        imagem.src =
            `REFERENCIAS/personagem-${numero}.png`;


        imagem.alt =
            `Personagem ${numero}`;


        const nome =
            document.createElement("span");

        nome.className =
            "personagem-nome";

        nome.textContent =
            `Personagem ${numero}`;


        /*
         * Se uma imagem não existir,
         * o espaço não quebra a página.
         */

        imagem.onerror = function() {

            this.style.visibility =
                "hidden";

        };


        botao.appendChild(imagem);

        botao.appendChild(nome);


        botao.onclick = function() {

            escolherPersonagem(numero);

        };


        container.appendChild(botao);

    }

}


/* =========================================================
   ESCOLHER PERSONAGEM
========================================================= */

function escolherPersonagem(numero) {

    if (!perfilSelecionado) {

        return;

    }


    const caminho =
        `REFERENCIAS/personagem-${numero}.png`;


    /*
     * Salva no LocalStorage.
     *
     * Assim, mesmo fechando e abrindo
     * a página, a foto continua.
     */

    localStorage.setItem(

        "fotoPerfil_" +
        perfilSelecionado,

        caminho

    );


    /*
     * Volta diretamente para a aba de perfis.
     */

    criarPerfis();

    mostrarTela("perfis");

}


/* =========================================================
   VOLTAR DA ESCOLHA DE PESSOA
========================================================= */

function voltarParaPerfisDaEscolha() {

    mostrarTela("perfis");

}


/* =========================================================
   VOLTAR DA LISTA DE PERSONAGENS
========================================================= */

function voltarParaEscolhaPessoa() {

    criarListaPessoas();

    mostrarTela("escolherPessoa");

}


/* =========================================================
   ABRIR FILMES
========================================================= */

function abrirFilmes(idPerfil = null) {

    /*
     * ALTERAÇÃO:
     *
     * Recebe o ID do perfil que foi clicado.
     *
     * Exemplo:
     *
     * Pedro → "pedro"
     * Arthur → "arthur"
     * Gabriel → "gabriel-soares"
     */

    if (idPerfil) {

        perfilSelecionado =
            idPerfil;

    }


    mostrarTela("filmes");


    /*
     * Sempre começa na página inicial
     * do streaming.
     */

    mostrarCategoria(

        "inicioStreaming",

        document.querySelector(".menu-item")

    );


    /*
     * Atualiza a bolinha do header
     * para o perfil correto.
     */

    atualizarFotoHeader();

}


/* =========================================================
   MUDAR CATEGORIA
========================================================= */

function mostrarCategoria(id, botao) {

    const categorias =
        document.querySelectorAll(
            ".categoria-streaming"
        );


    categorias.forEach(categoria => {

        categoria.classList.remove("ativa");

    });


    const categoria =
        document.getElementById(id);


    if (categoria) {

        categoria.classList.add("ativa");

    }


    const botoes =
        document.querySelectorAll(
            ".menu-item"
        );


    botoes.forEach(item => {

        item.classList.remove("ativo");

    });


    if (botao) {

        botao.classList.add("ativo");

    }


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


/* =========================================================
   CRIAR CAPAS
========================================================= */

function criarCapas() {

    criarGrupoCapas(
        "gradeFilmes"
    );


    criarGrupoCapas(
        "gradeSeries"
    );


    criarGrupoCapas(
        "gradeCurtas"
    );


    criarGrupoCapas(
        "gradeZeCalvo"
    );


    /*
     * Capas da página inicial
     */

    const secoes =
        document.querySelectorAll(
            "#inicioStreaming .grade-capas"
        );


    secoes.forEach(secao => {

        secao.innerHTML = "";


        for (
            let i = 1;
            i <= 10;
            i++
        ) {

            secao.appendChild(
                criarCapa()
            );

        }

    });

}


/* =========================================================
   CRIAR GRUPO DE 10 CAPAS
========================================================= */

function criarGrupoCapas(id) {

    const container =
        document.getElementById(id);


    if (!container) {

        return;

    }


    container.innerHTML = "";


    for (
        let i = 1;
        i <= 10;
        i++
    ) {

        container.appendChild(
            criarCapa()
        );

    }

}


/* =========================================================
   CRIAR UMA CAPA
========================================================= */

function criarCapa() {

    const capa =
        document.createElement("div");

    capa.className =
        "capa-card";


    const texto =
        document.createElement("div");

    texto.className =
        "capa-em-breve";

    texto.textContent =
        "EM BREVE";


    capa.appendChild(texto);


    return capa;

}


/* =========================================================
   LUPA
========================================================= */

function abrirBusca() {

    const caixa =
        document.getElementById(
            "caixaBusca"
        );


    caixa.classList.add(
        "aberta"
    );


    document.getElementById(
        "campoBusca"
    ).focus();

}


/* =========================================================
   FECHAR BUSCA
========================================================= */

function fecharBusca() {

    const caixa =
        document.getElementById(
            "caixaBusca"
        );


    caixa.classList.remove(
        "aberta"
    );


    document.getElementById(
        "campoBusca"
    ).value = "";


    limparPesquisa();

}


/* =========================================================
   PESQUISA
========================================================= */

function pesquisarConteudo() {

    const termo =
        document
            .getElementById("campoBusca")
            .value
            .toLowerCase()
            .trim();


    /*
     * Como as capas ainda não possuem
     * nomes, a pesquisa apenas mostra
     * ou esconde as capas.
     *
     * Quando você colocar títulos futuramente,
     * essa função poderá pesquisar por eles.
     */

    const capas =
        document.querySelectorAll(
            ".capa-card"
        );


    capas.forEach(capa => {

        if (!termo) {

            capa.style.display =
                "block";

            return;

        }


        /*
         * Por enquanto, as capas são
         * "Em breve", então aparecem
         * quando a pesquisa está vazia.
         */

        capa.style.display =
            "none";

    });

}


/* =========================================================
   LIMPAR PESQUISA
========================================================= */

function limparPesquisa() {

    const capas =
        document.querySelectorAll(
            ".capa-card"
        );


    capas.forEach(capa => {

        capa.style.display =
            "block";

    });

}


/* =========================================================
   FOTO DO HEADER
========================================================= */

function atualizarFotoHeader() {

    const fotoHeader =
        document.getElementById(
            "fotoPerfilHeader"
        );


    if (!fotoHeader) {

        return;

    }


    /*
     * ALTERAÇÃO PRINCIPAL:
     *
     * Agora não usamos mais o Pedro
     * obrigatoriamente.
     *
     * A foto depende do perfil que
     * entrou na aba de filmes.
     */

    if (perfilSelecionado) {

        const perfilAtual =
            perfis.find(
                perfil =>
                    perfil.id ===
                    perfilSelecionado
            );


        if (perfilAtual) {

            fotoHeader.src =
                obterFotoPerfil(
                    perfilAtual
                );


            return;

        }

    }


    /*
     * Caso nenhum perfil tenha sido
     * selecionado, Pedro continua
     * sendo a imagem padrão.
     */

    const perfilPedro =
        perfis.find(
            perfil =>
                perfil.id === "pedro"
        );


    if (perfilPedro) {

        fotoHeader.src =
            obterFotoPerfil(
                perfilPedro
            );

    }

}


/* =========================================================
   INICIALIZAÇÃO
========================================================= */

document.addEventListener(

    "DOMContentLoaded",

    function() {

        criarPerfis();

        criarCapas();

        atualizarFotoHeader();


        /*
         * A primeira tela sempre será
         * a tela inicial.
         */

        mostrarTela(
            "inicial"
        );

    }

);