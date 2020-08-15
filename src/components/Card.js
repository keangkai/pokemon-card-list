import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addToMyPokedex } from '../actions/cards-action'

class Card extends Component {
    state = {
        properties: {}
    }
    componentDidMount () {
        let properties = {
            id: this.props.item.id,
            img: this.props.item.imageUrl,
            name: this.props.item.name,
            hp: this.props.item.hp > 100 ? 100 : this.props.item.hp,
            strength: this.props.item.attacks ? this.props.item.attacks.length * 50 > 100 ? 100 : this.props.item.attacks.length * 50 : 0,
            weakness: this.props.item.weaknesses ? this.props.item.weaknesses.length * 100 > 100 ? 100 : this.props.item.weaknesses.length * 100 : 0,
            damage: this.props.item.attacks ? this.props.item.attacks.reduce((v,x) => v += Number(x.damage.replace(/[^0-9]/g, '')), 0) : 0
        };
        // let happiness = ((Number(properties.hp) / 10) + (Number(properties.damage) / 10) + 10 - Number(properties.weakness))/5
        properties.happiness = ((Number(properties.hp) / 10) + (Number(properties.damage) / 10) + 10 - (Number(properties.weakness)/5))
        this.setState({
            properties: properties
        })

    }
    render() {
        return (
            <div className="pokemon-card">
                <div>
                    <img src={this.props.item.imageUrl} width="100px"/>
                </div>
                <div>
                    <p>{this.props.item.name}</p>
                    <p>HP: {this.state.properties.hp}</p>
                    <p>STR: {this.state.properties.strength}</p>
                    <p>WEAK: {this.state.properties.weakness}</p>
                </div>
                <button onClick={() => this.props.addToMyPokedex(this.props.item)}>Add</button>
            </div>
        )
    }
}

Card.propTypes = {
    addToMyPokedex: PropTypes.func.isRequired
}
  
const mapStateToProps = state => ({
    total_cards: state.cards.total_cards,
});
  
export default connect(mapStateToProps, { addToMyPokedex })(Card);