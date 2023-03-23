import React, { useContext, useEffect } from 'react';
import TrashCanSVG from '../../assets/trash-can.svg';
import styles from './CartsList.module.css';
import ListItem from './ListItem/ListItem';
import { CartsListProps, ISortBy } from './types';

import useScrollToSelectedCart from '../../hooks/useScrollToSelectedCart';
import SortButton from './SortButton/SortButton';
import { CartsContext } from '../../contexts/CartsContext';

const CartsList = ({}: CartsListProps) => {
  const { carts } = useContext(CartsContext);

  useScrollToSelectedCart();

  const [sortBy, setSortBy] = React.useState<ISortBy>({ field: 'id', dir: 'desc' });

  function cartsSorted() {
    return carts.sort((a, b) => {
      if (sortBy.dir === 'asc') {
        return a[sortBy.field] > b[sortBy.field] ? -1 : 1;
      } else {
        return a[sortBy.field] < b[sortBy.field] ? -1 : 1;
      }
    });
  }

  const handleSortChange = (field: 'id' | 'total' | 'discountedTotal') => {
    const active = field === sortBy.field;
    if (active) setSortBy({ field, dir: sortBy.dir === 'asc' ? 'desc' : 'asc' });
    else setSortBy({ field, dir: 'asc' });
  };

  return (
    <aside className={styles.list}>
      <h2 className={styles.listTitle}>Your Carts</h2>
      <div className={styles.listHeader}>
        <div
          className={`${styles.firstColumn} ${styles.coulmn} ${styles.clickable}`}
          onClick={() => handleSortChange('id')}>
          <span>ID</span>
          <SortButton field="id" sortBy={sortBy} setSortBy={setSortBy} />
        </div>
        <div
          className={`${styles.secondColumn} ${styles.coulmn} ${styles.clickable}`}
          onClick={() => handleSortChange('total')}>
          <span>Total Price</span>
          <SortButton field="total" sortBy={sortBy} setSortBy={setSortBy} />
        </div>
        <div
          className={`${styles.thirdColumn} ${styles.coulmn} ${styles.clickable}`}
          onClick={() => handleSortChange('discountedTotal')}>
          <span>Discounted To</span>
          <SortButton field="discountedTotal" sortBy={sortBy} setSortBy={setSortBy} />
        </div>
      </div>
      <div className={styles.listContent}>
        {cartsSorted().map((cart) => {
          return <ListItem key={cart.id} cart={cart}></ListItem>;
        })}
      </div>
    </aside>
  );
};

export default CartsList;
