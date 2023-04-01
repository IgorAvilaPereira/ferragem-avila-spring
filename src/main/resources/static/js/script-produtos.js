// Função que lista todos produtos.
function listarProdutos() {

    $.ajax({
        method: "GET",
        url: "http://localhost:8081/ferragem-avila/listartodos_produto",
        contentType: "application/json; charset=utf-8",
        success: function (response) {
            $('#tabelaProdutos > tbody > tr').remove();
            for (var i = 0; i < response.length; i++) {
                $('#tabelaProdutos > tbody').append('<tr id="' + response[i].id + '"><td id="tabela_id">' + response[i].id + '</td><td id="tabela_descricao">' + response[i].descricao + '</td><td id="tabela_valor">' + response[i].preco.toLocaleString("pt-BR",
                        {style: "currency", currency: "BRL"}) + '</td><td id="tabela_estoque">' + response[i].estoque + '</td><td id="tabela_cod_barras">' + response[i].cod_barras + '</td><td id="tabela_btn_editar" class="icon-centralized"><button type="button" class="btn btn-warning" data-toggle="modal" data-target="#modalAtualizaProduto" onclick="atualizarProduto(' + response[i].id + ')"><i class="fa-solid fa-pen-to-square"></i></button></td><td id="tabela_btn_deletar" class="icon-centralized"><button type="button" class="btn btn-danger" onclick="deletarProduto(' + response[i].id + ')"><i class="fa-solid fa-trash-can"></i></button></td></tr>');
            }
        }
    }).fail(function (xhr, status, errorThrown) {
        alert("Erro ao listar produtos: " + xhr.responseText);
    });

}

// ====================== PESQUISAR PRODUTOS ====================== \\

// Função que pesquisa o produto por nome.
function pesquisarPorNome() {
    var nome = $('#pesquisa_nome').val();

    $.ajax({
        method: "GET",
        url: "http://localhost:8081/ferragem-avila/buscarPorNome_produto",
        data: "nome=" + nome,
        success: function (response) {
            $('#tabelaProdutos > tbody > tr').remove();

            for (var i = 0; i < response.length; i++) {
                $('#tabelaProdutos > tbody').append('<tr id="' + response[i].id + '"><td id="tabela_id">' + response[i].id + '</td><td id="tabela_nome">' + response[i].nome + '</td><td id="tabela_descricao">' + response[i].descricao + '</td><td id="tabela_valor">' + response[i].valor.toLocaleString("pt-BR",
                        {style: "currency", currency: "BRL"}) + '</td><td id="tabela_quantidade">' + response[i].quantidade + '</td><td id="tabela_cod_barras">' + response[i].cod_barras + '</td><td id="tabela_btn_editar"><button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#modalAtualizaProduto" onclick="atualizarProduto(' + response[i].id + ')">Editar</button></td><td id="tabela_btn_deletar"><button type="button" class="btn btn-danger" onclick="deletarProduto(' + response[i].id + ')">Excluir</button></td></tr>');
            }
        }
    }).fail(function (xhr, status, errorThrown) {
        alert("Erro ao buscar produto por nome: " + xhr.responseText);
    });
}

// Função que pesquisa o produto por id.
function pesquisarPorId() {
    var id = $("#pesquisa_id").val();

    $.ajax({
        method: "GET",
        url: "http://localhost:8081/ferragem-avila/buscarPorId_produto",
        data: "idProduto=" + id,
        success: function (response) {
            $('#tabelaProdutos > tbody > tr').remove();

            for (var i = 0; i < response.length; i++) {
                $('#tabelaProdutos > tbody').append('<tr id="' + response[i].id + '"><td id="tabela_id">' + response[i].id + '</td><td id="tabela_descricao">' + response[i].descricao + '</td><td id="tabela_valor">' + response[i].preco.toLocaleString("pt-BR",
                        {style: "currency", currency: "BRL"}) + '</td><td id="tabela_quantidade">' + response[i].quantidade + '</td><td id="tabela_cod_barras">' + response[i].cod_barras + '</td><td id="tabela_btn_editar"><button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#modalAtualizaProduto" onclick="atualizarProduto(' + response[i].id + ')">Editar</button></td><td id="tabela_btn_deletar"><button type="button" class="btn btn-danger" onclick="deletarProduto(' + response[i].id + ')">Excluir</button></td></tr>');
            }
        }
    }).fail(function (xhr, status, errorThrown) {
        alert("Erro ao buscar produto por id: " + xhr.responseText);
    });
}

