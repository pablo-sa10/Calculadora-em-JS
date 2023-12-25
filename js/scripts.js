const txtOperacaoAnterior = document.querySelector("#previous-operation");
const txtOperacaoAtual = document.querySelector("#current-operation");
const botoes = document.querySelectorAll("#button-container button");

class Calculadora {
    constructor(txtOperacaoAnterior, txtOperacaoAtual) {
        this.txtOperacaoAnterior = txtOperacaoAnterior;
        this.txtOperacaoAtual = txtOperacaoAtual;
        this.operacaoAtual = "";
    }

    adicionarDigito(digito) {
        // Verifica se a vírgula já foi inserida
        if (digito === "," && this.txtOperacaoAtual.innerText.includes(",")) {
            return;
        }
        this.operacaoAtual = digito;
        this.atualizarTela();
    }

    processarOperacao(operacao) {
        // Verifica se a tela está vazia e não foi pressionado o botão "C"
        if (this.txtOperacaoAtual.innerText === "" && operacao !== "C") {
            if (this.txtOperacaoAnterior.innerText !== "") {
                this.alterarOperacao(operacao);
            }
            return;
        }

        let valorOperacao;
        let anterior = +this.txtOperacaoAnterior.innerText.split(" ")[0];
        let atual = +this.txtOperacaoAtual.innerText;

        switch (operacao) {
            case "+":
                valorOperacao = anterior + atual;
                this.atualizarTela(valorOperacao, operacao, atual, anterior);
                break;
            case "-":
                valorOperacao = anterior - atual;
                this.atualizarTela(valorOperacao, operacao, atual, anterior);
                break;
            case "*":
                valorOperacao = anterior * atual;
                this.atualizarTela(valorOperacao, operacao, atual, anterior);
                break;
            case "/":
                valorOperacao = anterior / atual;
                this.atualizarTela(valorOperacao, operacao, atual, anterior);
                break;
            case "DEL":
                this.processarOperadorDel();
                break;
            case "CE":
                this.processarOperacaoCE();
                break;
            case "C":
                this.limparOperacao();
                break;
            case "=":
                this.processarIgual();
                break;
            default:
                return;
        }
    }

    // Atualiza a tela da calculadora
    atualizarTela(valorOperacao = null, operacao = null, atual = null, anterior = null) {
        if (valorOperacao === null) {
            // Adiciona o número ao valor atual
            this.txtOperacaoAtual.innerText += this.operacaoAtual;
        } else {
            // Atualiza a tela com o resultado da operação
            valorOperacao = anterior !== null ? valorOperacao : atual;
            this.txtOperacaoAnterior.innerText = `${valorOperacao} ${operacao || ''}`;
            this.txtOperacaoAtual.innerText = "";
        }
    }

    // Altera a operação na tela
    alterarOperacao(operacao) {
        const operacoesMatematicas = ["*", "/", "+", "-"];

        if (!operacoesMatematicas.includes(operacao)) {
            return;
        }

        this.txtOperacaoAnterior.innerText = `${this.txtOperacaoAnterior.innerText.slice(0, -1)}${operacao}`;
    }

    // Processa o botão DEL
    processarOperadorDel() {
        this.txtOperacaoAtual.innerText = this.txtOperacaoAtual.innerText.slice(0, -1);
    }

    // Processa o botão CE
    processarOperacaoCE() {
        this.txtOperacaoAtual.innerText = "";
    }

    // Limpa toda a operação
    limparOperacao() {
        this.txtOperacaoAnterior.innerText = "";
        this.txtOperacaoAtual.innerText = "";
    }

    // Processa o botão igual
    processarIgual() {
        const operacao = txtOperacaoAnterior.innerText.split(" ")[1];
        this.processarOperacao(operacao);
    }
}

// Instanciação da calculadora
const calc = new Calculadora(txtOperacaoAnterior, txtOperacaoAtual);

// Adiciona os event listeners aos botões
botoes.forEach((botao) => {
    botao.addEventListener("click", (e) => {
        const valor = e.target.innerText;

        if (+valor >= 0 || valor === ",") {
            calc.adicionarDigito(valor);
        } else {
            calc.processarOperacao(valor);
        }
    });
});
