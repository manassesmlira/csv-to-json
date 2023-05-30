
var jsonData = []; // resultado final

//caso clique no botão sem selecionar arquivo
function subiuArquivo() {
    var arquivo = document.getElementById('file').files;
    if (arquivo.length == 0) {
        alert("Please choose any file...");
        return;
    }
    //caso clique no botão sem selecionar arquivo


    //verificando se o arquivo é csv
    var filename = arquivo[0].name;
    var extension = filename.substring(filename.lastIndexOf(".")).toUpperCase();
    if (extension == '.CSV') {
        //aqui envia o arquivo para a função
        csvFileToJSON(arquivo[0]);
    } else {
        alert("Please select a valid csv file.");
    }
}

//recebe o arquivo e inicia a conversaõ para json 
function csvFileToJSON(file) {
    try { // try é tente, uma forma de segurar que o código inteiro não quebre, ele tenta e se não conseguir gera um erro
        var leitor = new FileReader();
        leitor.readAsBinaryString(file);
        leitor.onload = function (e) {

            var cabecalho = []; // titulos da planilha na linha inicial, um array só com os títulos nome, idade, etcc
            var arrayLinhas = e.target.result.split("\r\n");  //o split separa por linhas e cria um array na variavel arraylinhas


            for (var indexLinha = 0; indexLinha < arrayLinhas.length; indexLinha++) {
                var colunas = arrayLinhas[indexLinha].split(","); // dessa forma criamos um array com as colunas do arquivo. As colunas são separadas por vírgula no cvs quando aberto como txt
                var conteudoLinhas = {}; //declaramos um objeto para receber o conteudo das linhas temporariamente


                for (var indexColuna = 0; indexColuna < colunas.length; indexColuna++) {

                    if (indexLinha == 0) {

                        var valorTexto = colunas[indexColuna].trim(); // trim é tirar espaços da string, aqui pegamos o titulo na linha
                        cabecalho.push(valorTexto); //add no array cabeçalho o titulo/valor, conteúdo da string
                    } else {
                        var key = cabecalho[indexColuna];
                        if (key) {
                            conteudoLinhas[key] = colunas[indexColuna].trim(); //isso é um objeto 'chave':'valor' conhecido como json. Ex; {'nome':'maria'}
                        }
                    }
                }

                //skip the first row (header) data
                if (indexLinha != 0) {

                    jsonData.push(conteudoLinhas);
                }
            }

            //mostrando na tela o resultado de json
            document.getElementById("resultado").innerHTML = JSON.stringify(jsonData);
            document.getElementById("maior25").innerHTML = JSON.stringify(maior_de25);
            document.getElementById("menor25").innerHTML = JSON.stringify(menor_de25);
        }

    } catch (e) {
        console.error(e);
    }
}

