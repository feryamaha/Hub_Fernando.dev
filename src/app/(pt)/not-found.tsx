export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-dvh bg-finder-window text-finder-text gap-4">
      <h1 className="font-modern-dos-400 text-4xl text-finder-accent">404</h1>
      <p className="text-finder-text-secondary text-sm">Página não encontrada.</p>
      <a
        href="/"
        className="px-5 py-2 rounded-lg bg-finder-accent text-finder-accent-contrast text-sm font-medium"
      >
        Voltar ao início
      </a>
    </div>
  );
}
