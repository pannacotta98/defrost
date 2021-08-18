import serverTypes from '../../shared/serverTypes';

export type sortingFunction = (item1: serverTypes.Item, item2: serverTypes.Item) => number;

export const sortingFunctions = new Map<string, sortingFunction>([
  [
    'oldest first',
    (item1, item2) => {
      if (item1.expiresBy && item2.expiresBy)
        return item1.expiresBy.toMillis() - item2.expiresBy.toMillis();
      else if (item1.expiresBy && !item2.expiresBy) return -1;
      else if (!item1.expiresBy && item2.expiresBy) return 1;
      return 0;
    },
  ],
]);
