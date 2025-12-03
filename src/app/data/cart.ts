import { Order } from "@/providers/types";

export const emptyOrder: Order = {
    anketa: {
        answer1: '',
        answer2: '',
        answer3: '',
        answer4: '',
        answer5: ''
    },
    halls: [],
    show: [],
    food: [],
    code: ''
};