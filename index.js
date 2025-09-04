// ---- Funções para salvar/carregar tarefas ----
function getTarefasDoLocalStorage() {
    return JSON.parse(localStorage.getItem("tarefas")) || [];
}

function salvarTarefasNoLocalStorage(tarefas) {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function adicionarTarefa() {
    let input = document.getElementById("tarefaInput");
    let etiquetaInput = document.getElementById("etiquetaInput");
    let textoTarefa = input.value.trim();
    let textoEtiqueta = etiquetaInput.value.trim();

    if (textoTarefa === "") {
        alert("Digite uma tarefa!");
        return;
    }

    let lista = document.getElementById("listaTarefas");

    // Criar container da tarefa
    let tarefaDiv = document.createElement("div");
    tarefaDiv.classList.add("tarefa");

    // Conteúdo da tarefa
    let tarefaInfo = document.createElement("div");
    tarefaInfo.classList.add("tarefa-info");

    let descricao = document.createElement("span");
    descricao.textContent = textoTarefa;

    // Etiqueta
    let etiqueta = document.createElement("span");
    etiqueta.classList.add("etiqueta");
    etiqueta.textContent = textoEtiqueta || "Sem etiqueta";

    // Data de criação
    let data = document.createElement("span");
    data.classList.add("data");
    let hoje = new Date();
    data.textContent = `Criado em: ${hoje.toLocaleDateString("pt-BR")}`;

    tarefaInfo.appendChild(descricao);

    // Criar um container para etiqueta + data
    let metaInfo = document.createElement("div");
    metaInfo.classList.add("meta-info"); // classe para estilizar lado a lado
    metaInfo.appendChild(etiqueta);
    metaInfo.appendChild(data);

    tarefaInfo.appendChild(metaInfo);

    // Botão concluir
    let btnConcluir = document.createElement("button");
    btnConcluir.textContent = "Concluir";
    btnConcluir.classList.add("btn-concluir");
    btnConcluir.onclick = function () {
        descricao.classList.add("tarefa-concluida");
        btnConcluir.remove();
        let checkImg = document.createElement("img");
        checkImg.src = "img/Checked.png";
        checkImg.classList.add("img-check");
        tarefaDiv.appendChild(checkImg);

        // Atualiza no localStorage que a tarefa foi concluída
        let tarefas = getTarefasDoLocalStorage();
        tarefas = tarefas.map(t => {
            if (t.textoTarefa === textoTarefa && t.textoEtiqueta === textoEtiqueta) {
                return { ...t, concluida: true };
            }
            return t;
        });
        salvarTarefasNoLocalStorage(tarefas);
        atualizarContador()
    };

    tarefaDiv.appendChild(tarefaInfo);
    tarefaDiv.appendChild(btnConcluir);
    lista.appendChild(tarefaDiv);

    // --- SALVAR NO LOCALSTORAGE ---
    let tarefas = getTarefasDoLocalStorage();
    tarefas.push({
        textoTarefa: textoTarefa,
        textoEtiqueta: textoEtiqueta || "Sem etiqueta",
        data: hoje.toLocaleDateString("pt-BR"),
        concluida: false
    });
    salvarTarefasNoLocalStorage(tarefas);

    // Limpar campos
    input.value = "";
    etiquetaInput.value = "";
    atualizarContador()
}

function carregarTarefas() {
    let tarefas = getTarefasDoLocalStorage();
    let lista = document.getElementById("listaTarefas");

    tarefas.forEach(t => {
        let tarefaDiv = document.createElement("div");
        tarefaDiv.classList.add("tarefa");

        let tarefaInfo = document.createElement("div");
        tarefaInfo.classList.add("tarefa-info");

        let descricao = document.createElement("span");
        descricao.textContent = t.textoTarefa;
        if (t.concluida) {
            descricao.classList.add("tarefa-concluida");
        }

        let etiqueta = document.createElement("span");
        etiqueta.classList.add("etiqueta");
        etiqueta.textContent = t.textoEtiqueta;

        let data = document.createElement("span");
        data.classList.add("data");
        data.textContent = `Criado em: ${t.data}`;

        tarefaInfo.appendChild(descricao);

        // Criar um container para etiqueta + data
        let metaInfo = document.createElement("div");
        metaInfo.classList.add("meta-info");
        metaInfo.appendChild(etiqueta);
        metaInfo.appendChild(data);

        tarefaInfo.appendChild(metaInfo);


        if (!t.concluida) {
            let btnConcluir = document.createElement("button");
            btnConcluir.textContent = "Concluir";
            btnConcluir.classList.add("btn-concluir");
            btnConcluir.onclick = function () {
                descricao.classList.add("tarefa-concluida");
                btnConcluir.remove();
                let checkImg = document.createElement("img");
                checkImg.src = "img/Checked.png";
                checkImg.classList.add("img-check");
                tarefaDiv.appendChild(checkImg);

                // Atualiza no localStorage
                let tarefasLS = getTarefasDoLocalStorage();
                tarefasLS = tarefasLS.map(item => {
                    if (item.textoTarefa === t.textoTarefa && item.textoEtiqueta === t.textoEtiqueta) {
                        return { ...item, concluida: true };
                    }
                    return item;
                });
                salvarTarefasNoLocalStorage(tarefasLS);
            };
            tarefaDiv.appendChild(tarefaInfo);
            tarefaDiv.appendChild(btnConcluir);
        } else {
            tarefaDiv.appendChild(tarefaInfo);
            let checkImg = document.createElement("img");
            checkImg.src = "img/Checked.png";
            checkImg.classList.add("img-check");
            tarefaDiv.appendChild(checkImg);
        }


        lista.appendChild(tarefaDiv);
    });
    atualizarContador()
}

function atualizarContador() {
    let tarefas = getTarefasDoLocalStorage();
    let concluidas = tarefas.filter(t => t.concluida).length;
    let total = tarefas.length;
    let contador = document.getElementById("contadorTarefas");
    contador.textContent = `${concluidas} / ${total} concluídas`;
}


window.onload = function() {
    carregarTarefas();
};