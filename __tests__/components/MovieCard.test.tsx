import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import MovieCard from "../../src/components/MovieCard/MovieCard";

const movieSample = {
  adult: false,
  backdrop_path: "/2Nti3gYAX513wvhp8IiLL6ZDyOm.jpg",
  genre_ids: [10751, 35, 12, 14],
  id: 950387,
  original_language: "en",
  original_title: "A Minecraft Movie",
  overview:
    "Four misfits find themselves struggling with ordinary problems when they are suddenly pulled through a mysterious portal into the Overworld: a bizarre, cubic wonderland that thrives on imagination. To get back home, they'll have to master this world while embarking on a magical quest with an unexpected, expert crafter, Steve.",
  popularity: 900.608,
  poster_path: "/yFHHfHcUgGAxziP1C3lLt0q2T4s.jpg",
  release_date: "2025-03-31",
  title: "A Minecraft Movie",
  video: false,
  vote_average: 6.064,
  vote_count: 445
};

beforeEach(() => {
  render(<MovieCard movie={movieSample} />);
});

describe("MovieCard", () => {
  it("should contain img", () => {
    const img = screen.getByRole("img");
    expect(img).toBeInTheDocument();
  });

  it("should contain time html tag with the year", () => {
    const year = screen.getByTestId("release-year");
    expect(year).toBeInTheDocument();

    expect(year.tagName).toBe("TIME");

    expect(year).toHaveTextContent(movieSample.release_date.split("-")[0]);
  });

  it("should contain rating", () => {
    const voteAvg = screen.getByTestId("vote_average");
    expect(voteAvg).toBeInTheDocument();
    expect(voteAvg).toHaveTextContent(
      movieSample.vote_average.toFixed(1) + " / 10"
    );
  });

  it("should contain movie title", () => {
    const h2 = screen.getByRole("heading");
    expect(h2).toBeInTheDocument();
    expect(h2.tagName).toBe("H3");
    expect(h2).toHaveTextContent(movieSample.title);
  });

  it("should contain a paragraph with the overview", () => {
    const p = screen.getByRole("paragraph");
    expect(p).toBeInTheDocument();
    expect(p).toHaveTextContent(movieSample.overview);
  });
});
