import { it, expect, describe } from "vitest";
import { TMDBService } from "../../src/services/TMDBService";
import { MoviesResponse } from "../../src/models/MoviesResponse";

describe("TMDBService", () => {
  const abortController = new AbortController();

  it("should fetch list of entities", async () => {
    const service = new TMDBService<MoviesResponse>("movie/now_playing");
    const response = await service.fetchEntities({
      signal: abortController.signal
    });

    expect(response?.results.length).toBeGreaterThan(0);
    expect(response?.total_results).toBeGreaterThan(0);
  });

  it("should throw error when given wrong path", async () => {
    const service = new TMDBService<MoviesResponse>("movie/now_playing___");

    await expect(
      service.fetchEntities({
        signal: abortController.signal
      })
    ).rejects.toThrowError();
  });
});
