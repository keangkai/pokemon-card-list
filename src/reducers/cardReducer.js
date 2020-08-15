import { FETCH_CARDS, ADD_TO_MY_POKEDEX, REMOVE_FROM_MY_POKEDEX, OPEN_ADD_CARD, CLOSE_ADD_CARD } from '../types/index';

const initialState = {
    total_cards: [],
    my_cards: [],
    showAddCard: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case FETCH_CARDS:
            let allId = state.my_cards.map(card => card.id);
            let new_total_cards = action.payload.cards.map(i => ({ ...i}));
            for (let id of allId) {
                new_total_cards = new_total_cards.filter(card => card.id !== id)
            }
            return {
                ...state,
                total_cards: new_total_cards
            };
        case ADD_TO_MY_POKEDEX:
            return {
                ...state,
                total_cards: state.total_cards.filter(card => card.id !== action.payload.id),
                my_cards: [...state.my_cards, action.payload]
            };
        case REMOVE_FROM_MY_POKEDEX:
            return {
                ...state,
                my_cards: state.my_cards.filter(card => card.id !== action.payload.id),
                total_cards: [...state.total_cards, action.payload]
            };
        case OPEN_ADD_CARD:
            return {
                ...state,
                showAddCard: action.payload
            };
        case CLOSE_ADD_CARD:
            return {
                ...state,
                showAddCard: action.payload
            };
        default:
            return state;
    }
}