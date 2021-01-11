/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';
import Login from './Login';
import base, { firebaseApp } from '../base';

class Inventory extends React.Component {
  static proptTypes = {
    fishes: PropTypes.shape({
      image: PropTypes.string,
      name: PropTypes.string,
      discription: PropTypes.string,
      status: PropTypes.string,
      price: PropTypes.number,
    }),
    addFish: PropTypes.func,
    updateFish: PropTypes.func,
    deleteFish: PropTypes.func,
    loadSamples: PropTypes.func,
    index: PropTypes.string,
    storeId: PropTypes.string,
  };

  state = {
    uid: null,
    owner: null,
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.authHandler({ user });
      }
    });
  }

  authHandler = async (OAuthData) => {
    // 1. Look up current store in database
    const { storeId } = this.props;
    const store = await base.fetch(storeId, { context: this });
    console.log(store);
    // 2. Claim it if no owner
    if (!store.owner) {
      await base.post(`${storeId}/owner`, {
        data: OAuthData.user.uid,
      });
    }
    // 3. Set the sate of the inventory component to reflect the current user
    this.setState({
      uid: OAuthData.user.uid,
      owner: store.owner || OAuthData.user.uid,
    });
  };

  authenticate = (provider) => {
    const OAuthProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp.auth().signInWithPopup(OAuthProvider).then(this.authHandler);
  };

  logout = async () => {
    console.log('Logging out...');
    await firebase.auth().signOut();
    this.setState({ uid: null });
  };

  render() {
    const logout = (
      <button type="button" onClick={this.logout}>
        Log Out
      </button>
    );
    // 1. Is user logged in?
    if (!this.state.uid) {
      return <Login authenticate={this.authenticate} />;
    }

    // 2. Are they the owner?
    if (this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry you are not the owner.</p>
          {logout}
        </div>
      );
    }

    // 3. They are the owner, render the inventory

    return (
      <div className="inventory">
        <h2>Inventory</h2>
        {logout}
        {Object.keys(this.props.fishes).map((key) => (
          <EditFishForm
            key={key.toString()}
            index={key}
            fish={this.props.fishes[key]}
            updateFish={this.props.updateFish}
            deleteFish={this.props.deleteFish}
          />
        ))}
        <AddFishForm addFish={this.props.addFish} />
        <button type="button" onClick={this.props.loadSampleFishes}>
          Load Sample Fishes
        </button>
      </div>
    );
  }
}

export default Inventory;
