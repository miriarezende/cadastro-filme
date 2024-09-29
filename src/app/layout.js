import "./globals.css";

export const metadata = {
  title: "FilmesFlix",
  description: "Crud usando nextJS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body>
        {children}
      </body>
    </html>
  );
}
