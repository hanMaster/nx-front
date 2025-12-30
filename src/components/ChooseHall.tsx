'use client';

import { useCart } from '@/providers/CartProvider';
import { useRouter } from 'next/navigation';

export default function ChooseHall({ hallId }: { hallId: number }) {
    const router = useRouter();
    const { setStudio } = useCart();

    return (
        <div className="centered-buttons">
            <button
                className="custom__btn border border-brown"
                onClick={() => {
                    setStudio(hallId);
                    router.push('/cart');
                }}
            >
                Выбрать этот зал
            </button>
        </div>
    );
}
