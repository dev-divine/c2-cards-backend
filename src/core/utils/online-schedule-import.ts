import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'

interface Input {
  tmpPath: string
  scheduleProtocol: string
  maxAttempts?: number
}

function checkFilesInDirectory(directoryPath: string) {
  try {
    const files = fs.readdirSync(directoryPath)
    return files.length > 0
  } catch (error) {
    console.error('Erro ao verificar arquivos no diretório:', error)
    return false
  }
}

function readJsonFile(filePath: string) {
  try {
    const rawData = fs.readFileSync(filePath)
    return JSON.parse(rawData)
  } catch (error) {
    console.error('Erro ao ler o arquivo JSON:', error)
    return null
  }
}

function deleteFilesInDirectory(directoryPath: string) {
  try {
    const files = fs.readdirSync(directoryPath)
    files.forEach((file) => {
      const filePath = path.join(directoryPath, file)
      fs.unlinkSync(filePath)
    })
  } catch (error) {
    console.error('Erro ao deletar arquivos no diretório:', error)
  }
}

export async function attemptFileTransferAndUnzip({
  tmpPath,
  scheduleProtocol,
  maxAttempts = 3,
}: Input) {
  let attempts = 0
  let jsonData = null

  while (attempts < maxAttempts) {
    try {
      execSync(
        `scp -r -i ../../../../auth/sftp-chave-privada-c2.pem -P 9039 ctpsi_cred2cards@Conecta-balcao.b3.com.br:/ArqsBatch/*${scheduleProtocol}* ${tmpPath}`,
        { stdio: 'inherit' },
      )

      if (checkFilesInDirectory(tmpPath)) {
        execSync(`./unzip_all.sh`, { stdio: 'inherit', cwd: tmpPath })

        const jsonFilePath = path.join(tmpPath, 'arquivo.json')
        jsonData = readJsonFile(jsonFilePath)

        deleteFilesInDirectory(tmpPath)

        console.log('Arquivos descompactados e processados com sucesso.')
        break
      } else {
        throw new Error('Nenhum arquivo encontrado após a transferência.')
      }
    } catch (error) {
      console.error(
        'Erro durante a tentativa de transferência e descompactação:',
        error,
      )
      attempts++
      if (attempts < maxAttempts) {
        await new Promise((resolve) => setTimeout(resolve, 10000))
      }
    }
  }

  if (attempts === maxAttempts) {
    console.log('Número máximo de tentativas alcançado sem sucesso.')
  }

  return jsonData
}


