import { AssetItem, IAssetItem, AssetType } from '../../models/asset-item';

const defaultState: IAssetItem[] = [
  new AssetItem('Home', 30000, AssetType.REAL_ESTATE, 1),
  new AssetItem('Stocks', 5000, AssetType.INVESTMENT, 2),
  new AssetItem('Bitcoin', 5000, AssetType.INVESTMENT, 3),
  new AssetItem('RRSP Stocks', 2000, AssetType.RRSP, 4),
];

export function assetListReducer(state: IAssetItem[] = defaultState, action) {
  switch (action.type) {
    case 'ADD_ASSET_LIST_ITEM':
      return [action.payload, ...state];
    case 'UPDATE_ASSET_LIST_ITEM':
      let newState = state.map(i => {
        if (i.id !== action.payload.id) {
          return i;
        }
        return {
          ...i,
          ...action.payload,
        };
      });
      return newState;
    case 'DELETE_ASSET_LIST_ITEM':
      return state.filter(item => item.id !== action.payload.id);
    default:
      return state;
  }
}
