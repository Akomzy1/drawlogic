// Geo provider interface. Version 0.1.0. PRD FR-102–106, PROVIDERS.md.
// Basemap provider is Decision 11 (OPEN): Mapbox or Esri. Google tiles are never a design basemap.
// Every response carries provenance; the site flow copies it into the DDL `site` block and the assumptions panel (FR-105).

export interface BBox {
  /** WGS84 degrees. */
  west: number;
  south: number;
  east: number;
  north: number;
}

export interface GeoProvenance {
  kind: "basemap" | "terrain" | "context_layer" | "boundary" | "survey";
  provider: string;
  dataset?: string;
  imagery_date?: string;
  resolution_m?: number;
  licence?: string;
  attribution: string;
  retrieved_at: string;
}

export interface BasemapProvider {
  readonly provider: "mapbox" | "esri";
  tiles(bbox: BBox, zoom: number): Promise<{ tile_urls: string[]; provenance: GeoProvenance; metered_tiles: number }>;
}

export interface TerrainProvider {
  /** Copernicus DEM / SRTM globally; national LiDAR where available. */
  dem(bbox: BBox): Promise<{
    grid_asset_id: string;
    provenance: GeoProvenance;
    slope_pct: number | null;
    fall_direction_deg: number | null;
    /** Always false for public DEMs; only a survey can support drainage design (FR-105). */
    suitable_for_drainage_design: false;
  }>;
}

export type ContextLayerKind = "road" | "water" | "power_line" | "railway" | "land_use" | "flood_zone" | "conservation_area" | "protected_tree" | "easement";

export interface ContextProvider {
  layers(bbox: BBox, kinds: ContextLayerKind[]): Promise<
    Array<{
      kind: ContextLayerKind;
      /** GeoJSON FeatureCollection asset. */
      features_asset_id: string;
      provenance: GeoProvenance;
      /** Constraint layers are things to check, never pass/fail (FR-104). */
      use: "context" | "thing_to_check";
    }>
  >;
}

export interface BoundaryInput {
  /** A survey always governs over a traced boundary (FR-102). */
  method: "survey" | "traced" | "dimensions";
  /** e.g. EPSG:32631 for a Lagos survey in UTM zone 31N. */
  crs: string;
  polygon: Array<[number, number]>;
  asset_id?: string;
}
