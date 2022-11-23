// Named class MyElement instead of Element because Element is already defined in lib.dom.d.ts.
export interface MyElementInterface {
  tagName: string;
  addClass: (className: string) => MyElement;
  appendChild: (child: MyElement) => MyElement;
  printTree: () => string;
  /** Takes a tuple of parentSelector and then the childSelector we are looking for in the parentSelector subtree. Returns the first element which has this selector.*/
  querySelector: ([parentSelector, childSelector]: string[]) => MyElement;
}

class MyElement implements MyElementInterface {
  tagName: string;
  private _children: MyElement[] = [];
  private _classList: string[] = [];
  // We need dept property. For each when adding a child to a parent, we need to increment the dept of the child by 1. This is how we will know how many spaces to add before the child element.
  private _depth: number = 0;

  constructor(tagName: string) {
    this.tagName = tagName;
  }

  addClass = (className: string): MyElement => {
    this._classList.push(className);
    return this;
  };

  appendChild = (child: MyElement) => {
    // Increment the dept of the child by taking the current element's depth and adding 1 to it.
    child._depth = this._depth + 1;
    this._children.push(child);
    return this;
  };


  querySelector = ([parentSelector, childSelector]: string[]): MyElement => {
    return this;
  };

  printTree = (): string => {
    let spaces = " ".repeat(this._depth * 2);
    const elementHasChildren = this._children.length > 0;
    const hasClasses = this._classList.length > 0;
    const classes = hasClasses ? ` class="${this._classList.join(" ")}"` : "";
    let string: string = "";

    if (elementHasChildren) {
      const children = this._children.map(child => child.printTree()).join("");
      // Print start and end tag to different lines.
      string = `${spaces}<${this.tagName}${classes}>\n${children}${spaces}</${this.tagName}>\n`;
    } else {
      // Print start and end tag to the same line.
      string = `${spaces}<${this.tagName}${classes}></${this.tagName}>\n`;
    }
    return string;
  };
}

export default MyElement;

/* ------------------------------------
Test case 1 - should print the following:

 <html class="blue-theme">
   <body>
     <div></div>
   </body>
 </html>

Uncomment the code below to run the test case.
*/

// const html = new MyElement("html");
// const body = new MyElement("body");
// const div = new MyElement("div");
// html.appendChild(body);
// body.appendChild(div);
// console.log(html.printTree());

/* ------------------------------------
Test case 2 - should print the following: 

 <html>
   <body>
      <div class="main-content">
        <span class="some-other-content"></span>
        <p class="some-other-content">
      </div>
   </body>
 </html>

 Uncomment the code below to run the test case.
*/

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
const div2 = new MyElement("div");
body.appendChild(div2);
console.log(html.printTree())
