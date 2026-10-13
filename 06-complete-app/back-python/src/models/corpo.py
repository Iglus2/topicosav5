from config import *
class Corpo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(200), nullable=False)
    idade = db.Column(db.Integer(200), nullable=False)
    peso = db.Column(db.Integer(200), nullable=True)
    altura = db.Column(db.Integer(200), nullable=False)
    orgao_faltante = db.Column(db.String(200), nullable=False)

    def json(self):
        return {
            "id":self.id,
            "nome":self.nome,
            "idade":self.idade,
            "peso":self.peso,
            "altura":self.altura,
            "orgao_faltante":self.orgao_faltante
            }
