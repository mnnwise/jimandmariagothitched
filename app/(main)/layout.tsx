import Nav from '@/components/Nav'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <main className="flex-1">{children}</main>
      <footer className="text-center py-8 text-sm text-[#4d6b7e] tracking-widest uppercase font-light border-t border-[#a8c4d4]">
        Made with love &mdash; forever begins here
      </footer>
    </>
  )
}