// Função que pesquisa o produto por código de barras.
function pesquisarPorCodBarras() {
    var cod_barras = $('#pesquisa_cod_barras').val();

    $.ajax({
        method: "GET",
        url: "http://localhost:8081/ferragem-avila/buscarPorCodBarras_produto",
        data: "cod_barras=" + cod_barras,
        success: function (response) {
            $('#tabelaProdutos > tbody > tr').remove();

            for (var i = 0; i < response.length; i++) {
                $('#tabelaProdutos > tbody').append('<tr id="' + response[i].id + '"><td id="tabela_id">' + response[i].id + '</td><td id="tabela_nome">' + response[i].nome + '</td><td id="tabela_descricao">' + response[i].descricao + '</td><td id="tabela_valor">' + response[i].valor.toLocaleString("pt-BR",
                        {style: "currency", currency: "BRL"}) + '</td><td id="tabela_quantidade">' + response[i].quantidade + '</td><td id="tabela_cod_barras">' + response[i].cod_barras + '</td><td id="tabela_btn_editar"><button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#modalAtualizaProduto" onclick="atualizarProduto(' + response[i].id + ')">Editar</button></td><td id="tabela_btn_deletar"><button type="button" class="btn btn-danger" onclick="deletarProduto(' + response[i].id + ')">Excluir</button></td></tr>');
            }
        }
    }).fail(function (xhr, status, errorThrown) {
        alert("Erro ao buscar produto por código de barras: " + xhr.responseText);
    });
}

// Função que pesquisa o produto pelo filtro escolhido (usa as 3 anteriores e pesquisa pelo primeiro input que contenha dados para realizar a pesquisa).
function pesquisarPorFiltros() {

    var id = $("#pesquisa_id").val();
    var nome = $("#pesquisa_nome").val();
    var cod_barras = $("#pesquisa_cod_barras").val();

    if (id != null && id.trim() != '') {
        pesquisarPorId();
    } else if (nome != null && nome.trim() != '') {
        pesquisarPorNome();
    } else if (cod_barras != null && cod_barras.trim() != '') {
        pesquisarPorCodBarras();
    } else {
        listarProdutos();
    }

}

// ================================================================= \\



// ====================== CADASTRO DE PRODUTOS ====================== \\

function salvarProduto() {
    var id = $("#id").val();
    var descricao = $("#descricao").val();
    var valor = $("#valor").val();
    var quantidade = $("#quantidade").val();
    var cod_barras = $("#cod_barras").val();

    if (descricao == null || descricao != null && descricao.trim() == '') {
        alert('Produtos sem descrição não podem ser cadastrados.');
        return;
    }

    $.ajax({
        method: "POST",
        url: "http://localhost:8081/ferragem-avila/salvar_produto",
//    	data: JSON.stringify({id: id, nome: nome, descricao: descricao, preco: valor, quantidade: quantidade, cod_barras: cod_barras}),
        data: JSON.stringify({id: id, descricao: descricao, preco: valor, estoque: quantidade, cod_barras: cod_barras}),
        contentType: "application/json; charset=utf-8",
        success: function (response) {
            $("#id").val(response.id),
                    document.getElementById('formCadastroProduto').reset();
            listarProdutos();
        }
    }).fail(function (xhr, status, errorThrown) {
        alert("Erro ao cadastrar produto: " + xhr.responseText);
    });

}

// Função que salva o produto no Banco de dados após ser atualizado.
function salvarProdutoAtualizado() {
    var id = $("#id2").val();
    var descricao = $("#descricao2").val();
    var valor = $("#valor2").val();
    var quantidade = $("#quantidade2").val();
    var cod_barras = $("#cod_barras2").val();

    if (descricao == null || descricao != null && descricao.trim() == '') {
        alert('Produtos sem descrição não podem ser cadastrados.');
        return;
    }

    $.ajax({
        method: "POST",
        url: "http://localhost:8081/ferragem-avila/salvar_produto",
        data: JSON.stringify({id: id, descricao: descricao, valor: valor, quantidade: quantidade, cod_barras: cod_barras}),
        contentType: "application/json; charset=utf-8",
        success: function (response) {
            $("#id").val(response.id),
            document.getElementById('formCadastroProduto').reset();
            listarProdutos();
        }
    }).fail(function (xhr, status, errorThrown) {
        alert("Erro ao atualizar produto: " + xhr.responseText);
    });

}

// Função que atualiza o produto.
function atualizarProduto(id) {

    $.ajax({
        method: "GET",
        url: "http://localhost:8081/ferragem-avila/buscar_produto",
        data: "idProduto=" + id,
        success: function (response) {
            $("#id2").val(response.id);
            $("#descricao2").val(response.descricao);
            $("#valor2").val(response.valor);
            $("#quantidade2").val(response.quantidade);
            $("#cod_barras2").val(response.cod_barras);
        }
    }).fail(function (xhr, status, errorThrown) {
        alert("Erro ao atualizar produto: " + xhr.responseText);
    });
}

// Função que deletar produto do Banco de dados.
function deletarProduto(id) {

    if (confirm('Deletar produto?')) {
        $.ajax({
            method: "DELETE",
            url: "http://localhost:8081/ferragem-avila/deletar_produto",
            data: "idProduto=" + id,
            success: function (response) {
                $('#' + id).remove();
            }
        }).fail(function (xhr, status, errorThrown) {
            alert("Erro ao deletar produto: " + xhr.responseText);
        });
    }
}

// =================================================================== \\