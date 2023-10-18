import {
  exampleHackerNewsHTML,
  expectedLessThan5News,
  expectedMoreThan5News,
  expectedSolution,
} from "./utils/exampleHTML";
import { curateNews, LessThan5News, MoreThan5News, New } from "./news";

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

  it("should curate more than 5 words news from exampleHackerNewsHTML correctly", () => {
    const news: New[] = curateNews(exampleHackerNewsHTML);
    const moreThan5News = MoreThan5News(news);
    expect(moreThan5News).toEqual(expectedMoreThan5News);
  });

  it("should curate less or equal 5 words news from exampleHackerNewsHTML correctly", () => {
    const news: New[] = curateNews(exampleHackerNewsHTML);
    const lessThan5News = LessThan5News(news);
    expect(lessThan5News).toEqual(expectedLessThan5News);
  });
});
