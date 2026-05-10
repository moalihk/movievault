const mongoose = require("mongoose");

const Genre = require("../models/Genre");
const Movie = require("../models/Movie");
const Review = require("../models/Review");

mongoose.connect("mongodb://alihkr086_db_user:MvVault_2026_Secure!@ac-ddz51fg-shard-00-00.blrpbkk.mongodb.net:27017,ac-ddz51fg-shard-00-01.blrpbkk.mongodb.net:27017,ac-ddz51fg-shard-00-02.blrpbkk.mongodb.net:27017/movievault?ssl=true&replicaSet=atlas-o1bcff-shard-0&authSource=admin&appName=Cluster0")
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));

const seedDatabase = async () => {
  try {
    await Genre.deleteMany();
    await Movie.deleteMany();
    await Review.deleteMany();

    const genres = await Genre.insertMany([
      {
        name: "Sci-Fi",
        description: "Science fiction movies"
      },
      {
        name: "Action",
        description: "Action-packed movies"
      },
      {
        name: "Drama",
        description: "Emotional storytelling"
      },
      {
        name: "Comedy",
        description: "Funny entertainment"
      },
      {
        name: "Horror",
        description: "Scary movies"
      }
    ]);

    const movies = await Movie.insertMany([
      {
        title: "Interstellar",
        director: "Christopher Nolan",
        year: 2014,
        rating: 9,
        watchStatus: "Watched",
        streamingPlatform: "Netflix",
        personalMood: "Mind-blowing",
        genre: genres[0]._id
      },
      {
        title: "John Wick",
        director: "Chad Stahelski",
        year: 2014,
        rating: 8,
        watchStatus: "Watched",
        streamingPlatform: "Prime Video",
        personalMood: "Exciting",
        genre: genres[1]._id
      },
      {
        title: "The Pursuit of Happyness",
        director: "Gabriele Muccino",
        year: 2006,
        rating: 9,
        watchStatus: "Watched",
        streamingPlatform: "Netflix",
        personalMood: "Inspirational",
        genre: genres[2]._id
      },
      {
        title: "The Mask",
        director: "Chuck Russell",
        year: 1994,
        rating: 8,
        watchStatus: "Watched",
        streamingPlatform: "Disney+",
        personalMood: "Funny",
        genre: genres[3]._id
      },
      {
        title: "The Conjuring",
        director: "James Wan",
        year: 2013,
        rating: 8,
        watchStatus: "Watched",
        streamingPlatform: "HBO Max",
        personalMood: "Terrifying",
        genre: genres[4]._id
      }
    ]);

    await Review.insertMany([
      {
        movie: movies[0]._id,
        reviewerName: "Ali",
        comment: "Amazing visuals and story",
        score: 10
      },
      {
        movie: movies[1]._id,
        reviewerName: "Sara",
        comment: "Great action scenes",
        score: 9
      },
      {
        movie: movies[2]._id,
        reviewerName: "David",
        comment: "Very emotional movie",
        score: 9
      },
      {
        movie: movies[3]._id,
        reviewerName: "Emma",
        comment: "Classic comedy",
        score: 8
      },
      {
        movie: movies[4]._id,
        reviewerName: "John",
        comment: "Very scary and intense",
        score: 8
      }
    ]);

    console.log("Database seeded successfully");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

seedDatabase();