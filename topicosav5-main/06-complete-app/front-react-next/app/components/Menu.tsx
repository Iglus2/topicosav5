import Link from "next/link";

export default function Menu() {

  return (
    <nav className="bg-slate-950 px-6 py-4 text-white shadow-lg">
      <ul className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-7 gap-y-2 text-sm font-medium">

        {/* links para as páginas do sistema: menu de opções */}
        <li><Link href="/">Home</Link></li>
        <li><Link href="/listar_pessoas">Listar pessoas</Link></li>
        <li><Link href="/form_login">Login</Link></li>
        <li><Link href="/listar_corpos">Corpos cadastrados</Link></li>
        <li><Link href="/form_incluir_corpo">Cadastrar corpo</Link></li>

      </ul>
    </nav>
  );
}
