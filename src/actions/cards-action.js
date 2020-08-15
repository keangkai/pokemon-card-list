import { FETCH_CARDS, ADD_TO_MY_POKEDEX, REMOVE_FROM_MY_POKEDEX, OPEN_ADD_CARD, CLOSE_ADD_CARD } from '../types/index';
import axios from 'axios';

export const fetchCards = (data) => dispatch => {
    let url = 'http://localhost:3030/api/cards?limit=30';
    if (data) {
        if (data.name) {
            url += `&name=${data.name}`;
        }
        if (data.type) {
            url += `&type=${data.type}`;
        }
    }
    return axios.get(url).then(response => {
        if (response.data) {
            dispatch({
                type: FETCH_CARDS,
                payload: response.data
            });
        }
        // console.log('response data: ', response.data)
        return response.data
      })
};

export const addToMyPokedex = (data) => dispatch => {
    console.log('add to my pokedex: ', data)
    dispatch({
        type: ADD_TO_MY_POKEDEX,
        payload: data
    })
}

export const removeFromMyPokedex = (id) => dispatch => {
    dispatch({
        type: REMOVE_FROM_MY_POKEDEX,
        payload: id
    })
}

export const openAddCard = () => dispatch => {
    dispatch({
        type: OPEN_ADD_CARD,
        payload: true
    })
}

export const closeAddCard = () => dispatch => {
    dispatch({
        type: CLOSE_ADD_CARD,
        payload: false
    })
}