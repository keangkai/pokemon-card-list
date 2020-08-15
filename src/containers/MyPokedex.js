import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeFromMyPokedex } from '../actions/cards-action'

class MyPokedex extends Component {
    calc (data) {
        let properties = {
            id: data.id,
            name: data.name,
            hp: data.hp > 100 ? 100 : data.hp,
            strength: data.attacks ? data.attacks.length * 50 > 100 ? 100 : data.attacks.length * 50 : 0,
            weakness: data.weaknesses ? data.weaknesses.length * 100 > 100 ? 100 : data.weaknesses.length * 100 : 0,
            damage: data.attacks ? data.attacks.reduce((v,x) => v += Number(x.damage.replace(/[^0-9]/g, '')), 0) : 0
        };
        properties.happiness = ((Number(properties.hp) / 10) + (Number(properties.damage) / 10) + 10 - (Number(properties.weakness)/5))

        return properties
    }
    render() {
        return (
            <div>
                <h1>My Pokedex</h1>
                <div className="my-pokedex-container">
                    { this.props.my_cards.length > 0 && this.props.my_cards.map((card, index) => {
                        let calCard = this.calc(card)
                        return (
                            <div key={index} className="pokemon-card">
                                <div>
                                    <img src={card.imageUrl} width="70%"/>
                                </div>
                                <div>
                                    <p>{card.name}</p>
                                    <p>HP: {calCard.hp}</p>
                                    <p>STR: {calCard.strength}</p>
                                    <p>WEAK: {calCard.weakness}</p>
                                    { calCard.happiness > 0 && Array(calCard.happiness).fill(1).map((i,k) => {
                                        return (
                                            <img key={k} src="../cute.png" width="20px"/>
                                        )
                                    })}
                                </div>
                                <button onClick={() => this.props.removeFromMyPokedex(card)}>Remove</button>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}


MyPokedex.propTypes = {
    removeFromMyPokedex: PropTypes.func.isRequired,
}
  
const mapStateToProps = state => ({
    total_cards: state.cards.total_cards,
    my_cards: state.cards.my_cards
});
  
export default connect(mapStateToProps, {removeFromMyPokedex})(MyPokedex);
