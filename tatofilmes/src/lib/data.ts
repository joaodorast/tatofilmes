
export interface Movie {
  id: string;
  title: string;
  posterUrl: string;
  backdropUrl: string;
  releaseDate: string;
  duration: number; // in minutes
  rating: number; // out of 10
  genres: string[];
  director: string;
  cast: string[];
  synopsis: string;
  trailerUrl?: string;
  ageRating: string; // e.g., "PG-13", "R", etc.
  status: 'now-showing' | 'coming-soon';
}

export const movies: Movie[] = [
  {
    id: "1",
    title: "Inception",
    posterUrl: "https://source.unsplash.com/300x450/?movie,inception",
    backdropUrl: "https://source.unsplash.com/1200x600/?movie,inception",
    releaseDate: "2023-07-16",
    duration: 148,
    rating: 8.8,
    genres: ["Action", "Sci-Fi", "Thriller"],
    director: "Christopher Nolan",
    cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page", "Tom Hardy"],
    synopsis: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    trailerUrl: "https://www.youtube.com/watch?v=YoHD9XEInc0",
    ageRating: "PG-13",
    status: "now-showing"
  },
  {
    id: "2",
    title: "The Shawshank Redemption",
    posterUrl: "https://source.unsplash.com/300x450/?movie,prison",
    backdropUrl: "https://source.unsplash.com/1200x600/?movie,prison",
    releaseDate: "2023-09-10",
    duration: 142,
    rating: 9.3,
    genres: ["Drama"],
    director: "Frank Darabont",
    cast: ["Tim Robbins", "Morgan Freeman", "Bob Gunton", "William Sadler"],
    synopsis: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    trailerUrl: "https://www.youtube.com/watch?v=6hB3S9bIaco",
    ageRating: "R",
    status: "now-showing"
  },
  {
    id: "3",
    title: "The Dark Knight",
    posterUrl: "https://source.unsplash.com/300x450/?movie,batman",
    backdropUrl: "https://source.unsplash.com/1200x600/?movie,batman",
    releaseDate: "2023-05-20",
    duration: 152,
    rating: 9.0,
    genres: ["Action", "Crime", "Drama"],
    director: "Christopher Nolan",
    cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart", "Michael Caine"],
    synopsis: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    trailerUrl: "https://www.youtube.com/watch?v=EXeTwQWrcwY",
    ageRating: "PG-13",
    status: "now-showing"
  },
  {
    id: "4",
    title: "Pulp Fiction",
    posterUrl: "https://source.unsplash.com/300x450/?movie,pulp",
    backdropUrl: "https://source.unsplash.com/1200x600/?movie,pulp",
    releaseDate: "2023-08-05",
    duration: 154,
    rating: 8.9,
    genres: ["Crime", "Drama"],
    director: "Quentin Tarantino",
    cast: ["John Travolta", "Uma Thurman", "Samuel L. Jackson", "Bruce Willis"],
    synopsis: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    trailerUrl: "https://www.youtube.com/watch?v=s7EdQ4FqbhY",
    ageRating: "R",
    status: "now-showing"
  },
  {
    id: "5",
    title: "The Matrix",
    posterUrl: "https://source.unsplash.com/300x450/?movie,matrix",
    backdropUrl: "https://source.unsplash.com/1200x600/?movie,matrix",
    releaseDate: "2023-06-15",
    duration: 136,
    rating: 8.7,
    genres: ["Action", "Sci-Fi"],
    director: "Lana Wachowski, Lilly Wachowski",
    cast: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss", "Hugo Weaving"],
    synopsis: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
    trailerUrl: "https://www.youtube.com/watch?v=vKQi3bBA1y8",
    ageRating: "R",
    status: "now-showing"
  },
  {
    id: "6",
    title: "Interstellar",
    posterUrl: "https://source.unsplash.com/300x450/?movie,space",
    backdropUrl: "https://source.unsplash.com/1200x600/?movie,space",
    releaseDate: "2024-01-20",
    duration: 169,
    rating: 8.6,
    genres: ["Adventure", "Drama", "Sci-Fi"],
    director: "Christopher Nolan",
    cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain", "Michael Caine"],
    synopsis: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    trailerUrl: "https://www.youtube.com/watch?v=zSWdZVtXT7E",
    ageRating: "PG-13",
    status: "coming-soon"
  },
  {
    id: "7",
    title: "The Godfather",
    posterUrl: "https://source.unsplash.com/300x450/?movie,mafia",
    backdropUrl: "https://source.unsplash.com/1200x600/?movie,mafia",
    releaseDate: "2024-02-15",
    duration: 175,
    rating: 9.2,
    genres: ["Crime", "Drama"],
    director: "Francis Ford Coppola",
    cast: ["Marlon Brando", "Al Pacino", "James Caan", "Diane Keaton"],
    synopsis: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    trailerUrl: "https://www.youtube.com/watch?v=sY1S34973zA",
    ageRating: "R",
    status: "coming-soon"
  },
  {
    id: "8",
    title: "Fight Club",
    posterUrl: "https://source.unsplash.com/300x450/?movie,fight",
    backdropUrl: "https://source.unsplash.com/1200x600/?movie,fight",
    releaseDate: "2024-03-10",
    duration: 139,
    rating: 8.8,
    genres: ["Drama"],
    director: "David Fincher",
    cast: ["Brad Pitt", "Edward Norton", "Helena Bonham Carter", "Meat Loaf"],
    synopsis: "An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more.",
    trailerUrl: "https://www.youtube.com/watch?v=qtRKdVHc-cE",
    ageRating: "R",
    status: "coming-soon"
  }
];

// Seats configuration for theater
export interface Seat {
  id: string;
  row: string;
  number: number;
  type: 'standard' | 'premium' | 'vip';
  status: 'available' | 'selected' | 'reserved' | 'disabled';
}

export const generateTheaterSeats = (
  rows: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
  seatsPerRow: number = 12
): Seat[] => {
  const seats: Seat[] = [];
  
  rows.forEach((row, rowIndex) => {
    for (let seatNum = 1; seatNum <= seatsPerRow; seatNum++) {
      let type: 'standard' | 'premium' | 'vip' = 'standard';
      
      // Front rows are standard
      if (rowIndex < 3) {
        type = 'standard';
      } 
      // Middle rows are premium
      else if (rowIndex >= 3 && rowIndex < 7) {
        type = 'premium';
      } 
      // Back rows are VIP
      else {
        type = 'vip';
      }
      
      // Create a random status for demo purposes
      const randomNum = Math.random();
      let status: 'available' | 'selected' | 'reserved' | 'disabled' = 'available';
      
      if (randomNum < 0.2) {
        status = 'reserved';
      } else if (randomNum < 0.25) {
        status = 'disabled';
      }
      
      seats.push({
        id: `${row}-${seatNum}`,
        row,
        number: seatNum,
        type,
        status,
      });
    }
  });
  
  return seats;
};

// User profiles for demo purposes
export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  membershipLevel: 'bronze' | 'silver' | 'gold' | 'vip';
  points: number;
  favoriteMovies: string[]; // Movie IDs
  watchHistory: string[]; // Movie IDs
}

export const demoUser: User = {
  id: "user1",
  name: "John Doe",
  email: "john.doe@example.com",
  avatarUrl: "https://source.unsplash.com/150x150/?portrait",
  membershipLevel: "gold",
  points: 1250,
  favoriteMovies: ["1", "3", "5"],
  watchHistory: ["2", "4", "5"]
};
