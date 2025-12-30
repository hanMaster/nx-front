"use client";

import {
    createContext,
    ReactNode,
    useContext,
    useState,
    useMemo,
    useCallback,
    useEffect,
} from "react";
import { CartCtxType, Food, Hall, Order, Anketa } from "./types";
import { hallsList } from "@/app/data/halls";
import { Service } from "@/app/data/services";
import { baseUrl } from "@/app/data/apiBaseUrl";
import { generateString, hallTime } from "@/app/data/common";
import { toast } from "sonner";
import dayjs from "dayjs";

const CODE_LENGTH = 17;

// Валидация и санитизация входных данных
const sanitizeInput = (input: string, maxLength: number = 200): string => {
    return input
        .replace(/[<>]/g, "") // Удаляем HTML теги
        .replace(/javascript:/gi, "") // Блокируем javascript: протокол
        .replace(/on\w+=/gi, "") // Блокируем event handlers
        .trim()
        .slice(0, maxLength); // Ограничиваем длину
};

const sanitizeNumber = (input: string, min: number = 0, max: number = 999): string => {
    const num = parseInt(input.replace(/\D/g, ""), 10);
    if (isNaN(num)) return "0";
    return Math.min(Math.max(num, min), max).toString();
};

const emptyAnketa: Anketa = {
    answer1: "",
    answer2: "",
    answer3: "",
    answer4: "",
    answer5: "",
};

const emptyOrder: Order = {
    anketa: emptyAnketa,
    halls: [],
    show: [],
    food: [],
    code: "",
};

const CartCtx = createContext<CartCtxType | undefined>(undefined);

export const useCart = () => {
    const ctx = useContext(CartCtx);
    if (!ctx) {
        throw new Error("Контекст не доступен, оберните компонент провайдером");
    }
    return ctx;
};

