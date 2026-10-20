from config import *
from models.corpo import Corpo

def criar_corpo(data):
    corpo = Corpo(
        nome=data['nome'],
        idade=data['idade'],
        peso=data.get('peso'),
        altura=data['altura'],
        orgao_faltante=data['orgao_faltante']
    )
    
    
    # salvar no banco de dados
    db.session.add(corpo)
    db.session.commit()
    
    return corpo

def retornar_corpos():
    # buscar todos os corpos no 
    # banco de dados
    corpos = Corpo.query.order_by(Corpo.id.desc()).all()
    
    return corpos

# def gerar_token(login, senha):
#     # buscar o corpo pelo login
#     corpo = Corpo.query.filter_by(login=login).first()
    
#     if corpo:
#         # verificar se a senha fornecida corresponde à senha armazenada
#         password_bytes = senha.encode('utf-8')
#         stored_password_bytes = corpo.senha.encode('utf-8')
        
#         if bcrypt.checkpw(password_bytes, stored_password_bytes):
#             # gerar token JWT            
#             token = create_access_token(identity=str(corpo.id))
#             return token
    
#     return None
