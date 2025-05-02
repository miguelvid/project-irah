// generate-hash.js
import { hash as _hash } from "bcrypt";

const password = process.argv[2]; // Pega a senha do argumento da linha de comando

if (!password) {
  console.error("Por favor, forneça uma senha como argumento.");
  console.log("Uso: node generate-hash.js <sua_senha_aqui>");
  process.exit(1);
}

const saltRounds = 10; // Número de rounds para o salt (padrão recomendado)

_hash(password, saltRounds, (err, hash) => {
  if (err) {
    console.error("Erro ao gerar hash:", err);
    process.exit(1);
  }
  console.log("Senha:", password);
  console.log("Hash gerado (copie este valor para ADMIN_PASSWORD_HASH):");
  console.log(hash);
});
