export default async function Retornar_Pessoas() {

    // pegar a variável de ambiente que informa 
    // qual é a URL da API (backend)
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    // preparação de algumas mensagens de log
    let logs = ""

    // desabilitar o CACHE para poder pegar os registros de forma atualizada!
    let response: Response | null = null;
    try {
      if (apiUrl) response = await fetch(apiUrl + '/corpos', { cache: 'no-store' });
    } catch {
      response = null;
    }

    // variável que vai armazenar os dados da resposta
    let lines = [];

    // se a resposta não foi bem sucedida
    if (!response?.ok) {
        logs = 'Não foi possível carregar os corpos. Verifique se o backend está ativo.';

    } else {

        // pega a resposta em formato json
        const data = await response.json();

        // pega a resposta em "forma de linhas" (vetor)
        lines = Array.isArray(data?.detalhes) ? data.detalhes : [];

    }
    return (
        <>
            {/* mostra logs, se houver */}

            {logs && (
                <p className="text-red-600 font-medium">
                    {logs}
                </p>
            )}

            <ul
                className="mt-6 w-full divide-y divide-gray-200 rounded-xl border border-gray-200 bg-white shadow-md"
            >
                {/* para cada linha (map) ... exibe um "li"*/}

                {lines.map((line: { id: number; nome: string; idade: number; peso: number | null; altura: number; orgao_faltante: string }) => (
                    <li key={line.id}
                        className="px-6 py-4 text-lg text-gray-800 transition-colors hover:bg-blue-50 hover:text-blue-700 cursor-pointer"
                    >{line.id}. {line.nome} · {line.idade} anos · {line.peso == null ? 'Peso não informado' : `${line.peso} kg`} · {line.altura} m · Órgão faltante: {line.orgao_faltante}</li>
                ))}

                {lines.length === 0 && response?.ok && (
                    <li className="px-6 py-8 text-center text-gray-500">Ainda não há corpos cadastrados.</li>
                )}

            </ul>
        </>
    );
}
