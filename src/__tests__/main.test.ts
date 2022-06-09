import { Tag } from '../main'

test("addClass works", () => {
  const html = new Tag("html")
  html.addClass("blue-theme")

  const expectedResult =
    "\n" +
    '<html class="blue-theme">' +
    "\n" +
    "</html>"

  expect(html.printTree()).toEqual(expectedResult)
  html.addClass("main-content")

  const expectedResultWithTwoClasses =
    "\n" +
    '<html class="blue-theme main-content">' +
    "\n" +
    "</html>"
  expect(html.printTree()).toEqual(expectedResultWithTwoClasses)
})

test("appendChild works", () => {
  const html = new Tag("html")
  html.addClass("blue-theme")
  const body = new Tag("body")
  const div = new Tag("div")
  html.appendChild(body)
  body.appendChild(div)

  const expectedResult =
    "\n" +
    '<html class="blue-theme">' +
    "\n" +
    "  <body>" +
    "\n" +
    "    <div>" +
    "\n" +
    "    </div>" +
    "\n" +
    "  </body>" +
    "\n" +
    "</html>"

  expect(html.printTree()).toEqual(expectedResult)
})