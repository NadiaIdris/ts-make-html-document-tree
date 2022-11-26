// Named class MyElement instead of Element because Element is already defined in lib.dom.d.ts.
export interface MyElementInterface {
  tagName: string;
  depth: number;
  addClass: (className: string) => MyElement;
  appendChild: (child: MyElement) => MyElement;
  printTree: () => string;
  /** Takes a tuple of parentSelector and then the childSelector we are looking for in the parentSelector subtree. Returns the first element which has this selector.*/
  findFirstChildBFS: ([
    parentSelector,
    childSelector,
  ]: string[]) => MyElement | null;
  findFirstChildDFS: ([
    parentSelector,
    childSelector,
  ]: string[]) => MyElement | null;
  findDescendantBFS: ([
    parentSelector,
    decendantSelector,
  ]: string[]) => MyElement | null;
  findDescendantDFS: ([
    parentSelector,
    decendantSelector,
  ]: string[]) => MyElement | null;
}

class MyElement implements MyElementInterface {
  tagName: string;
  private _children: MyElement[] = [];
  private _classList: Set<string> = new Set();
  // We need dept property. For each when adding a child to a parent, we need to increment the dept of the child by 1. This is how we will know how many spaces to add before the child element.
  depth: number = 0;
  private _parentElement: MyElement | undefined;

  constructor(tagName: string) {
    this.tagName = tagName;
  }

  addClass = (className: string): MyElement => {
    this._classList.add(className);
    return this;
  };

  appendChild = (child: MyElement) => {
    // Increment the dept of the child by taking the current element's depth and adding 1 to it.
    child.depth = this.depth + 1;
    child._parentElement = this;
    this._children.push(child);
    return this;
  };

  /** Function which takes an element and checks if the element parent has the parentSelector class and does the current element has the child class. If both are true, returns the currentElement.*/
  private _checkForSelectors = (
    currentElement: MyElement,
    [parentSelector, childSelector]: string[]
  ): MyElement | undefined => {
    // Early return if current element is the root element.
    if (currentElement._parentElement === undefined) return;

    const foundChildSelector = currentElement?._classList.has(childSelector);
    const foundParentSelector =
      currentElement._parentElement?._classList.has(parentSelector);

    if (foundParentSelector && foundChildSelector) return currentElement;
  };

  findFirstChildBFS = ([
    parentSelector,
    childSelector,
  ]: string[]): MyElement | null => {
    const queue: MyElement[] = [this];
    let currentElement: MyElement;

    while (queue.length > 0) {
      // Take the first element from the queue.
      currentElement = queue.shift() as MyElement;

      const selectorFound = this._checkForSelectors(currentElement!, [
        parentSelector,
        childSelector,
      ]);
      // If found the selector we were looking for, return it.
      if (selectorFound !== undefined) return selectorFound;

      // If couldn't find the selector, pass all the child elements to the queue.
      currentElement?._children.forEach((child) => {
        queue.push(child);
      });
    }

    return null;
  };

  findFirstChildDFS = ([
    parentSelector,
    childSelector,
  ]: string[]): MyElement | null => {
    const stack: MyElement[] = [this];
    let currentElement: MyElement;

    while (stack.length > 0) {
      currentElement = stack.pop() as MyElement;
      const selectorFound = this._checkForSelectors(currentElement!, [
        parentSelector,
        childSelector,
      ]);
      if (selectorFound !== undefined) return selectorFound;

      currentElement?._children.forEach((child) => {
        stack.push(child);
      });
    }

    return null;
  };

  private _checkForChildAndParentSelectors = (
    currentElement: MyElement,
    [parentSelector, decendantSelector]: string[]
  ): MyElement | undefined => {
    // This function needs to assign an element to the childToReturn variable.

    // Check for decendantSelector.
    if (currentElement._classList.has(decendantSelector)) {
      // Start walking up the tree to find the parent.
      const foundParent = this._walkUpTheTreeToFindParent(
        currentElement,
        parentSelector
      );
      if (foundParent === "foundParent") return currentElement;
    }
  };

