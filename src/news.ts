import fetch from "node-fetch";
import jsdom from "jsdom";
const { JSDOM } = jsdom;

const site = "https://news.ycombinator.com/";

export type New = {
  title: string;
  order: number;
  comments: number;
  points: number;
};

export function curateNews(DOMstring: string): New[] {
  const dom = new JSDOM(DOMstring);
  let news: New[] = [];
  const titles = Array.from(
    dom.window.document.getElementsByClassName("athing")
  );
  titles.map((t) => {
    const order = Number(t.getElementsByClassName("rank")[0].textContent);
    const title = t
      .getElementsByClassName("titleline")[0]
      .getElementsByTagName("a")[0].textContent!;
    const points = Number(
      dom.window.document
        .getElementById(`score_${t.id}`)
        ?.textContent?.split(" ")[0] ?? 0
    );
    const commentsText = Array.from(
      dom.window.document.querySelectorAll(`a[href='item?id=${t.id}']`)
    ).filter((elem) => elem.textContent?.includes("comment"));

    var n: New = {
      title: title,
      order: order,
      comments: Number(commentsText[0]?.textContent?.split(/\s/)[0] ?? 0),
      points: points,
    };
    news.push(n);
  });
  return news;
}

export function MoreThan5News(news: New[]): New[] {
  return news
    .filter((n) => n.title.split(/\s+/).length > 5)
    .sort((a, b) => b.comments - a.comments);
}

export function LessThan5News(news: New[]): New[] {
  return news
    .filter((n) => n.title.split(/\s+/).length <= 5)
    .sort((a, b) => b.points - a.points);
}

export function main() {
  fetch(site)
    .then((res) => {
      return res.text();
    })
    .then((text) => {
      let news: New[] = curateNews(text);
      let moreThan5: New[] = MoreThan5News(news);
      let lessThan5: New[] = LessThan5News(news);

      console.log(
        "News with MORE than 5 words -------------------------------------------------- \n",
        moreThan5
      );
      console.log(
        "News with LESS OR EQUAL 5 words -------------------------------------------------- \n",
        lessThan5
      );
      //console.log(news);
    });
}
