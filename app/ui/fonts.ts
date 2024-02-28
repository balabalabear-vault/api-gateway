import { 
    Inter,
    Lusitana,
} from 'next/font/google';
import localFont from 'next/font/local'
 
export const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
});
 
export const lusitana = Lusitana({
    weight: "400",
    subsets: ['latin'],
    display: 'swap',
});

export const elven = localFont({ src: './HalfElvenItalicItalic-4O3l.ttf' })
