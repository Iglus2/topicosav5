export default function Home() {
  return (
    <div className="flex flex-1 items-start justify-center bg-slate-50 px-6 py-12 font-sans">
      <main className="flex w-full max-w-3xl flex-col items-start gap-5 rounded-2xl bg-white p-8 shadow-xl sm:p-12">
        <section className="space-y-4"><p className="text-sm font-semibold uppercase tracking-widest text-blue-700">AV5 · Tema Corpo</p><h1 className="text-4xl font-bold text-gray-900">Cadastro de Corpos</h1><p className="max-w-xl text-lg text-gray-600">Inclua e consulte os registros do tema corpo. Para cadastrar, entre com a conta padrão admin/admin123.</p><a className="inline-block rounded-lg bg-blue-700 px-5 py-3 font-semibold text-white" href="/listar_corpos">Ver corpos cadastrados</a></section>
      </main>
    </div>
  );
}
