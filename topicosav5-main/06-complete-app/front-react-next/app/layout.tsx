import type { Metadata } from "next";
import "./globals.css";

// importando o componente Menu
import Menu from "./components/Menu";

export const metadata: Metadata = {
  title: "AV5 · Cadastro de Corpos",
  description: "Cadastro e consulta de corpos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html
      lang="pt-BR"
      className={"h-full antialiased"}
    >

      <body className="min-h-full flex flex-col">
        
        {/* o componente menu será 
        usado em todas as páginas */}
        <Menu />

        {children}

      </body>
    </html>
  );
}
