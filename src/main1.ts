/*
 Data modelling:
 We want to see this at the end. This is a formatted string.
 "
 <html>
   <head></head>
   <body>
    <h1 class="blue-theme">hello world</h1>
    <ul>
      <li>item 1</li>
      <li>item 2</li>
    </ul>
   </body>
 </html>
 "

What data structure could we use to represent this?

interface ElementInterface {
  name: string,
  children: ElementInterface[], // to be able to have nested elements as children
  classes: string[], // to be able to add classes to the element. Could expand to have id, style, etc.
}

 Implement Element class.
 - Element includes data and methods.
 - Data is an html element in type of string. That element can have nested elements (children) and 
  those elements can have children too etc.

 - Instantiate Element class using a constructur function: new Element(element: string) => Element
  
 - Methods are:

  - addClass(class: string) => void
    - Adds a class to the element

  - toString(element: string) => string. 
    - Returns the element as a string

  - querySelector([parentSelector: string, selectorToReturn: string]) => string. 
    - Returns the first element that matches the selectorToReturn. If parentSelector is provided, it will return the first element that matches the selectorToReturn that is a child of the parentSelector. If parentSelector is not provided, it will return the first element that matches the selectorToReturn that is a child of the root element.

  How to make a new class instance:
  const myElem = new Element(tagName: string) - constructor
 */

let spaceCounter = 0;

// Named class MyElement instead of Element because Element is already defined in lib.dom.d.ts.
export interface MyElementInterface {
  tagName: string;
  addClass: (className: string) => MyElement;
  appendChild: (child: MyElement) => MyElement;
  toString: () => string;
  /** Takes a tuple of parentSelector and then the childSelector we are looking for in the parentSelector subtree. Returns the first element which has this selector.*/
  querySelector: ([parentSelector, childSelector]: string[]) => MyElement;
}

class MyElement implements MyElementInterface {
  tagName: string;
  private _children: MyElement[] = [];
  private _classList: string[] = [];

  constructor(tagName: string) {
    this.tagName = tagName;
  }

  addClass = (className: string): MyElement => {
    this._classList.push(className);
    return this;
  };

  appendChild = (child: MyElement) => {
    this._children.push(child);
    return this;
  };

  // TODO: implement this.
  querySelector = ([parentSelector, childSelector]: string[]): MyElement => {
    return this;
  };

  toString = (): string => {
    let spaces = " ".repeat((spaceCounter += 2));
    const elementHasChildren = this._children.length > 0;
    const elementHasNoChildren = !elementHasChildren;
    const elementHasClasses = this._classList.length > 0;
    const classes = elementHasClasses
      ? ` class="${this._classList.join(" ")}"`
      : "";
    let string: string = "";

    if (elementHasNoChildren) {
      // Print start and end tag to the same line.
      string = `${spaces}<${this.tagName}${classes}></${this.tagName}>\n`;
    } else if (elementHasChildren) {
      const children = this._children.join("");
      string = `${spaces}<${this.tagName}${classes}>\n${children}${spaces}</${this.tagName}>\n`;
    }

    console.log(string);
    return string;
  };
}

export default MyElement;

// // Test cases: 1.
// const html = new MyElement("html");
// const body = new MyElement("body");
// const div = new MyElement("div");
// html.appendChild(body);
// body.appendChild(div);
// console.log(html.toString());

// Test cases: 2
const html = new MyElement("html");
const body = new MyElement("body");
const div = new MyElement("div");
html.appendChild(body);
body.appendChild(div);
div.addClass("main-content");
const span = new MyElement("span");
span.addClass("some-other-content");
div.appendChild(span);
const p = new MyElement("p");
p.addClass("some-other-content");
div.appendChild(p);
console.log(html.toString());
