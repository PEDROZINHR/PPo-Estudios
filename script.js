/* =========================================================
   PPo ESTÚDIOS
   SISTEMA COMPLETO
   FOTOS DE PERFIL COMPARTILHADAS PELO FIRESTORE
========================================================= */


/* =========================================================
   CONFIGURAÇÃO DO FIREBASE
========================================================= */

/*
 * COLOQUE AQUI O ID DO SEU PROJETO FIREBASE.
 *
 * Exemplo:
 *
 * const FIREBASE_PROJECT_ID = "ppo-estudios-12345";
 *
 * NÃO coloque o nome do site se ele for diferente
 * do ID mostrado nas configurações do Firebase.
 */

const FIREBASE_PROJECT_ID = "COLOQUE-SEU-PROJECT-ID-AQUI";

const FIRESTORE_DATABASE = "(default)";

const FIRESTORE_COLLECTION = "fotosPerfis";


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
   URL BASE DO FIRESTORE
========================================================= */

function obterURLFirestore(perfilId) {

    return (
        "https://firestore.googleapis.com/v1/projects/" +
        encodeURIComponent(FIREBASE_PROJECT_ID) +
        "/databases/" +
        encodeURIComponent(FIRESTORE_DATABASE) +
        "/documents/" +
        encodeURIComponent(FIRESTORE_COLLECTION) +
        "/" +
        encodeURIComponent(perfilId)
    );

}


/* =========================================================
   VERIFICAR SE FIREBASE FOI CONFIGURADO
========================================================= */

function firebaseConfigurado() {

    return (
        FIREBASE_PROJECT_ID &&
        FIREBASE_PROJECT_ID !==
        "COLOQUE-SEU-PROJECT-ID-AQUI"
    );

}


/* =========================================================
   BUSCAR FOTO NO FIRESTORE
========================================================= */

async function buscarFotoFirestore(perfil) {

    if (!firebaseConfigurado()) {

        return null;

    }


    try {

        const resposta =
            await fetch(
                obterURLFirestore(perfil.id)
            );


        if (!resposta.ok) {

            return null;

        }


        const dados =
            await resposta.json();


        if (
            dados.fields &&
            dados.fields.foto &&
            dados.fields.foto.stringValue
        ) {

            return dados.fields.foto.stringValue;

        }


        return null;

    } catch (erro) {

        console.error(
            "Erro ao buscar foto no Firestore:",
            erro
        );

        return null;

    }

}


/* =========================================================
   SALVAR FOTO NO FIRESTORE
========================================================= */

async function salvarFotoFirestore(
    perfilId,
    caminhoFoto
) {

    if (!firebaseConfigurado()) {

        console.warn(
            "Firebase ainda não foi configurado."
        );

        return false;

    }


    try {

        const resposta =
            await fetch(
                obterURLFirestore(perfilId),
                {
                    method: "PATCH",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({

                        fields: {

                            foto: {

                                stringValue:
                                    caminhoFoto

                            }

                        }

                    })

                }
            );


        if (!resposta.ok) {

            const erro =
                await resposta.text();

            console.error(
                "Erro do Firestore:",
                erro
            );

            return false;

        }


        return true;

    } catch (erro) {

        console.error(
            "Erro ao salvar foto no Firestore:",
            erro
        );

        return false;

    }

}


/* =========================================================
   TROCAR DE TELA
========================================================= */

