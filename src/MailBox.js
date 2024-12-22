import { humanizedName } from "./utils/humanizedName.js";

/**
 * Classe para gerenciar caixas de e-mail descartáveis.
 */
export class Mailbox {
  /**
   * Cria uma nova instância de Mailbox.
   *
   * @param {Object} options - Opções para a criação do e-mail.
   * @param {boolean} [options.humanized=false] - Se `true`, o endereço de e-mail terá um nome humanizado (ex: "quick-fox@tuamaeaquelaursa.com").
   * Caso contrário, um identificador aleatório será usado.
   */
  constructor({ humanized = false } = {}) {
    this.id = humanized
      ? humanizedName()
      : Math.random().toString(36).substring(2, 12);
    this.email = `${this.id}@tuamaeaquelaursa.com`;
  }

  /**
   * Aguarda um novo e-mail de um remetente específico na caixa de entrada.
   *
   * @param {string} sender - O endereço de e-mail do remetente a ser monitorado.
   * @param {number} maxTime - Tempo máximo para esperar em milissegundos (padrão: 30000ms).
   * @returns {Promise<Object>} - Promise que resolve com o e-mail recebido ou rejeita no timeout.
   *
   * @example
   * const email = await mailbox.waitForEmail("sender@example.com", 10000);
   * console.log(email);
   */
  async waitForEmail(sender, maxTime = 30000) {
    const url = `https://firestore.googleapis.com/v1/projects/temporary-email/databases/(default)/documents/MAILBOXES/${this.email}/INBOX`;
    const startTime = Date.now();

    return new Promise((resolve, reject) => {
      const checkInbox = async () => {
        try {
          const response = await fetch(url);
          const data = await response.json();
          const emails = data.documents || [];

          const newEmail = emails.find((doc) =>
            doc.fields.from.stringValue.includes(sender)
          );

          if (newEmail) {
            const parsedEmail = {
              id: newEmail.name.split("/").pop(),
              from: newEmail.fields.from.stringValue,
              recipient: newEmail.fields.recipient.stringValue,
              subject: newEmail.fields.subject.stringValue,
              bodyHtml: newEmail.fields.bodyHtml.stringValue,
              createdAt: new Date(
                parseInt(newEmail.fields.created_at.integerValue, 10)
              ),
            };

            resolve(parsedEmail);
            return;
          }

          if (Date.now() - startTime >= maxTime) {
            reject(
              new Error(
                "Timeout: Nenhum e-mail recebido dentro do tempo limite."
              )
            );
            return;
          }

          setTimeout(checkInbox, 1000);
        } catch (error) {
          reject(error);
        }
      };

      checkInbox();
    });
  }
}
