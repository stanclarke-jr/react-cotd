import React from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { formatPrice } from '../helpers';

class Order extends React.Component {
  static proptTypes = {
    fishes: PropTypes.shape({
      image: PropTypes.string,
      name: PropTypes.string,
      discription: PropTypes.string,
      status: PropTypes.string,
      price: PropTypes.number,
    }),
    removeFromOrder: PropTypes.func,
    order: PropTypes.object,
  };

  renderOrder = (key) => {
    const { order, fishes, removeFromOrder } = this.props;
    const fish = fishes[key];
    const count = order[key];
    const transitionOptions = {
      classNames: 'order',
      key,
      timeout: { enter: 500, exit: 500 },
    };
    // Make sure is loaded before continuing
    if (!fish) return null;
    if (fish.status === 'unavailable') {
      return (
        <CSSTransition {...transitionOptions}>
          <li key={key.toString()}>
            <em>
              Sorry, we're all out of{' '}
              {fish ? fish.name : 'the fish you ordered'}
            </em>
          </li>
        </CSSTransition>
      );
    }
    return (
      <CSSTransition {...transitionOptions}>
        <li key={key.toString()}>
          <span>
            <TransitionGroup component="span" className="count">
              <CSSTransition
                classNames="count"
                key={count}
                timeout={{ enter: 500, exit: 500 }}
              >
                <span>{count}</span>
              </CSSTransition>
            </TransitionGroup>
            lbs {fish.name}
          </span>
          <span className="price">
            {formatPrice(fish.price)}
            {'  '}
            <button type="button" onClick={() => removeFromOrder(key)}>
              &times;
            </button>
          </span>
        </li>
      </CSSTransition>
    );
  };

  render() {
    const { order, fishes } = this.props;
    const orderIds = Object.keys(order);
    const total = orderIds.reduce((prevTotal, key) => {
      const fish = fishes[key];
      const count = order[key];
      const isAvailable = fish && fish.status === 'available';
      if (isAvailable) {
        return prevTotal + count * fish.price;
      }
      return prevTotal;
    }, 0);

    return (
      <div className="order-wrap">
        <h2>Order</h2>
        <TransitionGroup component="ul" className="order">
          {orderIds.map(this.renderOrder)}
        </TransitionGroup>
        <div className="total">
          Total:
          <strong>{formatPrice(total)}</strong>
        </div>
      </div>
    );
  }
}

export default Order;
