import './globals.css';
import { Poppins } from 'next/font/google';
import Provider from '@/Components/Provider';

const poppins = Poppins({
  subsets: ['latin'],
  weight: '400',
})

export const metadata = {
  title: 'Create an account with Logo',
  description: 'Create an account with Logo',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`bg-[#202227] px-[24px]`}>
      <Provider>
        {children}
      </Provider>
        </body>
    </html>
  )
}
