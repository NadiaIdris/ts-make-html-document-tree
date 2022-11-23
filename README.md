# Pretty print HTML tree

![](/readme-images/pretty-print-html.svg)

## Run app

- In your terminal, go to the root directory of the project and run the following command: `npm install && npm start`

## Test

I have written some sample tests for the app at the bottom of the `main.ts` file. Just uncomment the tests you want to run.

## Task

Design and implement a class that can represent a single HTML element and its children. The class should have the following methods:

- `addClass` - takes a class name and adds it to the element's list of classes
- `printTree` - returns a string representation of the element and its children in HTML format
- `appendChild` - takes an HTML element and adds it to the element's list of children
- `querySelector` - takes an array of two elements (tuple), both CSS selectors. The first selector is the parent element's selector to start searching from and then the second element is the element that we are looking for that has this selector. The method returns the first element that matches the selector.

Other methods you could implement if you'd like:

- `removeClass` - takes a class name and removes it from the element's list of classes
- `getClasses` - returns an array of the element's classes
- `removeChild` - takes an HTML element and removes it from the element's list of children

## Data modeling

We want to see this at the end. This is a formatted string.

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

## Create an element

- Instantiate `MyElement` class using a constructor function: `new Element(element: string) => Element`

## Methods we need to create an html tree

- `addClass` - takes a class name and adds it to the element's list of classes
- `printTree` - returns a string representation of the element and its children in HTML format
- `appendChild` - takes an HTML element and adds it to the element's list of children
- `querySelector` - takes an array of two elements (tuple), both CSS selectors. The first selector is the parent element's selector to start searching from and then the second element is the element that we are looking for that has this selector. The method returns the first element that matches the selector.

## Formatting the HTML tree

To pretty print the HTML tree, we need to add a certain amount of spaces in front of each element. To know how many spaces, we need to track the depth of each element.

Every time a child element is nested inside the parent element (via the `appendChild` method), we take the parent element’s depth and increment the child element’s depth by one.

E.g. when we pretty print the HTML tree, each element will have depth \* 2 spaces in front of it. This means the first level element will have 0 spaces in front of it, the second level element will have 2 spaces in front of it, the third level element will have 4 spaces in front of it, etc.

![](/readme-images/calculate-depth.svg)

```ts
appendChild = (child: MyElement) => {
  // Increment the dept of the child by taking the current element's depth and adding 1 to it.
  child._depth = this._depth + 1;
  this._children.push(child);
  return this;
};
```

Method to print the HTML tree:

```ts
printTree = (): string => {
  let spaces = " ".repeat(this._depth * 2);
  const elementHasChildren = this._children.length > 0;
  const hasClasses = this._classList.length > 0;
  const classes = hasClasses ? ` class="${this._classList.join(" ")}"` : "";
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

6. Add a method or function to traverse our DOM and return the first element by selector

```ruby
# Assume that we've built up this tag heirarchy:
# <html>
#   <body>
#      <div class="main-content">
#        <span class="some-other-content"></span>
#        <p class="some-other-content">
#      </div>
#   </body>
# </html>

# should print '<span class="some-other-content"></span>'
puts tag.query_selector(['main-content', 'some-other-content']).to_s
```
