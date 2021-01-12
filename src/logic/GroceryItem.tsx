export enum GroceryType {
  Bread,
  Meat,
  Fish,
  // TODO
}

export interface GroceryItem {
  name: string;
  expiresBy: Date | undefined;
  added: Date;
  type: GroceryType[];
  // addedBy: string; // uid of who added the item
  // note?: string; // Maybe idk
}
