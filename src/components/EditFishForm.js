/* eslint-disable jsx-a11y/no-onchange */
import React from 'react';
import PropTypes from 'prop-types';

class EditFishForm extends React.Component {
  static proptTypes = {
    fish: PropTypes.shape({
      image: PropTypes.string,
      name: PropTypes.string,
      discription: PropTypes.string,
      status: PropTypes.string,
      price: PropTypes.number,
    }),
    updateFish: PropTypes.func,
    deleteFish: PropTypes.func,
    index: PropTypes.string,
  };

  handleChange = (e) => {
    const { fish, updateFish, index } = this.props;
    console.log(e.currentTarget.value);
    // Update fish
    // 1. Take a copty of the current fish
    const updatedFish = {
      ...fish,
      [e.currentTarget.name]: e.currentTarget.value,
    };
    updateFish(index, updatedFish);
  };

  render() {
    const { fish, deleteFish, index } = this.props;
    return (
      <div className="fish-edit">
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={this.handleChange}
          value={fish.name}
        />
        <input
          type="text"
          name="price"
          placeholder="Price"
          onChange={this.handleChange}
          value={fish.price}
        />
        <select
          type="text"
          name="status"
          onChange={this.handleChange}
          value={fish.status}
        >
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea
          name="description"
          placeholder="Description"
          onChange={this.handleChange}
          value={fish.description}
        />
        <input
          type="text"
          name="image"
          placeholder="Image"
          onChange={this.handleChange}
          value={fish.image}
        />
        <button type="button" onClick={() => deleteFish(index)}>
          Remove Fish
        </button>
      </div>
    );
  }
}

export default EditFishForm;
