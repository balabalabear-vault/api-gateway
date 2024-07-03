export default function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <main className="flex flex-col p-12 justify-center bg-slate-800">
            {children}
        </main>
    )
  }