  private _walkUpTheTreeToFindParent = (
    currentElement: MyElement,
    parentSelector: string
  ): "foundParent" | "didNotFindParent" => {
    while (currentElement._parentElement !== undefined) {
      if (currentElement._parentElement?._classList.has(parentSelector)) {
        return "foundParent";
      }
      currentElement = currentElement._parentElement;
    }
    return "didNotFindParent";
  };

  findDescendantBFS = ([
    parentSelector,
    decendantSelector,
  ]: string[]): MyElement | null => {
    const queue: MyElement[] = [this];
    let currentElement: MyElement;

    while (queue.length > 0) {
      currentElement = queue.shift() as MyElement;
      const foundChildElementWithMatchingParent =
        this._checkForChildAndParentSelectors(currentElement, [
          parentSelector,
          decendantSelector,
        ]);

      if (foundChildElementWithMatchingParent !== undefined)
        return currentElement;

      currentElement?._children.forEach((child) => {
        queue.push(child);
      });
    }
    return null;
  };

  findDescendantDFS = ([parentSelector, decendantSelector]: string[]) => {
    const stack: MyElement[] = [this];
    let currentElement: MyElement;

    while (stack.length > 0) {
      currentElement = stack.pop() as MyElement;
      // Call a function, check if element has some condition. If it does, return the element
      // const foundChildElementWithMatchingParent =
      //   this._checkForChildAndParentSelectors(currentElement, [
      //     parentSelector,
      //     decendantSelector,
      //   ]);

      // if (foundChildElementWithMatchingParent !== undefined)
      //   return currentElement;

      console.log(currentElement.tagName);
      currentElement._children.forEach((child) => stack.push(child));
    }

    return null
  };
  /*
   Make this tree:
    <body class="main-content">
      <div>
        <p class="some-other-content">
          <span></span>
        </p>
        <code></code>
      </div>
      <section></section>
      <ul>
        <li>
          <a></a>
          <button></button>
        </li>
      </ul>
    </body>
   */
  printTree = (): string => {
    let spaces = " ".repeat(this.depth * 2);
    const elementHasChildren = this._children.length > 0;
    const hasClasses = this._classList.size > 0;
    const classes = hasClasses
      ? ` class="${[...this._classList].join(" ")}"`
      : "";
    let string: string = "";

    if (elementHasChildren) {
      const children = this._children
        .map((child) => child.printTree())
        .join("");
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

// const html = new MyElement("html");
// const body = new MyElement("body");
// const div = new MyElement("div");
// html.appendChild(body);
// body.appendChild(div);
// div.addClass("main-content");
// const span = new MyElement("span");
// span.addClass("some-other-content");
// div.appendChild(span);
// const p = new MyElement("p");
// p.addClass("some-other-content");
// div.appendChild(p);
// const div2 = new MyElement("div");
// body.appendChild(div2);
// console.log(html.printTree())

/* ------------------------------------
Test case 3 - in this HTML tree, should return <span class="some-other-content"></span>

# <html>
#   <body>
#      <div class="main-content">
#        <span class="some-other-content"></span>
#        <p class="some-other-content">
#      </div>
#   </body>
# </html>

 Uncomment the code below to run the test case.
*/

// const html = new MyElement("html");
// const body = new MyElement("body");
// const div = new MyElement("div");
// html.appendChild(body);
// body.appendChild(div);
// div.addClass("main-content");
// const span = new MyElement("span");
// span.addClass("some-other-content");
// div.appendChild(span);
// const p = new MyElement("p");
// p.addClass("some-other-content");
// div.appendChild(p);
// const div2 = new MyElement("div");
// body.appendChild(div2);
// // console.log(html.printTree())
// console.log(
//   html.querySelector(["main-content", "some-other-content"])?.printTree()
// );
