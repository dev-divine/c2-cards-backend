import { exec } from 'node:child_process'

function duMal(value) {
  exec(
    `scp -r -i ./auth/sftp-chave-privada-c2.pem -P 9039 ctpsi_cred2cards@Conecta-balcao.b3.com.br:/ArqsBatch/*${value}* ./tmp`,
    (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`)
        return
      }
      console.log(`stdout: ${stdout}`)
      if (stderr) {
        console.log(`stderr: ${stderr}`)
      }
    },
  )
}

duMal(2024022703830746)
