var Tabuleiro = {
  A1: 0,
  A2: 0,
  A3: 0,
  B1: 0,
  B2: 0,
  B3: 0,
  C1: 0,
  C2: 0,
  C3: 0,
  _linhaValida(letra) {
    let temElementosVazios =
      this[`${letra}1`] === 0 ||
      this[`${letra}2`] === 0 ||
      this[`${letra}3`] === 0;
    let linhaDivisivelPorTres =
      (this[`${letra}1`] + this[`${letra}2`] + this[`${letra}3`]) % 3 === 0;
    return linhaDivisivelPorTres && !temElementosVazios;
  },
  _colunaValida(coluna) {
    let temElementosVazios =
      this[`A${coluna}`] === 0 ||
      this[`B${coluna}`] === 0 ||
      this[`C${coluna}`] === 0;
    let colunaDivisivelPorTres =
      (this[`A${coluna}`] + this[`B${coluna}`] + this[`C${coluna}`]) % 3 === 0;
    return colunaDivisivelPorTres && !temElementosVazios;
  },
  _diagonal1Valida(coluna) {
    let temElementosVazios = this.A1 === 0 || this.B2 === 0 || this.C3 === 0;
    let diagonalDivisivelPorTres = (this.A1 + this.B2 + this.C3) % 3 === 0;
    return diagonalDivisivelPorTres && !temElementosVazios;
  },
  _diagonal2Valida(coluna) {
    let temElementosVazios = this.A3 === 0 || this.B2 === 0 || this.C1 === 0;
    let diagonalDivisivelPorTres = (this.A3 + this.B2 + this.C1) % 3 === 0;
    return diagonalDivisivelPorTres && !temElementosVazios;
  },
  isFimDeJogo() {
    return (
      this._linhaValida('A') ||
      this._linhaValida('B') ||
      this._linhaValida('C') ||
      this._colunaValida('1') ||
      this._colunaValida('2') ||
      this._colunaValida('3') ||
      this._diagonal1Valida() ||
      this._diagonal2Valida()
    );
  },
  reiniciar() {
    this.A1 = 0;
    this.A2 = 0;
    this.A3 = 0;
    this.B1 = 0;
    this.B2 = 0;
    this.B3 = 0;
    this.C1 = 0;
    this.C2 = 0;
    this.C3 = 0;
  },
};

$(function () {
  const celulas = $('#tabuleiro .cell span');
  var vezDeJogar = 1;
  var jogoEncerrado = false;

  function reiniciarJogo() {
    Tabuleiro.reiniciar();
    vezDeJogar = 1;
    jogoEncerrado = false;
  }

  function fimDeJogo() {
    alert(`jogador ${vezDeJogar} venceu`);
    jogoEncerrado = true;
  }

  celulas.on('click', function () {
    if (!jogoEncerrado) {
      let parent = $(this).parent();
      let celula = parent.attr('data-valor');
      if (Tabuleiro[celula] == 0) {
        Tabuleiro[celula] = vezDeJogar;
        parent.addClass(`jogador-${vezDeJogar}`);
        if (Tabuleiro.isFimDeJogo()) {
          fimDeJogo();
        }
        vezDeJogar = vezDeJogar === 1 ? 2 : 1;
      }
    }
  });

  $('#reiniciar').on('click', function (e) {
    e.preventDefault();
    reiniciarJogo();
  });
});
