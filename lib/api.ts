import type { Content } from "./types"

const FEATURED_CONTENT = [
  {
    id: "tt0133093",
    title: "The Matrix",
    backdropPath: "/banner_pics/matrix.jpg",
    overview: "Set in the 22nd century, The Matrix tells the story of a computer hacker who joins a group of underground insurgents fighting the vast and powerful computers who now rule the earth.",
    releaseYear: "1999",
    rating: "R",
    runtime: "2h 16m"
  },
  {
    id: "tt0816692",
    title: "Interstellar",
    backdropPath: "/banner_pics/interstellar.jpg",
    overview: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    releaseYear: "2014",
    rating: "PG-13",
    runtime: "2h 49m"
  },
  {
    id: "anime_overlord",
    title: "Overlord",
    backdropPath: "/banner_pics/overlord.jpg",
    overview: "An ordinary game player accidentally finds himself trapped as his character in a virtual game world that has been shut down, where he rises to become the overlord of a powerful guild.",
    releaseYear: "2015",
    rating: "TV-MA",
    runtime: "23m per ep"
  },
  {
    id: "anime_onepiece",
    title: "One Piece",
    backdropPath: "/banner_pics/onepiece.jpg",
    overview: "Follows the adventures of Monkey D. Luffy and his pirate crew in order to find the greatest treasure ever left by the legendary Pirate, Gold Roger.",
    releaseYear: "1999",
    rating: "TV-14",
    runtime: "23m per ep"
  },
  {
    id: "anime_smile",
    title: "Reincarnated as a Slime",
    backdropPath: "/banner_pics/thetimeigotreincarnatedasaslime.jpg",
    overview: "Corporate worker Mikami Satoru is stabbed by a random killer, and is reborn to an alternate world as a slime monster.",
    releaseYear: "2018",
    rating: "TV-14",
    runtime: "23m per ep"
  },
  {
    id: "anime_demonslayer",
    title: "Demon Slayer",
    backdropPath: "/banner_pics/demonslayer.jpg",
    overview: "A family is attacked by demons and only two members survive - Tanjiro and his sister Nezuko, who is turning into a demon slowly. Tanjiro sets out to become a demon slayer to avenge his family and cure his sister.",
    releaseYear: "2019",
    rating: "TV-MA",
    runtime: "23m per ep"
  },
  {
    id: "anime_sololeveling",
    title: "Solo Leveling",
    backdropPath: "/banner_pics/sololeveling.jpg",
    overview: "In a world where hunters must battle deadly monsters to protect humanity, Sung Jinwoo, the weakest of hunters, faces a life-changing incident that sets him on a path to become the strongest hunter.",
    releaseYear: "2024",
    rating: "TV-MA",
    runtime: "23m per ep"
  },
  {
    id: "anime_naruto",
    title: "Naruto",
    backdropPath: "/banner_pics/naruto.jpg",
    overview: "Naruto Uzumaki, a mischievous adolescent ninja, struggles as he searches for recognition and dreams of becoming the Hokage, the village's leader and strongest ninja.",
    releaseYear: "2002",
    rating: "TV-14",
    runtime: "23m per ep"
  }
]

export async function fetchPopularContent(limit: number = 8): Promise<Content[]> {
  // Return our predefined content list
  return FEATURED_CONTENT.slice(0, limit)
}
