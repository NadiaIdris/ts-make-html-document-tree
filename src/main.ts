interface ITag {
  name: string;
  class: string[];
  children: ITag[];
  printTree: () => string;
  addClass: (className: string) => void;
  appendChild: (child: ITag) => void;
}

let spaceCounter = 0
const spaceCounterIncrementer = 2;
const whiteSpace = " ";

// TODO: 6. Add a method or function to traverse our DOM and return the first element by selector
export class Tag implements ITag {
  name: string;
  class: string[] = [];
  children: ITag[] = [];

  constructor(tagName: string) {
    this.name = tagName;
  }

  printTree = (): string => {
    const openingTag = `<${this.name}${this.populateClasses()}>`;
    const closingTag = `</${this.name}>`;
    const children = `${this.populateChildren()}`;

    if (this.children.length === 0) { }

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

  appendChild = (childTag: ITag): void => {
    this.children.push(childTag);
  };

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

  private hasClasses = (): boolean => {
    return this.class.length > 0;
  };
}