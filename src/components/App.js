/* eslint-disable react/static-property-placement */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-access-state-in-setstate */
import React from 'react';
import PropTypes from 'prop-types';
import Fish from './Fish';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import base from '../base';

class App extends React.Component {
  state = {
    fishes: {},
    order: {},
  };

  static propTypes = {
    match: PropTypes.object,
  };

  componentDidMount() {
    const { params } = this.props.match;
    // Re-instate local storage
    const localStorageRef = localStorage.getItem(params.storeId);
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) });
    }
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: 'fishes',
    });
  }

  componentDidUpdate() {
    const { params } = this.props.match;
    console.log(this.state.order);
    localStorage.setItem(`${params.storeId}`, JSON.stringify(this.state.order));
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  addFish = (fish) => {
    // 1. Takes a copy of the existing state
    const fishes = { ...this.state.fishes };
    // 2. Add new fish to fishes variable
    fishes[`fish${Date.now()}`] = fish;
    // 3. Add new fish object to state
    this.setState({ fishes }); // Same as ({ fishes: fishes })
    console.log('Adding fish...');
  };

  updateFish = (key, updatedFish) => {
    // 1. Takes a copy of the existing state
    const fishes = { ...this.state.fishes };
    // 2. Update state
    fishes[key] = updatedFish;
    // 3. Set state
    this.setState({ fishes });
  };

  deleteFish = (key) => {
    // 1. Take a copy
    const fishes = { ...this.state.fishes };
    // 2. Update (delete) fish. Needs to be set to null for Firebase
    fishes[key] = null;
    // 3. Set state
    this.setState({ fishes });
  };

  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes });
  };

  addToOrder = (key) => {
    // 1. Take a copy state
    const order = { ...this.state.order };
    // 2. Add/Update order
    order[key] = order[key] + 1 || 1;
    // 3. Update the state object 'fishes' using setState()
    this.setState({ order });
  };

  removeFromOrder = (key) => {
    const order = { ...this.state.order };
    order[key] = order[key] - 1 || 0;
    if (order[key] === 0) {
      delete order[key];
    }
    this.setState({ order });
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map((key) => (
              <Fish
                details={this.state.fishes[key]}
                key={key.toString()}
                index={key}
                addToOrder={this.addToOrder}
              />
            ))}
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory
          fishes={this.state.fishes}
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
          storeId={this.props.match.params.storeId}
        />
      </div>
    );
  }
}

export default App;
