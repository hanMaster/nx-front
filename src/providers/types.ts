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
    imageJpg: string;
    minOrder: number;
    price: number;
    title: string;
}

export interface Anketa {
    answer1: string;
    answer2: string;
    answer3: string;
    answer4: string;
    answer5: string;
}

export interface Order {
    anketa: Anketa;
    halls: Hall[];
    show: Service[];
    food: Food[];
    code: string;
}

export type CartCtxType = {
    order: Order;
    activeTab: number;

    // Food methods
    food: Food[];
    addToCart: (item: Food) => void;
    removeFromCart: (item: Food) => void;
    increase: (id: number) => void;
    decrease: (id: number) => void;

    // Hall methods
    setStudio: (hallId: number) => void;
    unsetStudio: (id: number) => void;
    increaseDuration: (hall: Hall) => void;
    decreaseDuration: (hall: Hall) => void;
    hallAmount: (hall: Hall) => number;
    updateHallDateTime: (hallId: number, dateTime: string) => void;
    getHallDiff: (hallIndex: number) => number;

    // Anketa methods
    updateAnketa: (field: keyof Anketa, value: string) => void;

    // Service methods
    addServiceToCart: (service: Service) => void;
    removeServiceFromCart: (id: number) => void;

    // Tab navigation
    setActiveTab: (n: number) => void;
    getActiveTab: () => number;
    tabClick: (tabId: number) => void;

    // Validation
    hallsInvalid: () => boolean;
    anketaInvalid: () => boolean;

    // Totals
    total: () => number;
    foodTotal: () => number;
    showTotal: () => number;
    hallsTotal: () => number;
    getTotalItemsCount: () => number;

    // Order
    sendOrder: () => void;
    cleanCart: () => void;
    orderText: () => string[];
};
