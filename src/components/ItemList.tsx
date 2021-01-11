import React from 'react';
import { GroceryItem, GroceryType } from '../logic/GroceryItem';
import ListItem from './ListItem';

interface Props {
  items: GroceryItem[];
}

const ItemList: React.FC<Props> = ({ items }) => {
  // const filterCondition = (item: GroceryItem) => item.type.includes(GroceryType.Bread); // TODO Fix real functionality
  const filterCondition = () => true;
  const sortCondition = (item1: GroceryItem, item2: GroceryItem) => {
    if (item1.expiresBy && item2.expiresBy) {
      return item1.expiresBy.getTime() - item2.expiresBy.getTime();
    }
    return 0;
  };

  const filteredAndSortedItems = items.filter(filterCondition).sort(sortCondition);

  return (
    <>
      <div>
        {filteredAndSortedItems.map((item, idx) => (
          <ListItem item={item} key={idx} />
        ))}
      </div>
      {/* <div className="navbar is-fixed-bottom is-primary">ehjhejhje</div> */}
    </>
  );
};

export default ItemList;
