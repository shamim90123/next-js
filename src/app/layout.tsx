import Navbar from "./components/Navbar"; // Absolute import


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar /> {/* Navbar appears on all pages */}
        <main className="flex">
          {children}
        </main>
      </body>
    </html>
  );
}
