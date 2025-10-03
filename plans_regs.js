function apagarCompiladoRegs() {
  
  for(let n = 0; n < infos_plans_regs.length; n++){
    const dado = infos_plans_regs[n]

    const plan_atual = SpreadsheetApp.openByUrl(dado.url)

    console.log('vamos apagar ' + dado.nome)

    const dados_compilados = plan_atual.getSheetByName('Quadro Compilado').clear()

    
  }

}

function apagarApontsRegs() {

  const amarelas = [
    5,
    8,
    11,
    13,
    19,
    20,
  ]
  
  for(let n = 0; n < infos_plans_regs.length; n++){
    const dado = infos_plans_regs[n]

    const plan_atual = SpreadsheetApp.openByUrl(dado.url)
    const aba_reg = plan_atual.getSheetByName(dado.regional)

    console.log(dado.regional)
    
    amarelas.forEach(col => {
      aba_reg.getRange(3,col,aba_reg.getLastRow()).clear()

      console.log('apagada coluna ' + col)
    })
    
  }


}

function compiladoParaRegs(){
  const aba_compilado = plan_quadro.getSheetByName('Quadro Compilado')
  const dados_compilado = aba_compilado.getRange(1,1,aba_compilado.getLastRow(),16).getValues()

  for(let n = 0; n < infos_plans_regs.length; n++){
    const infos_plan_reg = infos_plans_regs[n]

    const plan_atual = SpreadsheetApp.openByUrl(infos_plan_reg.url)
    const aba_compilado_reg = plan_atual.getSheetByName('Quadro Compilado')

    console.log(infos_plan_reg.regional)
    aba_compilado_reg.clear()
    aba_compilado_reg.getRange(1,1,dados_compilado.length,16).setValues(dados_compilado)
    
  } 
}

function atualizarFormulaRegs() {
  for(let n = 0; n < infos_plans_regs.length; n++){
    const dado = infos_plans_regs[n]
    const plan_reg = dado.plan
    const quadro_comp_reg = plan_reg.getSheetByName(dado.regional)

    for(let col = 1; col <= quadro_comp_reg.getLastColumn(); col++){
      const formula_antiga = quadro_comp_reg.getRange(3,col).getFormula()
      const nova_formula = formula_antiga.replace("'Quadro Compilado'!$G:$G","'Quadro Compilado'!$H:$H")
      

      if(formula_antiga != ""){
        console.log(formula_antiga)
        quadro_comp_reg.getRange(3,col).setFormula(nova_formula)
        console.log('coluna: ' + col + ' / regional: ' + dado.regional)
        
      }
      
    }
    
  }
}