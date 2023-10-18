import { exampleHackerNewsHTML, expectedSolution } from "./exampleHTML";
import { curateNews, New } from "./news";

describe("News Curator", () => {
  it("should curate news correctly", () => {
    const sampleDOMString = `
      <div>
        <div class="athing">
          <span class="rank">1.</span>
          <span class="titleline"><a>Hello, World!</a></span>
        </div>
      </div>
    `;
    const news: New[] = curateNews(sampleDOMString);

    expect(news).toEqual([
      {
        title: "Hello, World!",
        order: 1,
        comments: 0,
        points: 0,
      },
    ]);
  });

  it("should curate news from exampleHackerNewsHTML correctly", () => {
    const news: New[] = curateNews(exampleHackerNewsHTML);
    expect(news).toEqual(expectedSolution);
  });
});
