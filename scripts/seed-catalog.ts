import { IMAGES } from "../src/lib/images";
import type { WorkClip, WorkEvent, WorkCategoryId } from "../src/lib/work";

const DEFAULT_SUBTITLE = "Captured & Edited in Minutes";

function ytPoster(id: string) {
  return `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;
}

function ytCover(youtubeId: string, title: string): WorkClip {
  return {
    id: `${youtubeId}-cover`,
    title,
    subtitle: DEFAULT_SUBTITLE,
    image: ytPoster(youtubeId),
    source: "youtube",
    youtubeId,
  };
}

function fileCover(
  id: string,
  title: string,
  image: string,
  video: string,
  audio: string
): WorkClip {
  return {
    id,
    title,
    subtitle: DEFAULT_SUBTITLE,
    image,
    source: "file",
    video,
    audio,
  };
}

function shoot(
  id: string,
  categoryId: WorkCategoryId,
  title: string,
  cover: WorkClip
): WorkEvent {
  return {
    id,
    categoryId,
    title,
    subtitle: cover.subtitle ?? DEFAULT_SUBTITLE,
    cover,
  };
}

/** Initial catalog for `npm run db:seed` only — live app reads from the DB. */
export const WORK_EVENTS: WorkEvent[] = [
  shoot(
    "weddings-1",
    "weddings",
    "Wedding Shoot",
    ytCover("mIpi8LjwCnE", "Wedding Shoot")
  ),
  shoot(
    "weddings-2",
    "weddings",
    "Wedding Shoot",
    ytCover("JeVMrcK9yrk", "Wedding Shoot")
  ),
  shoot(
    "weddings-3",
    "weddings",
    "Wedding Shoot",
    ytCover("ocOM88L8Fas", "Wedding Shoot")
  ),
  shoot(
    "fashion-1",
    "fashion",
    "Fashion Shoot",
    ytCover("h7FqMfPzdmE", "Fashion Shoot")
  ),
  shoot(
    "fashion-2",
    "fashion",
    "Model Shoot",
    fileCover(
      "fashion-2-cover",
      "Model Shoot",
      IMAGES.portrait,
      "https://assets.mixkit.co/videos/42908/42908-720.mp4",
      "https://assets.mixkit.co/music/140/140.mp3"
    )
  ),
  shoot(
    "brands-1",
    "brands",
    "Brand Stories",
    fileCover(
      "brands-1-cover",
      "Brand Stories",
      IMAGES.brand,
      "https://assets.mixkit.co/videos/20877/20877-720.mp4",
      "https://assets.mixkit.co/music/466/466.mp3"
    )
  ),
  shoot(
    "movie-1",
    "movie",
    "Movie Promotion Shoot",
    ytCover("19R13HQz6K0", "Movie Promotion Shoot")
  ),
  shoot(
    "movie-2",
    "movie",
    "Movie Promotion Shoot",
    ytCover("b9oq9CXWMOs", "Movie Promotion Shoot")
  ),
  shoot(
    "movie-3",
    "movie",
    "Movie Promotion Shoot",
    ytCover("qWfWdDXavV0", "Movie Promotion Shoot")
  ),
  shoot(
    "movie-4",
    "movie",
    "Movie Promotion Shoot",
    ytCover("iKjuNJxRp_E", "Movie Promotion Shoot")
  ),
  shoot(
    "event-1",
    "event",
    "Event Shoot",
    fileCover(
      "event-1-cover",
      "Event Shoot",
      IMAGES.festival,
      "https://assets.mixkit.co/videos/4344/4344-720.mp4",
      "https://assets.mixkit.co/music/614/614.mp3"
    )
  ),
  shoot(
    "store-1",
    "store",
    "Store Promotion Reels",
    fileCover(
      "store-1-cover",
      "Store Promotion Reels",
      IMAGES.store,
      "https://assets.mixkit.co/videos/40783/40783-720.mp4",
      "https://assets.mixkit.co/music/759/759.mp3"
    )
  ),
  shoot(
    "vehicle-1",
    "vehicle",
    "Vehicle Shoot — Regular",
    fileCover(
      "vehicle-1-cover",
      "Vehicle Shoot — Regular",
      IMAGES.vehicle,
      "https://assets.mixkit.co/videos/4698/4698-720.mp4",
      "https://assets.mixkit.co/music/580/580.mp3"
    )
  ),
  shoot(
    "food-1",
    "food",
    "Restaurant Reel",
    fileCover(
      "food-1-cover",
      "Restaurant Reel",
      IMAGES.food,
      "https://assets.mixkit.co/videos/37/37-720.mp4",
      "https://assets.mixkit.co/music/89/89.mp3"
    )
  ),
  shoot(
    "concert-1",
    "concert",
    "Concert Reel",
    fileCover(
      "concert-1-cover",
      "Concert Reel",
      IMAGES.concert,
      "https://assets.mixkit.co/videos/4278/4278-720.mp4",
      "https://assets.mixkit.co/music/738/738.mp3"
    )
  ),
  shoot(
    "corporate-1",
    "corporate",
    "Corporate Shoot",
    fileCover(
      "corporate-1-cover",
      "Corporate Shoot",
      IMAGES.tmp1,
      "https://assets.mixkit.co/videos/8107/8107-720.mp4",
      "https://assets.mixkit.co/music/493/493.mp3"
    )
  ),
  shoot(
    "product-1",
    "product",
    "Product Reel",
    fileCover(
      "product-1-cover",
      "Product Reel",
      IMAGES.product,
      "https://assets.mixkit.co/videos/4275/4275-720.mp4",
      "https://assets.mixkit.co/music/443/443.mp3"
    )
  ),
];
