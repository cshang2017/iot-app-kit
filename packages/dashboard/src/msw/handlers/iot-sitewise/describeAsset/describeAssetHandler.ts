import { type DescribeAssetResponse } from '@aws-sdk/client-iotsitewise';
import { rest } from 'msw';

import { DESCRIBE_ASSET_URL } from './constants';
import {
  AFRICA_SITE_ASSET_DESCRIPTION,
  AFRICA_SITE_ASSET_ID,
  ANTARCTICA_SITE_ASSET_DESCRIPTION,
  ANTARCTICA_SITE_ASSET_ID,
  ASIA_SITE_ASSET_DESCRIPTION,
  ASIA_SITE_ASSET_ID,
  AUSTRALIA_SITE_ASSET_DESCRIPTION,
  AUSTRALIA_SITE_ASSET_ID,
  EUROPE_SITE_ASSET_DESCRIPTION,
  EUROPE_SITE_ASSET_ID,
  NORTH_AMERICA_SITE_ASSET_DESCRIPTION,
  NORTH_AMERICA_SITE_ASSET_ID,
  SOUTH_AMERICA_SITE_ASSET_DESCRIPTION,
  SOUTH_AMERICA_SITE_ASSET_ID,
  AFRICA_PRODUCTION_LINE_1_ASSET_DESCRIPTION,
  AFRICA_PRODUCTION_LINE_1_ASSET_ID,
  AFRICA_PRODUCTION_LINE_2_ASSET_DESCRIPTION,
  AFRICA_PRODUCTION_LINE_2_ASSET_ID,
  AFRICA_PRODUCTION_LINE_3_ASSET_DESCRIPTION,
  AFRICA_PRODUCTION_LINE_3_ASSET_ID,
  AFRICA_PRODUCTION_LINE_4_ASSET_DESCRIPTION,
  AFRICA_PRODUCTION_LINE_4_ASSET_ID,
  AFRICA_PRODUCTION_LINE_1_REACTOR_1_ASSET_DESCRIPTION,
  AFRICA_PRODUCTION_LINE_1_REACTOR_1_ASSET_ID,
  AFRICA_PRODUCTION_LINE_1_REACTOR_2_ASSET_DESCRIPTION,
  AFRICA_PRODUCTION_LINE_1_REACTOR_2_ASSET_ID,
  AFRICA_PRODUCTION_LINE_1_REACTOR_3_ASSET_DESCRIPTION,
  AFRICA_PRODUCTION_LINE_1_REACTOR_3_ASSET_ID,
  AFRICA_PRODUCTION_LINE_1_REACTOR_4_ASSET_DESCRIPTION,
  AFRICA_PRODUCTION_LINE_1_REACTOR_4_ASSET_ID,
  AFRICA_PRODUCTION_LINE_1_REACTOR_5_ASSET_DESCRIPTION,
  AFRICA_PRODUCTION_LINE_1_REACTOR_5_ASSET_ID,
  AFRICA_PRODUCTION_LINE_1_STORAGE_TANK_1_ASSET_DESCRIPTION,
  AFRICA_PRODUCTION_LINE_1_STORAGE_TANK_1_ASSET_ID,
  AFRICA_PRODUCTION_LINE_1_STORAGE_TANK_2_ASSET_DESCRIPTION,
  AFRICA_PRODUCTION_LINE_1_STORAGE_TANK_2_ASSET_ID,
  AFRICA_PRODUCTION_LINE_1_STORAGE_TANK_3_ASSET_DESCRIPTION,
  AFRICA_PRODUCTION_LINE_1_STORAGE_TANK_3_ASSET_ID,
  createAssetDescription,
  type AssetDescription,
} from '../constants';

export function describeAssetHandler() {
  return rest.get(DESCRIBE_ASSET_URL, (req, res, ctx) => {
    const { assetId } = req.params;

    let asset: AssetDescription = createAssetDescription();

    switch (assetId) {
      case AFRICA_SITE_ASSET_ID:
        asset = AFRICA_SITE_ASSET_DESCRIPTION;
        break;
      case ANTARCTICA_SITE_ASSET_ID:
        asset = ANTARCTICA_SITE_ASSET_DESCRIPTION;
        break;
      case ASIA_SITE_ASSET_ID:
        asset = ASIA_SITE_ASSET_DESCRIPTION;
        break;
      case AUSTRALIA_SITE_ASSET_ID:
        asset = AUSTRALIA_SITE_ASSET_DESCRIPTION;
        break;
      case EUROPE_SITE_ASSET_ID:
        asset = EUROPE_SITE_ASSET_DESCRIPTION;
        break;
      case NORTH_AMERICA_SITE_ASSET_ID:
        asset = NORTH_AMERICA_SITE_ASSET_DESCRIPTION;
        break;
      case SOUTH_AMERICA_SITE_ASSET_ID:
        asset = SOUTH_AMERICA_SITE_ASSET_DESCRIPTION;
        break;
      case AFRICA_PRODUCTION_LINE_1_ASSET_ID:
        asset = AFRICA_PRODUCTION_LINE_1_ASSET_DESCRIPTION;
        break;
      case AFRICA_PRODUCTION_LINE_2_ASSET_ID:
        asset = AFRICA_PRODUCTION_LINE_2_ASSET_DESCRIPTION;
        break;
      case AFRICA_PRODUCTION_LINE_3_ASSET_ID:
        asset = AFRICA_PRODUCTION_LINE_3_ASSET_DESCRIPTION;
        break;
      case AFRICA_PRODUCTION_LINE_4_ASSET_ID:
        asset = AFRICA_PRODUCTION_LINE_4_ASSET_DESCRIPTION;
        break;
      case AFRICA_PRODUCTION_LINE_1_REACTOR_1_ASSET_ID:
        asset = AFRICA_PRODUCTION_LINE_1_REACTOR_1_ASSET_DESCRIPTION;
        break;
      case AFRICA_PRODUCTION_LINE_1_REACTOR_2_ASSET_ID:
        asset = AFRICA_PRODUCTION_LINE_1_REACTOR_2_ASSET_DESCRIPTION;
        break;
      case AFRICA_PRODUCTION_LINE_1_REACTOR_3_ASSET_ID:
        asset = AFRICA_PRODUCTION_LINE_1_REACTOR_3_ASSET_DESCRIPTION;
        break;
      case AFRICA_PRODUCTION_LINE_1_REACTOR_4_ASSET_ID:
        asset = AFRICA_PRODUCTION_LINE_1_REACTOR_4_ASSET_DESCRIPTION;
        break;
      case AFRICA_PRODUCTION_LINE_1_REACTOR_5_ASSET_ID:
        asset = AFRICA_PRODUCTION_LINE_1_REACTOR_5_ASSET_DESCRIPTION;
        break;
      case AFRICA_PRODUCTION_LINE_1_STORAGE_TANK_1_ASSET_ID:
        asset = AFRICA_PRODUCTION_LINE_1_STORAGE_TANK_1_ASSET_DESCRIPTION;
        break;
      case AFRICA_PRODUCTION_LINE_1_STORAGE_TANK_2_ASSET_ID:
        asset = AFRICA_PRODUCTION_LINE_1_STORAGE_TANK_2_ASSET_DESCRIPTION;
        break;
      case AFRICA_PRODUCTION_LINE_1_STORAGE_TANK_3_ASSET_ID:
        asset = AFRICA_PRODUCTION_LINE_1_STORAGE_TANK_3_ASSET_DESCRIPTION;
        break;
    }

    return res(ctx.status(200), ctx.json(asset satisfies DescribeAssetResponse));
  });
}