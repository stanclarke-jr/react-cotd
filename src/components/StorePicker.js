/* eslint-disable react/static-property-placement */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
  // Constructors: ES6 way of binding custom methods to extended components
  // constructor() {
  //   super(); // Necessary to create component
  //   this.goToStore = this.goToStore.bind(this);
  // }

  // Refs allow us to access the value of a DOM element
  storeName = React.createRef();

  static propTypes = {
    history: PropTypes.object,
  };

  // Alternative to using the above constructor method. Instead of goToStore(event) {} in conjuction with a constructor, this syntax allows us to bind CUSTOM METHODS to an extended component
  goToStore = (e) => {
    // 1. Stop form from submitting
    e.preventDefault();
    // 2. Get text from the input
    const storeName = this.storeName.current.value;
    // 3. Change the page to /store/whatever-they-entered
    this.props.history.push(`/store/${storeName}`);
  };

  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h2>Please enter a store</h2>
        <input
          type="text"
          ref={this.storeName}
          required
          placeholder="Store Name"
          defaultValue={getFunName()}
        />
        <button type="submit">Visit Store</button>
      </form>
    );
  }
}
export default StorePicker;
