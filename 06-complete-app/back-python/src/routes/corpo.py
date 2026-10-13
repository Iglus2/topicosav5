from config import *
from models.corpo import Corpo
import services.corpo as corpo_service




@app.route('/corpos', methods=['GET'])
def retornar_corpos():

    # buscar os corpos
    corpos = corpo_service.retornar_corpos()
    
    # retornar a lista de corpos em JSON
    return jsonify({
        "resultado":"ok",
        "detalhes":[corpo.json() for corpo in corpos]
    })







'''
--------------
INCLUIR PESSOA
--------------
'''

'''
TESTE DE ROTA - Pessoa - POST

curl http://localhost:5000/pessoa -X POST -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTc4NDU4NDIwNCwianRpIjoiNDE0NWNhOTUtYzA0NS00Mjk2LThjZjctNjUxNzliZTA5ZTMzIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IjEiLCJuYmYiOjE3ODQ1ODQyMDQsImNzcmYiOiJhMmMxNTU4Yy1lNjI0LTQ2OTYtOWRlZi0wZGY5YTg4Mjc0MzMiLCJleHAiOjE3ODQ1ODUxMDR9.C2ZOz5K7Dm90QCXsiGC7BslmHn-DGYsVYRUtmmaPWsI" -H "Content-Type:application/json" -d '{"nome":"Tiago Matos", "email":"tima@gmail.com","telefone":"47 9 8899 7766", "login":"tima","senha":"tima123"}'
{"detalhes":{"email":"tima@gmail.com","id":2,"login":"tima","nome":"Tiago Matos","senha":"$2b$12$x6rPCQgWQWNfYAOzHv5s5ua/mIe9jKI77lZQ9GLi/9oDAEZlpvCVe","telefone":"47 9 8899 7766"},"resultado":"ok"}

'''

# rota para inserir um corpo
@app.route('/corpo', methods=['POST'])
@jwt_required()  # exige que o usuário esteja autenticado para acessar esta rota
def criar_corpo():
    # ler os dados em json
    dados = request.json
    
    # se faltou algum dado obrigatório...
    if not dados or not dados.get('nome') or not dados.get('idade') or not dados.get('peso') or not dados.get('altura') or not dados.get('orgao_faltante'):
        # retorna erro
        return jsonify({"resultado":"erro", "detalhes":"Nome, idade, peso, altura, órgão faltante e são obrigatórios"}), 400
    
    # chama o serviço de criação de corpo
    corpo = corpo_service.criar_corpo(dados)    
    
    # retornar mensagem de sucesso :-)
    return jsonify({
        "resultado":"ok", 
        "detalhes":corpo.json()
    }), 201

