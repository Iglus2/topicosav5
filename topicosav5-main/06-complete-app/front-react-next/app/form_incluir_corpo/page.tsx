'use client';

import { FormEvent, useEffect, useState,  } from 'react';
import { useRouter } from "next/navigation";

export default function FormIncluirCorpo() {

  type CorpoSalvo = { nome: string; idade: number; peso: number | null; altura: number; orgao_faltante: string };

  const [nome, setNome] = useState<string>("");
  const [idade, setIdade] = useState<string>("");
  const [peso, setPeso] = useState<string>("");
  const [altura, setAltura] = useState<string>("");
  const [orgao_faltante, setOrgaoFaltante] = useState<string>("");


  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [token, setToken] = useState<string | null>(null);
  const [corpoSalvo, setCorpoSalvo] = useState<CorpoSalvo | null>(null);

  const router = useRouter();
  
  // obtém da variável de ambiente o endereço do backend (API)
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    // tenta buscar a token
    const savedToken = localStorage.getItem("token");
    // se não houver token
    if (!savedToken) {
      // encaminha para o login
      router.replace("/form_login");
    }
    // persiste o token
    setToken(savedToken);
  
  }, [router]);


  useEffect(() => {
    if (!error) return;
    const timer = setTimeout(() => {
      setError("");
    }, 5000);
    return () => clearTimeout(timer);
  }, [error]);

  const enviar = async (e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();

    setMessage("");
    setError("");
    setCorpoSalvo(null);

    setLoading(true);

    try {

      const resposta = await fetch(apiUrl + '/corpo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ nome, idade, peso, altura, orgao_faltante })
      });

      switch (resposta.status) {
        case 200:
        case 201:
        {
          setMessage("Corpo cadastrado com sucesso!");
          const retorno = await resposta.json();
          setCorpoSalvo(retorno.detalhes);
          // limpa os campos
          setNome(""); setIdade(""); setPeso(""); setAltura(""); setOrgaoFaltante("");
          break;
        }
        case 400:
          setError("Confira os campos obrigatórios e os valores informados.");
          break;
        case 401:
          setError("A sessão expirou. Por favor, faça login novamente!");
          // Optional:
          // localStorage.removeItem("token");
          // router.push("/login");
          break;
        case 403:
          setError("Você não tem permissão para realizar esta ação.");
          break;
        case 500:
          setError("Erro interno no servidor backend.");
          break;
        default:
          const resultado = await resposta.json();
          setError(resultado.detalhes || resultado.message || "Um erro inesperado ocorreu.");
      }
  } catch (error) {
    console.log('error', error);
    setError("Não foi possível conectar-se ao backend");
  } finally {
    setLoading(false);
  }
}

// se não houver token, encerra a página
if (!token) {
  return null;
}


return (
  <div className="flex flex-1 items-start justify-center bg-slate-50 px-6 py-12 font-sans">
    <main className="flex w-full max-w-3xl flex-col items-start gap-5 rounded-2xl bg-white p-8 shadow-xl sm:p-12">

      <h1
      className="text-4xl font-bold tracking-tight text-gray-900 mb-4"
      >Cadastrar Corpo</h1>

      {message && (
        <p className="text-green-600 font-medium">
          {message}
        </p>
      )}

      {corpoSalvo && (
        <div className="w-full rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-950" role="status">
          <p className="font-semibold">Registro incluído</p>
          <p className="mt-1 text-sm">{corpoSalvo.nome} · {corpoSalvo.idade} anos · {corpoSalvo.peso == null ? 'Peso não informado' : `${corpoSalvo.peso} kg`} · {corpoSalvo.altura} m · Órgão faltante: {corpoSalvo.orgao_faltante}</p>
        </div>
      )}

      {error && (
        <p className="text-red-600 font-medium">
          {error}
        </p>
      )}

      <form className="flex flex-col gap-4 w-full" onSubmit={enviar}>

        <input type="text" name="nome"
          placeholder="Nome" value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          required
          />

        <input type="number" min="0" step="1" name="idade" placeholder="Idade (anos)"
          value={idade}
          onChange={(e) => setIdade(e.target.value)}
          className="rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          required />

        <input type="number" min="0.1" step="0.1" name="peso" placeholder="Peso (kg, opcional)"
          value={peso}
          onChange={(e) => setPeso(e.target.value)}
          className="rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />

        <input type="number" min="0.1" step="0.01" name="altura" placeholder="Altura (m)"
          value={altura}
          onChange={(e) => setAltura(e.target.value)}
          className="rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          required />

        <input type="text" name="orgao_faltante" placeholder="Órgão Faltante"
          value={orgao_faltante}
          onChange={(e) => setOrgaoFaltante(e.target.value)}
          className="rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          required />

        <button type="submit"
          disabled={loading}
          className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Cadastrando..." : "Cadastrar"}
        </button>

      </form>

    </main>
  </div>
);
}
