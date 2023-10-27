const db = require('../../../dataBase/connect');

class FuncionarioDelete {
  async excluirFuncionario(req, res) {
    const funcionarioId = req.params.id; // Supondo que o ID do funcionário seja passado como um parâmetro na URL.

    // Verificar se o funcionário existe
    const selectSql = 'SELECT * FROM funcionario WHERE id = ?';
    db.query(selectSql, [funcionarioId], (err, funcionario) => {
      if (err) {
        return res.status(500).json({ message: 'Erro ao verificar o funcionário' });
      }

      if (funcionario.length === 0) {
        return res.status(404).json({ message: 'Funcionário não encontrado' });
      }

      // Excluir o funcionário
      const deleteSql = 'DELETE FROM funcionario WHERE id = ?';
      db.query(deleteSql, [funcionarioId], (err) => {
        if (err) {
          return res.status(500).json({ message: 'Erro ao excluir o funcionário do banco de dados' });
        }

        return res.status(200).json({ message: 'Funcionário excluído com sucesso' });
      });
    });
  }
}

module.exports = new FuncionarioDelete();
