# Project-1 swe596 2020 Fall by bingol

v2020-11-19
v2020-12-17

## due Dec 18, 2020 by Moodle


# Description

Develop 
- a navigation system for educational content in html pages.
- A testing method to test the developed navigation ssytem.

# Specification
 
- Similar to powerpoint presentation, 
the system should enable forward and backward move within the pages.
- It should be possible to revisit a concept, and come back to where it is left.



## Content pages

Content pages are in html format. 
The organization of the content is in sections under chapters.
The file structure is similar to the figure given below.

```
course 
|- chA
|  |- secA
|  |  |- p1.html
|  |  |- p2.html
|  |  |- ...
|  |  |- pN.html
|  |- secB
|  |  |- c1.html
|  |  |- c2.html
|  |  |- ...
|  |  |- cN.html
|- chB
|  |- secA
|  |  |- d1.html
|  |  |- d2.html
|  |  |- ...
|  |  |- dN.html
|  ...
```

Note that you cannot assume anything about the internal structure of the html pages.

## Concept definition

A concept is a number of html pages.
It is given in this javascript format.

```javascript
const conceptMixed = function () {
    return {
        "id": "conceptA",
        "arrPage": [
            'chA/secA/p1.html',
            'chB/secA/d1.html',
            'chA/secA/p2.html',
            '*conceptB',
            'chB/secA/d4.html'
        ]
    }
}
```

In `arrPage` the order of presentation is given. 
That is, page `chA/secA/p1.html` is presented first, then page `chB/secA/d1.html`.
Note that `*conceptB` is not a page but a call to `conceptB()`, which is defined as

```javascript
const conceptB = function () {
    return {
        "id": "conceptB",
        "arrPage": [
            'chA/secB/c1.html',
            'chA/secB/c2.html',
            'chA/secB/c3.html'
        ]
    }
}
```

The result of call to `conceptMixed()` is the following order of presentation:

1. `chA/secA/p1.html`
1. `chB/secA/d1.html`
1. `chA/secA/p2.html`
1. `chA/secB/c1.html`
1. `chA/secB/c2.html`
1. `chA/secB/c3.html`
1. `chB/secA/d4.html`

Note that a course always starts with a call to `course()`.



## `courseStructure.js`

Concept definitions such as `course()` and `conceptA` are given in file `courseStructure.js`.
So your system will read `courseStructure.js`, starts with `course()` and navigates accordingly.

# Deliverables

- Entire code.
- Documentation explaining how the system works.
- Testing cases with related documentation.

# Bonus points

- So far we considered html pages as black box.
There is a need to call a concept within html page.
If your navigation supports such calls, you get 20% bonus points.
- If your system support direct jump to any topic by means of table of content, you get 20% bonus points. Ofcourse after the jumped concept terminates, the navigation should return back to where it was before the jump.

