export const doesCollectionContainElements = (collection: any[]): boolean =>
  collection.length > 0;

export const getAmount = (item: any): number => item.amount || 0;

export const combine = (a: number, b: number): number => a + b;
