let spaceCounter = 0;
const spaceCounterIncrementer = 2;
const whiteSpace = " ";

export class Tag {
  name: string;
  class: string[] = [];
  children: Tag[] = [];

  constructor(tagName: string) {
    this.name = tagName;
  }

  private populateClasses = () => {
    if (this.hasClasses()) {
      let classesString = ` class="`;
      this.class.forEach((oneClass, index) => {
        const lastClass = index === this.class.length - 1;
        if (lastClass) return (classesString += `${oneClass}`);
        return (classesString += `${oneClass} `);
      });
      return `${classesString}"`;
    }
    return "";
  };

  private populateChildren = (): string => {
    let childrenString: string = ``;
    this.children.forEach((child) => {
      spaceCounter += spaceCounterIncrementer;
      childrenString += `${child.printTree()}`;
      spaceCounter -= spaceCounterIncrementer;
    });
    return childrenString;
  };

  printTree = (): string => {
    const openingTag = `<${this.name}${this.populateClasses()}>`;
    const closingTag = `</${this.name}>`;
    const children = `${this.populateChildren()}`;

    const tag =
      "\n" +
      whiteSpace.repeat(spaceCounter) +
      openingTag +
      children +
      "\n" +
      whiteSpace.repeat(spaceCounter) +
      closingTag;

    return tag;
  };

  addClass = (classToAdd: string): void => {
    this.class.push(classToAdd);
  };

  appendChild = (childTag: Tag): void => {
    this.children.push(childTag);
  };

  private hasClasses = (): boolean => {
    return this.class.length > 0;
  };
}
// // Case 2: append_child works.
// (function() {
//   // should print '<html class="blue-theme"><body><div></div></body></html>'
//   const html = new Tag("html")
//   html.add_class("blue-theme")
//   const body = new Tag("body")
//   const div = new Tag("div")
//   html.append_child(body)
//   body.append_child(div)
//   expect(html.to_string()).to.equal('<html class="blue-theme"><body><div></div></body></html>')
// })();

// // Case 3: to_string works.
// (function() {
//   //  should print:
//   //  <html class="blue-theme">
//   //    <body>
//   //      <div>
//   //      </div>
//   //    </body>
//   //  </html>
//   const html = new Tag("html")
//   const body = new Tag("body")
//   const div = new Tag("div")
//   html.addClass("blue-theme")
//   html.appendChild(body)
//   body.appendChild(div)
  
//   const expectedStructure = 
// `
// <html class="blue-theme">
//   <body>
//     <div>
//     </div>
//   </body>
// </html>
// `

//   console.log(html.printTree())
//   console.log(expectedStructure)
//   expect(html.printTree()).to.equal(expectedStructure)
// })();