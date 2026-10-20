from config import *
import services.corpo as corpo_service


@app.route('/corpos', methods=['GET'])
def retornar_corpos():
    corpos = corpo_service.retornar_corpos()
    return jsonify({
        "resultado": "ok",
        "detalhes": [corpo.json() for corpo in corpos],
    })


@app.route('/corpo', methods=['POST'])
@jwt_required()
def criar_corpo():
    dados = request.get_json(silent=True)

    if (
        not isinstance(dados, dict)
        or not str(dados.get('nome', '')).strip()
        or dados.get('idade') in (None, '')
        or dados.get('altura') in (None, '')
        or not str(dados.get('orgao_faltante', '')).strip()
    ):
        return jsonify({
            "resultado": "erro",
            "detalhes": "Nome, idade, altura e órgão faltante são obrigatórios",
        }), 400

    try:
        idade = int(dados['idade'])
        altura = float(dados['altura'])
        peso = float(dados['peso']) if dados.get('peso') not in (None, '') else None
        if idade < 0 or altura <= 0 or (peso is not None and peso <= 0):
            raise ValueError
        dados = {**dados, 'idade': idade, 'altura': altura, 'peso': peso}
    except (TypeError, ValueError):
        return jsonify({
            "resultado": "erro",
            "detalhes": "Idade, peso e altura devem conter valores válidos",
        }), 400

    corpo = corpo_service.criar_corpo(dados)
    return jsonify({
        "resultado": "ok",
        "detalhes": corpo.json(),
    }), 201
