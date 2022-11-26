import MyElement from "../main";

test("findFirstChildBFS works", () => {
  /*
   Make this tree:
     <html>
       <body>
          <div class="main-content">
            <span class="some-other-content"></span>
            <p class="some-other-content">
          </div>
       </body>
     </html>
   */
  const html = new MyElement("html");
  const body = new MyElement("body");
  const div = new MyElement("div");
  html.appendChild(body);
  body.appendChild(div);

  const span = new MyElement("span");
  const p = new MyElement("p");
  div.appendChild(span);
  div.appendChild(p);

  div.addClass("main-content");
  span.addClass("some-other-content");
  p.addClass("some-other-content");

  /* Uncomment the code below to see the HTML tree printed in your console. */
  // console.log(html.printTree());

  const result = '<span class="some-other-content"></span>';

  expect(
    html
      .findFirstChildBFS(["main-content", "some-other-content"])
      ?.printTree()
      .trim() // trim() removes all the spaces from the front and the newline at the end of the string
  ).toBe(result);
});

test("findFirstChildBFS test 2 works", () => {
  /*
   Make this tree:
     <html>
       <body>
          <div class="main-content">
            <span></span>
          </div>
          <div class="main-content">
            <span class="some-other-content"></span>
            <p class="some-other-content">
          </div>
       </body>
     </html>
   */
  const html = new MyElement("html");
  const body = new MyElement("body");
  const div = new MyElement("div");
  html.appendChild(body);
  body.appendChild(div);

  const span = new MyElement("span");
  div.appendChild(span);
  div.addClass("main-content");

  const div2 = new MyElement("div");
  const span2 = new MyElement("span");
  const p2 = new MyElement("p");

  body.appendChild(div2);
  div2.appendChild(span2);
  div2.appendChild(p2);

  div2.addClass("main-content");
  span2.addClass("some-other-content");
  p2.addClass("some-other-content");

  /* Uncomment the code below to see the HTML tree printed in your console. */
  // console.log(html.printTree());

  const result = '<span class="some-other-content"></span>';

  expect(
    html
      .findFirstChildBFS(["main-content", "some-other-content"])
      ?.printTree()
      .trim() // trim() removes all the spaces from the front and the newline at the end of the string
  ).toBe(result);
});

test("findDescendantBFS works", () => {
  /*
   Make this tree:
     <html>
       <body class="main-content">
          <ul>
            <li></lli>
          </ul>
          <div>
            <p class="some-other-content"></p>
          </div>
       </body>
     </html>
   */
  const html = new MyElement("html");
  const body = new MyElement("body");
  const ul = new MyElement("ul");
  const li = new MyElement("li");
  html.appendChild(body);
  body.appendChild(ul);
  ul.appendChild(li);

  body.addClass("main-content");

  const div = new MyElement("div");
  const p = new MyElement("p");

  body.appendChild(div);
  div.appendChild(p);

  p.addClass("some-other-content");

  /* Uncomment the code below to see the HTML tree printed in your console. */
  // console.log(html.printTree());

  const result = '<p class="some-other-content"></p>';

  expect(
    html
      .findDescendantBFS(["main-content", "some-other-content"])
      ?.printTree()
      .trim() // trim() removes all the spaces from the front and the newline at the end of the string
  ).toBe(result);
});

test("findDescendantDFS works", () => {
  /*
   Make this tree:
    <body class="main-content">
      <div>
        <p>
          <span></span>
        </p>
        <code></code>
      </div>
      <section></section>
      <ul>
        <li>
          <a></a>
          <button class="some-other-content"></button>
        </li>
      </ul>
    </body>
   */
  const body = new MyElement("body");
  const div = new MyElement("div");
  const p = new MyElement("p");
  const span = new MyElement("span");
  const code = new MyElement("code");
  body.appendChild(div);
  div.appendChild(p);
  p.appendChild(span);
  div.appendChild(code);

  body.addClass("main-content");

  const section = new MyElement("section");
  body.appendChild(section);

  const ul = new MyElement("ul");
  const li = new MyElement("li");
  const a = new MyElement("a");
  const button = new MyElement("button");
  body.appendChild(ul);
  ul.appendChild(li);
  li.appendChild(a);
  li.appendChild(button);

  button.addClass("some-other-content");

  /* Uncomment the code below to see the HTML tree printed in your console. */
  // console.log(body.printTree());

  const result = '<button class="some-other-content"></button>';

  expect(
    body
      .findDescendantDFS(["main-content", "some-other-content"])
      ?.printTree()
      .trim() // trim() removes all the spaces from the front and the newline at the end of the string
  ).toBe(result);
});
