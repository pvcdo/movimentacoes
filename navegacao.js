function plans_regionais() {
  const pasta_regionais = DriveApp.getFolderById('1feGzdrQB4xmyan0QtiqrKdMbA3A12tWQ')
  const arqs = pasta_regionais.getFiles()
  var infos = []

  while(arqs.hasNext()){
    const arq = arqs.next()

    const nome = arq.getName()
    const regional = nome.split('-')[0].trim()
    const url = arq.getUrl()
    const plan = SpreadsheetApp.openByUrl(url)

    infos.push({nome,regional,url,plan})  
  }

  return infos
}