import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import LandingPage from "../../src/pages/landing-page/LandingPage";

beforeEach(() => {
  render(<LandingPage />);
});

describe("LandingPage", () => {
  it("should contain an array of items", () => {
    // const section = screen.getByTestId("movies-section");
  });
});
