// ---------------------------------------------------------------------------
// Types matching the `myths` table in the database.
// ---------------------------------------------------------------------------

export interface Myth {
  id: string;
  title: string;
  culture: string;
  description: string;
  author: string;
  story: string;
  /** Key identifying which SVG illustration to render (see MythArt). */
  artwork: string;
  sort_order: number;
  created_at: string;
}
