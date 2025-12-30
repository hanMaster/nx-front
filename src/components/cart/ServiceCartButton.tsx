'use client';

import { useCart } from '@/providers/CartProvider';
import { Service } from '@/app/data/services';
import { useRouter } from 'next/navigation';

interface ServiceCartButtonProps {
    service: Service;
    className?: string;
}

export default function ServiceCartButton({ service, className = '' }: ServiceCartButtonProps) {
    const { order, addServiceToCart, removeServiceFromCart } = useCart();
    const router = useRouter();

    const isInCart = order.show.some((s) => s.id === service.id);

    const handleClick = () => {
        if (isInCart) {
            removeServiceFromCart(service.id);
        } else {
            addServiceToCart(service);
            router.push('/cart');
        }
    };

    return (
        <button className={`custom__btn border border-brown ${className}`} onClick={handleClick}>
            {isInCart ? 'Удалить из корзины' : 'Добавить в корзину'}
        </button>
    );
}
