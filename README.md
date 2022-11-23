# Print HTML tree

Design and implement a class (or other data structure) that can represent a single HTML element and its children. The class should have the following methods:

- `addClass` - takes a class name and adds it to the element's list of classes
- `toString` - returns a string representation of the element and its children in HTML format
- `appendChild` - takes an HTML element and adds it to the element's list of children
- `querySelector` - takes an array of two elements (tuple), both CSS selectors. First selector is the parent element's selector to start searching from and then second element is the element that we are looking for that has this selecor. The method returns the first element that matches the selector.

Other methods you could implement if you'd like:

- `removeClass` - takes a class name and removes it from the element's list of classes
- `getClasses` - returns an array of the element's classes
- `removeChild` - takes an HTML element and removes it from the element's list of children

## Run app

- In your termainal, go to the root directory of the project and run the following command: `npm install && npm start`

## Run tests

- Run all tests continuously: `npx jest --watchAll`
- Run all tests once: `npm jest`

# HTML Tag Exercise

In this exercise you'll implement a class or data structure to represent HTML tags, their attributes, and the hierarchical structure of an HTML document.

## Steps

**NOTE: Examples are written in Ruby**

1. Design and implement a class (or other data structure) that can represent a single HTML tag

```ruby
Tag.new("div")
```

2. Write a function or method that can return the HTML string representation of a tag.

```ruby
# should print "<html></html>"
puts Tag.new("html").to_s
```

3. Write a function or method that can add a class to a tag, and account for classes in your HTML string generation logic.

```ruby
# should print '<html class="blue-theme"></html>'
tag = Tag.new("html")
tag.add_class("blue-theme")
puts tag.to_s

# should print '<html class="blue-theme main-content"></html>'
tag.add_class("main-content")
puts tag
```

4. Extend the tag data structure to allow the addition of child tags, and account for children in your HTML string generation logic.

```ruby
# should print '<html class="blue-theme"><body><div></div></body></html>'
tag = Tag.new("html")
body_tag = Tag.new("body")
div_tag = Tag.new("div")
tag.append_child(body_tag)
body_tag.append_child(div_tag)
puts tag
```

5. Implement pretty-printing for the HTML output. The output should have reasonable indentation and newlines.

```ruby
# should print:
# <html class="blue-theme">
#   <body>
#     <div></div>
#   </body>
# </html>
tag = Tag.new("html")
body_tag = Tag.new("body")
div_tag = Tag.new("div")
tag.append_child(body_tag)
body_tag.append_child(div_tag)
puts tag
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
