'use client';

import { useCart } from '@/providers/CartProvider';
import { useRouter } from 'next/navigation';

export default function ChooseHall({ hallId }: { hallId: number }) {
    const router = useRouter();
    const { chooseHall } = useCart();

    return (
        <div className="centered-buttons">
            <button
                className="custom__btn border border-brown"
                onClick={() => {
                    chooseHall(hallId);
                    router.push('/cart?tab=1');
                }}
            >
                Выбрать этот зал
            </button>
        </div>
    );
}
