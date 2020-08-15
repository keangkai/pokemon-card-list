import React, { Component } from 'react'
import AddCardList from './components/AddCardList'
import MyPokedex from './containers/MyPokedex'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCards, openAddCard } from './actions/cards-action'
import './App.css'

const COLORS = {
  Psychic: "#f8a5c2",
  Fighting: "#f0932b",
  Fairy: "#c44569",
  Normal: "#f6e58d",
  Grass: "#badc58",
  Metal: "#95afc0",
  Water: "#3dc1d3",
  Lightning: "#f9ca24",
  Darkness: "#574b90",
  Colorless: "#FFF",
  Fire: "#eb4d4b"
}

class App extends Component {
  async componentDidMount() {
    this.getItems()
  }
  async getItems() {
    await this.props.fetchCards()
  }
  render() {
    return (
      <div className="App">
        <MyPokedex />
        <div className="add-container">
          <button className="addBtn" onClick={this.props.openAddCard}><div>+</div></button>
        </div>
        {this.props.showAddCard ?
          <AddCardList items={this.props.total_cards}/>
          :
          null
        }
      </div>
    )
  }
}

App.propTypes = {
  fetchCards: PropTypes.func.isRequired,
  openAddCard: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  total_cards: state.cards.total_cards,
  showAddCard: state.cards.showAddCard
});

export default connect(mapStateToProps, {fetchCards, openAddCard})(App);
