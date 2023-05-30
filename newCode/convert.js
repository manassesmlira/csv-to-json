const csvtojson = require('csvtojson');
const fs = require('fs');

const caminhoDoArquivo = 'cole aqui o caminho do arquivo'

function getBy(arr, param, value) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][param] === value) {
      console.log(arr[i])
    }
  }
}

csvtojson().fromFile(caminhoDoArquivo).then((jsonObj) => {
  const arrAlunos = []

  for (let i = 0; i < jsonObj.length; i++) {
    const dadoTransformado = {}
    const dados = jsonObj[i]
    const pegarChaves = Object.getOwnPropertyNames(data)
    const arrChaves = pegarChaves[0].split(',')

    for (let valor in dados) {
      const arrValores = dados[valor].split(',');

      for (let i = 0; i < arrChaves.length; i++) {
        dadoTransformado[arrChaves[i]] = arrValores[i]
      }

    }
    arrAlunos.push(dadoTransformado)
  }

  // procura por parametro e valor
  getBy(arrAlunos, 'idade', "17")

  const jsonString = JSON.stringify(arrAlunos, null, 2);
  fs.writeFile('cole aqui o caminho que você quer o novo arquivo/nomeDoArquivo.json', jsonString, (err) => {
    if (err) {
      console.log(err)
    } else {
      console.log('Converteu')
    }
  })

}).catch((err) => {
  console.log(`catch: ${err}`)
})