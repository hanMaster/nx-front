'use client';

import { createContext, ReactNode, useContext, useState } from 'react';
import { CartCtxType, Food, Hall } from './types';
import { hallsList } from '@/app/data/halls';

const CartCtx = createContext<CartCtxType | undefined>(undefined);

export const useCart = () => {
    const ctx = useContext(CartCtx);
    if (!ctx) {
        throw new Error('Контекст не доступен, оберните компонент провайдером');
    }
    return ctx;
};

export default function CartProvider({ children }: { children: ReactNode }) {
    const [food, setFood] = useState<Food[]>([]);
    const [halls, setHalls] = useState<Hall[]>([]);

    const chooseHall = (hallId: number) => {
        const choosenHall = hallsList.find((h) => h.id === hallId) as Hall;

        const items = [...halls];
        const savedItem = items.find((i) => i.id === hallId);
        if (!savedItem) {
            const newVal = [...items, { ...choosenHall }];
            setHalls(newVal);
        }
    };

    const addToCart = (item: Food) => {
        const items = [...food];
        const savedItem = items.find((i) => i.id === item.id);
        if (savedItem) {
            savedItem.count++;
            setFood(items);
        } else {
            setFood([...items, { ...item, count: 1 }]);
        }
    };

    const removeFromCart = (item: Food) => {
        setFood((prev) => {
            return prev.filter((i) => i.id !== item.id);
        });
    };

    return (
        <CartCtx.Provider
            value={{
                chooseHall,
                food,
                addToCart,
                removeFromCart,
            }}
        >
            {children}
        </CartCtx.Provider>
    );
}
