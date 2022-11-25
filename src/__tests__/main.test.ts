import MyElement from "../main";

// test("querySelector works", () => {
//   /*
//    Make this tree:
//      <html>
//        <body>
//           <div class="main-content">
//             <span class="some-other-content"></span>
//             <p class="some-other-content">
//           </div>
//        </body>
//      </html>
//    */
//   const html = new MyElement("html");
//   const body = new MyElement("body");
//   const div = new MyElement("div");
//   html.appendChild(body);
//   body.appendChild(div);

//   const span = new MyElement("span");
//   const p = new MyElement("p");
//   div.appendChild(span);
//   div.appendChild(p);

//   div.addClass("main-content");
//   span.addClass("some-other-content");
//   p.addClass("some-other-content");

//   const depth =
//     html.querySelector(["main-content", "some-other-content"])?.depth || 0;
//   const spaceCount = depth * 2;
//   const result = `${" ".repeat(
//     spaceCount
//   )}<span class="some-other-content"></span>\n`;

//   expect(
//     html.querySelector(["main-content", "some-other-content"])?.printTree()
//   ).toBe(result);
// });

test("querySelector test 2 works", () => {
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

  console.log(html.printTree());

  const depth =
    html.querySelectorBFS(["main-content", "some-other-content"])?.depth || 0;
  const spaceCount = depth * 2;
  const result = `${" ".repeat(
    spaceCount
  )}<span class="some-other-content"></span>\n`;

  expect(
    html.querySelectorBFS(["main-content", "some-other-content"])?.printTree()
  ).toBe(result);
});
