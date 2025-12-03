import { Service } from "@/app/data/services";

export interface Hall {
    id: number;
    name: string;
    img: string;
    dateTime: string;
    duration: number;
    price: number;
    diff: number;
}

export interface Food {
    count: number;
    id: number;
    imageWebp: string;
    minOrder: number;
    price: number;
    title: string;
}

export interface Order {
    anketa: {
        answer1: string;
        answer2: string;
        answer3: string;
        answer4: string;
        answer5: string;
    },
    halls: Hall[];
    show: Service[];
    food: Food[];
    code: string;
}

export type CartCtxType = {
    food: Food[];
    chooseHall: (hallId: number) => void;
    addToCart: (item: Food) => void;
    removeFromCart: (item: Food) => void;
};
