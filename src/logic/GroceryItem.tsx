export enum GroceryType {
  Bread,
  Meat,
  Fish, // TODO
}

export interface GroceryItem {
  name: string;
  expiresBy: Date | undefined;
  added: Date;
  type: GroceryType[];
  // addedBy: string; // Id of user that added the item
}
