import { exec, execSync } from 'node:child_process'

execSync(
  `scp -r -i ./auth/sftp-chave-privada-c2.pem -P 9039 ctpsi_cred2cards@Conecta-balcao.b3.com.br:/ArqsBatch/*AGENDA-BATCH* ./tmp`,
)

console.log('Baixou o caralho a quatro')

execSync(
  `sftp -i ./auth/sftp-chave-privada-c2.pem -P 9039 -b ./auth/sftp_commands.txt  ctpsi_cred2cards@Conecta-balcao.b3.com.br`,
)

console.log('Estagiário deleteu o banco em produção')