function mostrarTela(nomeTela) {

    Object.values(telas).forEach(tela => {

        if (tela) {

            tela.classList.remove(
                "ativa"
            );

        }

    });


    if (telas[nomeTela]) {

        telas[nomeTela].classList.add(
            "ativa"
        );

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

    criarPerfis();

}


/* =========================================================
   VOLTAR PARA PERFIS
========================================================= */

function voltarParaPerfis() {

    mostrarTela("perfis");

    criarPerfis();

}


/* =========================================================
   FOTO SALVA DO PERFIL
========================================================= */

async function obterFotoPerfil(perfil) {

    /*
     * Primeiro verifica o Firestore.
     */

    const fotoOnline =
        await buscarFotoFirestore(
            perfil
        );


    if (fotoOnline) {

        /*
         * Mantém uma cópia local para
         * carregar mais rapidamente.
         */

        localStorage.setItem(

            "fotoPerfil_" +
            perfil.id,

            fotoOnline

        );


        return fotoOnline;

    }


    /*
     * Se não houver foto online,
     * procura uma foto antiga local.
     */

    const fotoLocal =
        localStorage.getItem(
            "fotoPerfil_" +
            perfil.id
        );


    if (fotoLocal) {

        return fotoLocal;

    }


    /*
     * Caso nunca tenha escolhido foto,
     * usa a foto original.
     */

    return perfil.foto;

}


/* =========================================================
   CRIAR LISTA DE PERFIS
========================================================= */

async function criarPerfis() {

    const container =
        document.getElementById(
            "listaPerfis"
        );


    if (!container) {

        return;

    }


    container.innerHTML = "";


    /*
     * Cria os cartões imediatamente.
     */

    perfis.forEach(perfil => {

        const botao =
            document.createElement(
                "button"
            );

        botao.className =
            "perfil-card";


        const imagem =
            document.createElement(
                "img"
            );

        imagem.className =
            "perfil-foto";

        imagem.alt =
            perfil.nome;


        const nome =
            document.createElement(
                "span"
            );

        nome.className =
            "perfil-nome";

        nome.textContent =
            perfil.nome;


        botao.appendChild(
            imagem
        );

        botao.appendChild(
            nome
        );


        /*
         * Clicar no perfil entra
         * diretamente nos filmes.
         */

        botao.onclick =
            function() {

                abrirFilmes(
                    perfil.id
                );

            };


        container.appendChild(
            botao
        );


        /*
         * Busca a foto online.
         */

        obterFotoPerfil(
            perfil
        ).then(
            caminho => {

                imagem.src =
                    caminho;

            }
        );

    });

}


/* =========================================================
   ABRIR ESCOLHA DE PESSOA
========================================================= */

function abrirEscolhaPerfil() {

    criarListaPessoas();

    mostrarTela(
        "escolherPessoa"
    );

}


/* =========================================================
   CRIAR LISTA DE PESSOAS
========================================================= */

async function criarListaPessoas() {

    const container =
        document.getElementById(
            "listaPessoas"
        );


    if (!container) {

        return;

    }


    container.innerHTML = "";


    perfis.forEach(perfil => {

        const botao =
            document.createElement(
                "button"
            );

        botao.className =
            "pessoa-card";


        const imagem =
            document.createElement(
                "img"
            );

        imagem.className =
            "pessoa-foto";

        imagem.alt =
            perfil.nome;


        const nome =
            document.createElement(
                "span"
            );

        nome.className =
            "pessoa-nome";

        nome.textContent =
            perfil.nome;


        botao.appendChild(
            imagem
        );

        botao.appendChild(
            nome
        );


        botao.onclick =
            function() {

                selecionarPessoa(
                    perfil.id
                );

            };


        container.appendChild(
            botao
        );


        obterFotoPerfil(
            perfil
        ).then(
            caminho => {

                imagem.src =
                    caminho;

            }
        );

    });

}


/* =========================================================
   SELECIONAR PESSOA
========================================================= */

function selecionarPessoa(
    idPerfil
) {

    perfilSelecionado =
        idPerfil;


    criarPersonagens();

    mostrarTela(
        "personagens"
    );

}


/* =========================================================
   CRIAR PERSONAGENS 1 ATÉ 17
========================================================= */

function criarPersonagens() {

    const container =
        document.getElementById(
            "listaPersonagens"
        );


    if (!container) {

        return;

    }


    container.innerHTML = "";


    for (
        let numero = 1;
        numero <= quantidadePersonagens;
        numero++
    ) {

        const botao =
            document.createElement(
                "button"
            );

        botao.className =
            "personagem-card";


        const imagem =
            document.createElement(
                "img"
            );

        imagem.className =
            "personagem-foto";


        /*
         * Arquivos:
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
            document.createElement(
                "span"
            );

        nome.className =
            "personagem-nome";

        nome.textContent =
            `Personagem ${numero}`;


        /*
         * Caso uma imagem não exista,
         * apenas esconde a imagem.
         */

        imagem.onerror =
            function() {

                this.style.visibility =
                    "hidden";

            };


        botao.appendChild(
            imagem
        );

        botao.appendChild(
            nome
        );


        botao.onclick =
            function() {

                escolherPersonagem(
                    numero
                );

            };


        container.appendChild(
            botao
        );

    }

}


/* =========================================================
   ESCOLHER PERSONAGEM
========================================================= */

async function escolherPersonagem(
    numero
) {

    if (!perfilSelecionado) {

        return;

    }


    const caminho =
        `REFERENCIAS/personagem-${numero}.png`;


    /*
     * Salva localmente também.
     */

    localStorage.setItem(

        "fotoPerfil_" +
        perfilSelecionado,

        caminho

    );


    /*
     * SALVA NO FIRESTORE.
     *
     * Isso faz com que outros dispositivos
     * consigam encontrar a mesma foto.
     */

    const salvouOnline =
        await salvarFotoFirestore(

            perfilSelecionado,

            caminho

        );


    if (!salvouOnline) {

        console.warn(
            "A foto foi salva somente neste dispositivo."
        );

    }


    /*
     * Atualiza os perfis.
     */

    await criarPerfis();


    /*
     * Volta para a tela de perfis.
     */

    mostrarTela(
        "perfis"
    );

}


/* =========================================================
   VOLTAR DA ESCOLHA DE PESSOA
========================================================= */

function voltarParaPerfisDaEscolha() {

    mostrarTela(
        "perfis"
    );

    criarPerfis();

}


/* =========================================================
   VOLTAR DA LISTA DE PERSONAGENS
========================================================= */

function voltarParaEscolhaPessoa() {

    criarListaPessoas();

    mostrarTela(
        "escolherPessoa"
    );

}


/* =========================================================
   ABRIR FILMES
========================================================= */

function abrirFilmes(
    idPerfil = null
) {

    /*
     * Guarda qual perfil entrou.
     */

    if (idPerfil) {

        perfilSelecionado =
            idPerfil;

    }


    mostrarTela(
        "filmes"
    );


    /*
     * Sempre começa na página inicial
     * do streaming.
     */

    const primeiroMenu =
        document.querySelector(
            ".menu-item"
        );


    mostrarCategoria(

        "inicioStreaming",

        primeiroMenu

    );


    /*
     * Atualiza a foto do perfil
     * no header.
     */

    atualizarFotoHeader();

}


/* =========================================================
   MUDAR CATEGORIA
========================================================= */

function mostrarCategoria(
    id,
    botao
) {

    const categorias =
        document.querySelectorAll(
            ".categoria-streaming"
        );


    categorias.forEach(
        categoria => {

            categoria.classList.remove(
                "ativa"
            );

        }
    );


    const categoria =
        document.getElementById(
            id
        );


    if (categoria) {

        categoria.classList.add(
            "ativa"
        );

    }


    const botoes =
        document.querySelectorAll(
            ".menu-item"
        );


    botoes.forEach(
        item => {

            item.classList.remove(
                "ativo"
            );

        }
    );


    if (botao) {

        botao.classList.add(
            "ativo"
        );

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
     * Capas da página inicial.
     */

    const secoes =
        document.querySelectorAll(
            "#inicioStreaming .grade-capas"
        );


    secoes.forEach(
        secao => {

            secao.innerHTML =
                "";


            for (
                let i = 1;
                i <= 10;
                i++
            ) {

                secao.appendChild(
                    criarCapa()
                );

            }

        }
    );

}


/* =========================================================
   CRIAR GRUPO DE 10 CAPAS
========================================================= */

function criarGrupoCapas(
    id
) {

    const container =
        document.getElementById(
            id
        );


    if (!container) {

        return;

    }


    container.innerHTML =
        "";


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
        document.createElement(
            "div"
        );

    capa.className =
        "capa-card";


    const texto =
        document.createElement(
            "div"
        );

    texto.className =
        "capa-em-breve";

    texto.textContent =
        "EM BREVE";


    capa.appendChild(
        texto
    );


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


    if (!caixa) {

        return;

    }


    caixa.classList.add(
        "aberta"
    );


    const campo =
        document.getElementById(
            "campoBusca"
        );


    if (campo) {

        campo.focus();

    }

}


/* =========================================================
   FECHAR BUSCA
========================================================= */

function fecharBusca() {

    const caixa =
        document.getElementById(
            "caixaBusca"
        );


    if (caixa) {

        caixa.classList.remove(
            "aberta"
        );

    }


    const campo =
        document.getElementById(
            "campoBusca"
        );


    if (campo) {

        campo.value = "";

    }


    limparPesquisa();

}


/* =========================================================
   PESQUISA
========================================================= */

function pesquisarConteudo() {

    const campo =
        document.getElementById(
            "campoBusca"
        );


    if (!campo) {

        return;

    }


    const termo =
        campo.value
            .toLowerCase()
            .trim();


    const capas =
        document.querySelectorAll(
            ".capa-card"
        );


    capas.forEach(
        capa => {

            if (!termo) {

                capa.style.display =
                    "block";

                return;

            }


            /*
             * Como ainda não existem nomes
             * nas capas, uma pesquisa preenchida
             * esconde as capas.
             */

            capa.style.display =
                "none";

        }
    );

}


/* =========================================================
   LIMPAR PESQUISA
========================================================= */

function limparPesquisa() {

    const capas =
        document.querySelectorAll(
            ".capa-card"
        );


    capas.forEach(
        capa => {

            capa.style.display =
                "block";

        }
    );

}


/* =========================================================
   FOTO DO HEADER
========================================================= */

async function atualizarFotoHeader() {

    const fotoHeader =
        document.getElementById(
            "fotoPerfilHeader"
        );


    if (!fotoHeader) {

        return;

    }


    /*
     * Se existe um perfil selecionado,
     * mostra a foto dele.
     */

    if (perfilSelecionado) {

        const perfilAtual =
            perfis.find(
                perfil =>
                    perfil.id ===
                    perfilSelecionado
            );


        if (perfilAtual) {

            const foto =
                await obterFotoPerfil(
                    perfilAtual
                );


            fotoHeader.src =
                foto;


            return;

        }

    }


    /*
     * Caso nenhum perfil tenha sido
     * selecionado, usa Pedro como padrão.
     */

    const perfilPedro =
        perfis.find(
            perfil =>
                perfil.id ===
                "pedro"
        );


    if (perfilPedro) {

        const foto =
            await obterFotoPerfil(
                perfilPedro
            );


        fotoHeader.src =
            foto;

    }

}


/* =========================================================
   ATUALIZAR HEADER QUANDO VOLTA
========================================================= */

async function atualizarTudo() {

    await criarPerfis();

    await atualizarFotoHeader();

}


/* =========================================================
   INICIALIZAÇÃO
========================================================= */

document.addEventListener(

    "DOMContentLoaded",

    async function() {

        /*
         * Cria as capas.
         */

        criarCapas();


        /*
         * Cria os perfis.
         */

        await criarPerfis();


        /*
         * Atualiza a foto do header.
         */

        await atualizarFotoHeader();


        /*
         * A primeira tela será
         * a tela inicial.
         */

        mostrarTela(
            "inicial"
        );

    }

);
