import Header from './components/Header/Header'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className + " " + "min-h-screen flex flex-col bg-gradient-to-t from-slate-100 to-white text-black"}>
        <Header />
        {children}
        <footer className='mt-auto bg-headerSecond py-3'>
          FOOTER
        </footer>
      </body>
    </html>
  )
}
