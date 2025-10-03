function populaAbaEnderecos() {
  const infos_plans_regs = plans_regionais()

  for(let n = 0; n < infos_plans_regs.length; n++){
    const dado = infos_plans_regs[n]

    plan_quadro.getSheetByName('Endereços imports').getRange(n+2,1).setValue(dado.regional)
    plan_quadro.getSheetByName('Endereços imports').getRange(n+2,2).setValue(dado.url)
  }

  console.log('finalizado')
  
}

function teste() {
  const aba_amarelas = plan_quadro.getSheetByName('Colunas amarelas')
  console.log(aba_amarelas.getRange(1,1).getValue())
}

function colunasAmarelas() {
  const infos_plans_regs = plans_regionais()

  const aba_compilada = plan_quadro.getSheetByName('Quadro Compilado')
  const mats_quadro = aba_compilada.getRange(2,1,aba_compilada.getLastRow()).getValues().flat()
  const cols_amarelas = []

  for(let n = 0; n < infos_plans_regs.length; n++){
    const dado = infos_plans_regs[n]
    const plan_reg = dado.plan //spreadsheet
    const quadro_reg = plan_reg.getSheetByName(dado.regional) //sheet

    const dados_reg = quadro_reg.getDataRange().getValues()

    const cods_reg = dados_reg.map(linha=>{
      return linha[0]
    })

    const amarelas_reg = dados_reg.map(linha => {
      return [
        linha[4],
        linha[8],
        linha[11],
        linha[13],
        linha[19],
        linha[20]
      ]
    })

    cods_reg.forEach((codigo,i) =>{
      cols_amarelas[mats_quadro.indexOf(codigo)] = amarelas_reg[i]
    })

    console.log('foi ' + dado.regional)
  }

  aba_compilada.getRange(2,17,cols_amarelas.length,6).setValues(cols_amarelas)

  }