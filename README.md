# Pretty print and traverse an HTML tree

![](/readme-images/pretty-print-html.svg)

## Run app

- In your terminal, go to the root directory of the project and run the following command `npm install` to install dependencies.

## Test

I have written some tests for the app in the `main.test.ts` file. To run jest tests continuously, run "npx jest --watchAll".

## Task

Design and implement a class that can represent a single HTML element and its children. The class should have the following methods for tree construction and pretty printing:

- `addClass` - takes a class name and adds it to the element's list of classes
- `appendChild` - takes an HTML element and adds it to the element's list of children
- `printTree` - returns a string representation of the element and its children in HTML format

The class should also have the following methods for tree traversal:

- `findFirstChildBFS` - a method that takes an array of two elements (tuple). The first element is a parent element selector to start searching the child selector. The second element is the child selector. If we find the first child element that has the selector, we return the child element. The BFS stands for breadth-first search. This simply defines the order we traverse the tree.
- `findFirstChildDFS` - the same as the `findFirstChildBFS` method, but the DFS stands for depth-first search. We traverse the tree using a depth-first search algorithm. If you are not familiar with the difference between BFS and DFS, I have added two images below this section.
- `findDescendantBFS` - this method also takes a tuple, except the first element is the ancestor selector and the second element is the descendant selector. We traverse the tree using a breadth-first search algorithm. If we find the first descendant element that has the selector, we return the descendant element. We traverse the tree using BFS.
- `findDescendantDFS` - same as the `findDescendantBFS` method, except we traverse the tree using DFS.

The following image shows the difference between finding the first child vs finding a descendant element.

![](/readme-images/find-first-child-find-first-descendant.svg)

The following image shows the depth-first search (HTML tree)
![](/readme-images/html-tree-depth-first-search.svg)

The following image shows the depth-first search
![](/readme-images/depth-first-search.svg)

The following image shows the breath-first search
![](/readme-images/breath-first-search.svg)

# Implementation

## Data modeling

The program that we write should produce the following output (which is a string):

```html
"
<html>
  <head></head>
  <body>
    <h1 class="blue-theme"></h1>
    <ul class="blue-theme bold-text">
      <li></li>
      <li></li>
    </ul>
  </body>
</html>
"
```

## What data structures could we use to represent this?

Data is all the pieces of information that we need to represent the element. For example each element needs:

- Tag name: each element only has one tag name, so we can use a string as type.
- Classes: each element can have one or more classes. We want to maintain the order of classes, so we can use an array as a container to store all the classes. Each class is a type string.
- Children: each element can have one or more children. We want to maintain the insertion order of children, so we can use an array as a container to store all the children. Each child is an element, so we can use `MyElement` as a type.

```ts
<ul class="blue-theme bold-text"> // Tag name is "ul". It is an element with two classes and two child elements ("li")
  <li>item 1</li> // <- child 1: "li" is an element and a child of "ul"
  <li>item 2</li> // <- child 2 (same as the above)
</ul>
```

```ts
class MyElement implements MyElementInterface {
  tagName: string;
  private _children: MyElement[] = [];
  private _classList: string[] = [];
  /** For formatting, we need a "depth" property. For each when adding a child to a parent, we need to increment the dept of the child by 1. This is how we will know how many spaces to add before the child element.*/
  private _depth: number = 0;
}
```

Note: when using classes, one doesn't have to create an interface. I like to do that, so it's easy to read which properties and methods are public and which are private.

## Create an element

- Instantiate the `MyElement` class using a constructor function: `new Element(element: string) => Element`

## Formatting the HTML tree

To pretty print the HTML tree, we need to add a certain amount of spaces in front of each element. To know how many spaces, we need to track the depth of each element.

Every time a child element is nested inside the parent element (via the `appendChild` method), we take the parent element’s depth and increment the child element’s depth by one.

E.g. when we pretty print the HTML tree, each element will have depth \* 2 spaces in front of it. This means the first level element will have 0 spaces in front of it, the second level element will have 2 spaces in front of it, the third level element will have 4 spaces in front of it, etc.

![](/readme-images/calculate-depth.svg)

```ts
appendChild = (child: MyElement) => {
  // Increment the dept of the child by taking the current element's depth and adding 1 to it.
  child.depth = this.depth + 1;
  // We are also tracking the parent element of each element. This will help us to traverse to the root element.
  child._parentElement = this;
  this._children.push(child);
  return this;
};
```

Method to print the HTML tree:

```ts
printTree = (): string => {
  let spaces = " ".repeat(this.depth * 2);
  const elementHasChildren = this._children.length > 0;
  const hasClasses = this._classList.size > 0;
  const classes = hasClasses
    ? ` class="${[...this._classList].join(" ")}"`
    : "";
  let string: string = "";

  if (elementHasChildren) {
    const children = this._children.map((child) => child.printTree()).join("");
    // Print start and end tags to different lines.
    string = `${spaces}<${this.tagName}${classes}>\n${children}${spaces}</${this.tagName}>\n`;
  } else {
    // Print the start and end tags to the same line.
    string = `${spaces}<${this.tagName}${classes}></${this.tagName}>\n`;
  }
  return string;
};
```

## Traversing the tree

Implement

- `findFirstChildBFS`
- `findFirstChildDFS`
- `findDescendantBFS`
- `findDescendantDFS`

Check out `main.ts` for how to implement those methods.

## Queue

All BFS methods use a queue data structure. In JavaScript queue is an array where we add items, one after another, and then remove them from the start of the array. It's called first-in-first-out (FIFO). You could think of it as a line of people waiting in the checkout line at the grocery store. The first person in line is the first person to be served.

## Stack

All DFS methods use stack data structure. In JavaScript stack is an array where we add items one after another and then remove them from the end of the array. It's called last-in-first-out (LIFO). You could think of it as a stack of papers. The last paper you put on the stack is the first paper you take off the stack.
