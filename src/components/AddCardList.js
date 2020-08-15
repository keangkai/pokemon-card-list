import React, { Component } from 'react'
import Card from './Card'
import { connect } from 'react-redux';
import { fetchCards, closeAddCard } from '../actions/cards-action'

class AddCardList extends Component {
    searchHandler = (e) => {
        console.log('event : ', e.target.value)
        let value = e.target.value
        let query = {
            name: value
        }
        this.props.fetchCards(query);
    }
    render() {
        return (
            <div className="pokemon-card-list">
                <input type="text" placeholder="Find pokemon" onChange={this.searchHandler}/>
                <button onClick={this.props.closeAddCard}>Close</button>
                <br/>
                { this.props.items.length > 0 && this.props.items.map(item => {
                    return (
                        <Card key={item.id} item={item}/>
                    )
                })}
            </div>
        )
    }
}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, { fetchCards, closeAddCard })(AddCardList);