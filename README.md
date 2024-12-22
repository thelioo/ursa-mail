# Ursa Mail

Ursa Mail é uma biblioteca simples para criar e gerenciar caixas de e-mail descartáveis.

---

## 🚀 Instalação

Com npm:

```bash
npm install ursa-mail
```

Com Yarn:

```bash
yarn add ursa-mail
```

---

## 📦 Uso

### Criar uma Caixa de E-mail

```javascript
import { Mailbox } from "ursa-mail";

// Identificador aleatório
const mailbox = new Mailbox();
console.log(mailbox.email); // Exemplo: "abc123xyz@tuamaeaquelaursa.com"

// Nome humanizado
const humanizedMailbox = new Mailbox({ humanized: true });
console.log(humanizedMailbox.email); // Exemplo: "quick-fox@tuamaeaquelaursa.com"
```

### Aguardar um E-mail

```javascript
try {
  const email = await mailbox.waitForEmail("sender@example.com", 30000);
  console.log("E-mail recebido:", email);
} catch (error) {
  console.error("Erro:", error.message);
}
```

---

## 📖 API

### Classe: `Mailbox`

#### Construtor

```javascript
new Mailbox({ humanized = false })
```

- **`humanized` (opcional)**: Gera nomes amigáveis (ex.: `quick-fox`). Padrão: `false`.

#### Métodos

- **`waitForEmail(sender, maxTime)`**
  - **`sender`**: E-mail do remetente.
  - **`maxTime`**: Tempo máximo de espera (ms). Padrão: `30000`.

---

## 🌟 Exemplo Completo

```javascript
import { Mailbox } from "ursa-mail";

const mailbox = new Mailbox({ humanized: true });
console.log("Caixa de e-mail:", mailbox.email);

try {
  const email = await mailbox.waitForEmail("sender@example.com", 30000);
  console.log("Novo e-mail recebido:", email);
} catch (error) {
  console.error("Erro:", error.message);
}
```