export default function CartProvider({ children }: { children: ReactNode }) {
    // Инициализация корзины из localStorage
    const [order, setOrder] = useState<Order>(() => {
        if (typeof window === 'undefined') return emptyOrder;

        try {
            const savedCart = localStorage.getItem('kharakter-cart');
            if (savedCart) {
                const parsed = JSON.parse(savedCart);
                // Валидация структуры данных
                if (parsed && typeof parsed === 'object' &&
                    parsed.anketa && Array.isArray(parsed.halls) &&
                    Array.isArray(parsed.show) && Array.isArray(parsed.food)) {
                    return parsed;
                }
            }
        } catch (error) {
            console.error('Ошибка загрузки корзины из localStorage:', error);
            localStorage.removeItem('kharakter-cart');
        }

        return emptyOrder;
    });

    const [activeTab, setActiveTabState] = useState(1);

    // Сохранение корзины в localStorage при изменении
    useEffect(() => {
        if (typeof window === 'undefined') return;

        try {
            localStorage.setItem('kharakter-cart', JSON.stringify(order));
        } catch (error) {
            console.error('Ошибка сохранения корзины в localStorage:', error);
            // Если localStorage переполнен, очищаем старые данные
            if (error instanceof DOMException && error.name === 'QuotaExceededError') {
                localStorage.removeItem('kharakter-cart');
                toast.error('Корзина слишком большая, данные не сохранены');
            }
        }
    }, [order]);

    // Helper functions
    const isNightOrdered = useCallback(() => {
        return order.show.some((ord) =>
            ord.title.toLowerCase().includes("ночевк"),
        );
    }, [order.show]);

    const totalServicesDuration = useCallback(() => {
        return order.show.reduce((acc, s) => acc + s.duration, 0);
    }, [order.show]);

    const hallAmount = useCallback(
        (hall: Hall) => {
            return Math.round((hall.price / 60) * (hall.duration + hall.diff));
        },
        [],
    );

    const showTotal = useCallback(() => {
        return order.show.reduce(
            (acc, s) =>
                acc +
                s.price +
                (s.materialPrice || 0) * Number(order.anketa.answer4),
            0,
        );
    }, [order.show, order.anketa.answer4]);

    const hallsTotal = useCallback(() => {
        return order.halls.reduce((acc, s) => acc + hallAmount(s), 0);
    }, [order.halls, hallAmount]);

    const foodTotal = useCallback(() => {
        return order.food.reduce((acc, f) => acc + f.price * f.count, 0);
    }, [order.food]);

    const total = useCallback(() => {
        if (isNightOrdered()) {
            return showTotal();
        }
        return showTotal() + foodTotal() + hallsTotal();
    }, [isNightOrdered, showTotal, foodTotal, hallsTotal]);

    const getTotalItemsCount = useCallback(() => {
        const foodCount = order.food.reduce((acc, cur) => acc + cur.count, 0);
        return foodCount + order.show.length + order.halls.length;
    }, [order.food, order.show.length, order.halls.length]);

    // Auto-calculate time diff when services change
    useEffect(() => {
        const hallsDuration = order.halls.reduce(
            (acc, h) => acc + h.duration,
            0,
        );
        const diff = totalServicesDuration() + 30 - hallsDuration;
        if (diff > 0 && order.halls[0]) {
            setOrder((prev) => ({
                ...prev,
                halls: prev.halls.map((h, i) => (i === 0 ? { ...h, diff } : h)),
            }));
        }
    }, [order.show, order.halls, totalServicesDuration]);

    const orderText = useCallback((): string[] => {
        const a = order.anketa;
        const lines: string[] = [];

        if (!isNightOrdered()) {
            const halls = order.halls.length > 1;
            const hallsDuration = order.halls.reduce(
                (acc, h) => acc + h.duration + h.diff,
                0,
            );

            for (const hall of order.halls) {
                const dur = hall.duration + hall.diff;
                const dh = Math.trunc(dur / 60);
                const dm = dur % 60;
                const studioName = hall.name === "Характер" ? "Х" : "ДП";
                if (dm > 0) {
                    lines.push(`${studioName} - ${dh}ч ${dm} мин`);
                } else {
                    lines.push(`${studioName} - ${dh}ч`);
                }
                lines.push(`${hallTime(hall)} - ${hallAmount(hall)} р`);
                lines.push(" ");
            }

            if (halls) {
                const dHours = Math.trunc(hallsDuration / 60);
                const dMins = hallsDuration % 60;
                lines.push(`Всего резерв: ${dHours}ч ${dMins} мин`);
                lines.push(`Залы: ${hallsTotal()} р.`);
                lines.push(" ");
            }
        }

        lines.push(`${a.answer1}`);
        lines.push(`${a.answer2} ${a.answer3}`);
        lines.push(`Детей: ${a.answer4}`);
        lines.push(`Взр: ${a.answer5}`);

        const guests =
            Number(order.anketa.answer4) + Number(order.anketa.answer5);
        let adminPrice = 0;

        if (guests > 20 && guests < 36) {
            lines.push(" ");
            lines.push("Доп. админ: 3k р.");
            adminPrice = 3000;
        } else if (guests > 35) {
            lines.push(" ");
            lines.push("Доп. админы: 6k р.");
            adminPrice = 6000;
        }
        lines.push(" ");

        if (order.show.length) {
            if (isNightOrdered()) {
                lines.push(`Дата ночевки: ${hallTime(order.halls[0], true)}`);
            }
            for (const [index, s] of order.show.entries()) {
                const dop = s.materialPrice
                    ? ` + ${s.materialPrice} * ${a.answer4} чел = ${s.price + s.materialPrice * Number(a.answer4)}`
                    : "";
                lines.push(`${index + 1}. ${s.title}: ${s.price} ${dop} р.`);
            }
            lines.push(`Услуги: ${showTotal()} р.`);
            lines.push(" ");
        }

        if (order.food.length) {
            for (const [index, f] of order.food.entries()) {
                lines.push(
                    `${index + 1}. ${f.title}:   ${f.price} * ${f.count} = ${f.count * f.price}`,
                );
            }
            lines.push(`Еда: ${foodTotal()} р.`);
        }

        lines.push(" ");
        lines.push(`Сумма заказа: ${total() + adminPrice} р.`);
        return lines;
    }, [
        order.anketa,
        order.halls,
        order.show,
        order.food,
        isNightOrdered,
        hallAmount,
        hallsTotal,
        showTotal,
        foodTotal,
        total,
    ]);

    const sendToTelegram = async (text: string) => {
        try {
            const response = await fetch(`${baseUrl}orders`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ text }),
            });
            if (response.status === 200) {
                return true;
            } else {
                console.error("[cartStore] error:", response.statusText);
                return false;
            }
        } catch (error) {
            console.error("[cartStore] error:", error);
            return false;
        }
    };

    const sendOrder = useCallback(() => {
        const code = generateString(CODE_LENGTH);
        const text = orderText().join("\n");
        const fullText = `Заказ: ${code}\n${text}`;

        sendToTelegram(fullText).then(() => {
            setOrder((prev) => ({ ...prev, code }));
        });
    }, [orderText]);

    // Food methods
    const addToCart = useCallback((item: Food) => {
        setOrder((prev) => {
            const items = [...prev.food];
            const savedItem = items.find((i) => i.id === item.id);
            if (savedItem) {
                savedItem.count++;
                return { ...prev, food: items };
            } else {
                return {
                    ...prev,
                    food: [...items, { ...item, count: item.minOrder }],
                };
            }
        });
    }, []);

    const removeFromCart = useCallback((item: Food) => {
        setOrder((prev) => ({
            ...prev,
            food: prev.food.filter((i) => i.id !== item.id),
        }));
    }, []);

    const increase = useCallback((id: number) => {
        setOrder((prev) => ({
            ...prev,
            food: prev.food.map((item) =>
                item.id === id ? { ...item, count: item.count + 1 } : item,
            ),
        }));
    }, []);

    const decrease = useCallback((id: number) => {
        setOrder((prev) => {
            const item = prev.food.find((i) => i.id === id);
            if (!item) return prev;

            if (item.count > item.minOrder) {
                return {
                    ...prev,
                    food: prev.food.map((i) =>
                        i.id === id ? { ...i, count: i.count - 1 } : i,
                    ),
                };
            } else {
                return {
                    ...prev,
                    food: prev.food.filter((i) => i.id !== id),
                };
            }
        });
    }, []);

    // Hall methods
    const setStudio = useCallback((hallId: number) => {
        setOrder((prev) => {
            const existed = prev.halls.find((h) => h.id === hallId);
            if (!existed) {
                const studio = hallsList.find((h) => h.id === hallId);
                if (!studio) return prev;

                const t = new Date();
                const dateTime = `${t.getFullYear()}-${(t.getMonth() + 1).toString().padStart(2, "0")}-${t
                    .getDate()
                    .toString()
                    .padStart(
                        2,
                        "0",
                    )}T${t.getHours().toString().padStart(2, "0")}:${t
                    .getMinutes()
                    .toString()
                    .padStart(2, "0")}`;

                return {
                    ...prev,
                    halls: [...prev.halls, { ...studio, dateTime }],
                };
            }
            return prev;
        });
    }, []);

    const unsetStudio = useCallback((id: number) => {
        setOrder((prev) => ({
            ...prev,
            halls: prev.halls.filter((h) => h.id !== id),
        }));
    }, []);

    const increaseDuration = useCallback((hall: Hall) => {
        setOrder((prev) => ({
            ...prev,
            halls: prev.halls.map((h) =>
                h.id === hall.id ? { ...h, duration: h.duration + 15 } : h,
            ),
        }));
    }, []);

    const decreaseDuration = useCallback((hall: Hall) => {
        setOrder((prev) => ({
            ...prev,
            halls: prev.halls.map((h) => {
                if (h.id === hall.id) {
                    const newDuration = h.duration - 15;
                    return {
                        ...h,
                        duration: newDuration < 90 ? 90 : newDuration,
                    };
                }
                return h;
            }),
        }));
    }, []);

    const updateHallDateTime = useCallback(
        (hallId: number, dateTime: string) => {
            setOrder((prev) => ({
                ...prev,
                halls: prev.halls.map((h) =>
                    h.id === hallId ? { ...h, dateTime } : h,
                ),
            }));
        },
        [],
    );

    const updateAnketa = useCallback((field: keyof Anketa, value: string) => {
        let sanitizedValue: string;

        // Разная валидация для разных полей
        switch (field) {
            case "answer4": // Количество детей
            case "answer5": // Количество взрослых
                sanitizedValue = sanitizeNumber(value, 0, 200);
                break;
            case "answer3": // Возраст
                sanitizedValue = sanitizeNumber(value, 1, 18);
                break;
            case "answer1": // Имя
            case "answer2": // Имя именинника
                sanitizedValue = sanitizeInput(value, 100);
                break;
            default:
                sanitizedValue = sanitizeInput(value);
        }

        setOrder((prev) => ({
            ...prev,
            anketa: {
                ...prev.anketa,
                [field]: sanitizedValue,
            },
        }));
    }, []);

    // Service methods
    const addServiceToCart = useCallback((service: Service) => {
        setOrder((prev) => ({
            ...prev,
            show: [...prev.show, service],
        }));
    }, []);

    const removeServiceFromCart = useCallback((id: number) => {
        setOrder((prev) => ({
            ...prev,
            show: prev.show.filter((show) => show.id !== id),
        }));
    }, []);

    // Validation
    const hallsInvalid = useCallback(() => {
        if (order.halls.length === 0) {
            return true;
        }
        return order.halls.some((h) => !h.dateTime);
    }, [order.halls]);

    const anketaInvalid = useCallback(() => {
        return (
            hallsInvalid() ||
            !order.anketa.answer1 ||
            !order.anketa.answer2 ||
            !order.anketa.answer3 ||
            !order.anketa.answer4 ||
            !order.anketa.answer5
        );
    }, [hallsInvalid, order.anketa]);

    // Tab navigation
    const setActiveTab = useCallback(
        (n: number) => {
            if (activeTab === n) return;
            setActiveTabState(n);
            window.scrollTo(0, 0);
        },
        [activeTab],
    );

    const getActiveTab = useCallback(() => {
        return activeTab;
    }, [activeTab]);

    const tabClick = useCallback(
        (tabId: number) => {
            if (hallsInvalid()) {
                setActiveTab(1);
                toast("Выберите зал и время, затем нажмите кнопку Далее");
                return;
            }

            if (activeTab === 1) {
                for (const hall of order.halls) {
                    const ord = dayjs(hall.dateTime);
                    const today = dayjs();
                    const orderHour = ord.get("hour");
                    const orderMin = ord.get("minutes");

                    if (
                        ord.startOf("day").isSame(today.startOf("day")) ||
                        ord.startOf("day").isBefore(today.startOf("day"))
                    ) {
                        toast("Выберите дату позднее чем сегодня");
                        return;
                    }
                    if (orderHour < 10 || orderHour > 20) {
                        toast("Время не ранее 10:00 и не позднее 20:00");
                        return;
                    }
                    if (orderMin !== 0 && orderMin !== 30) {
                        toast("Начало мероприятия возможно в 00 или в 30 минут");
                        return;
                    }
                }
            }

            if (anketaInvalid()) {
                setActiveTab(2);
                toast("Заполните анкету");
                return;
            }

            setActiveTab(tabId);
        },
        [hallsInvalid, anketaInvalid, activeTab, order.halls, setActiveTab],
    );

    // Clean cart
    const cleanCart = useCallback(() => {
        setOrder(emptyOrder);
        setActiveTabState(1);
    }, []);

    const contextValue = useMemo(
        () => ({
            order,
            activeTab,
            food: order.food,
            addToCart,
            removeFromCart,
            increase,
            decrease,
            setStudio,
            unsetStudio,
            increaseDuration,
            decreaseDuration,
            hallAmount,
            updateHallDateTime,
            updateAnketa,
            addServiceToCart,
            removeServiceFromCart,
            setActiveTab,
            getActiveTab,
            tabClick,
            hallsInvalid,
            anketaInvalid,
            total,
            foodTotal,
            showTotal,
            hallsTotal,
            getTotalItemsCount,
            sendOrder,
            cleanCart,
            orderText,
        }),
        [
            order,
            activeTab,
            addToCart,
            removeFromCart,
            increase,
            decrease,
            setStudio,
            unsetStudio,
            increaseDuration,
            decreaseDuration,
            hallAmount,
            updateHallDateTime,
            updateAnketa,
            addServiceToCart,
            removeServiceFromCart,
            setActiveTab,
            getActiveTab,
            tabClick,
            hallsInvalid,
            anketaInvalid,
            total,
            foodTotal,
            showTotal,
            hallsTotal,
            getTotalItemsCount,
            sendOrder,
            cleanCart,
            orderText,
        ],
    );

    return <CartCtx.Provider value={contextValue}>{children}</CartCtx.Provider>;
}
