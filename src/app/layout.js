import './globals.css';
import { Inter, Playfair_Display, Outfit } from 'next/font/google';

const inter = Inter({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-playfair',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata = {
  title: 'Thiệp Mời Lễ Tốt Nghiệp | Huỳnh Thịnh Hưng',
  description: 'Trân trọng kính mời quý thầy cô, gia đình và bạn bè đến tham dự Lễ Tốt Nghiệp của Huỳnh Thịnh Hưng.',
  keywords: ['Thiệp mời tốt nghiệp', 'Huỳnh Thịnh Hưng', 'Graduation Invitation', 'Lễ tốt nghiệp'],
  openGraph: {
    title: 'Thiệp Mời Lễ Tốt Nghiệp - Huỳnh Thịnh Hưng',
    description: 'Trân trọng kính mời bạn đến tham dự Lễ Tốt Nghiệp của Huỳnh Thịnh Hưng!',
    type: 'website',
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi" className={`${inter.variable} ${playfair.variable} ${outfit.variable}`}>
      <body className="antialiased bg-navy-950 text-gray-100 font-sans">
        {children}
      </body>
    </html>
  );
}
