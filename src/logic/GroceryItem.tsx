export enum GroceryType {
  UNSET = 'None',
  BREAD = 'Bread',
  MEAT = 'Meat',
  FISH = 'Fish',
  // TODO
}

export interface GroceryItem {
  name: string;
  expiresBy: Date | undefined;
  added: Date;
  type: GroceryType;
  // location: ...
  addedBy: string; // uid of who added the item
  // note?: string; // Maybe idk
}
