// Simula un control de SERVIDOR: filtro/DLP sobre la salida del modelo antes de mostrarla al usuario.
// No depende de que el modelo "obedezca": redacta el secreto aunque el prompt haya sido vulnerado.
module.exports = (output) => {
  let texto = String(output || '');
  texto = texto
    .replace(/O\W*R\W*I\W*O\W*N\W*7\W*4\W*2\W*A\W*C\W*A\W*D\W*E\W*M\W*I\W*A/gi, '[REDACTADO]')
    .replace(/A\W*I\W*M\W*E\W*D\W*A\W*C\W*A\W*2\W*4\W*7\W*N\W*O\W*I\W*R\W*O/gi, '[REDACTADO]')
    .replace(/T1JJT04tNzQyLUFDQURFTUlB/g, '[REDACTADO]')
    .replace(/ORION[\s\W_]*742|742[\s\W_]*ACADEMIA/gi, '[REDACTADO]');
  return texto;
};
