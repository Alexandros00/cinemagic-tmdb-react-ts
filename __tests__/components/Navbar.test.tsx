import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import Navbar from "../../src/components/Navbar/Navbar";

describe("Navbar", () => {
  it("should contain app title of type h1", () => {
    render(<Navbar />);

    const h1 = screen.getByRole("heading", { name: "CineMagic" });

    expect(h1).toBeInTheDocument();

    expect(h1).toHaveProperty("tagName", "H1");
  });
});
