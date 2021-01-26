# SWE-596 Project-1 Documentation
#### *Uğur Gürkan Tosun - 2019719261*

In this project, I developed a navigation system for the educational content in html pages. In addition to this, navigation system a test method was implemented to project. 

## Project Definition

The project documentation and shared projects files provides a folder consisting of content pages in html format. 
The courseStructure.js file is given with content pages. In the courseStructure.js file, course() function return page and concept structure of course.

## General Appearence

![alt text](https://github.com/ugurtosun/EducationPortalNavigationSystem/blob/main/project-ui-design.png?raw=true)

## Supported Features

- In order navigation next, forward, back and previous buttons. With using these buttons, user navigate the html content pages in order to given structure. 
- With using Table of Content section user can directly access any concept and and html page directly. Table of Content could be visible/hidden with ToC button. After the section jumped finished, the navigation system return to where it came from.
- Direct concept call from html pages. This feature is added to provide a functionality similar to an API to content creator. Content creator can add any related concept call from any HTML pages with similar to

    ```HTML
    <button name="callConceptA" class="button" type="button" onclick="callConcept('conceptA')">ConceptA</button>
    ```

    The callConcept([conceptName]) function could be called with existing conceptName

    ```HTML
    callConcept([conceptName]);
    ```

- Stack and current state visualization. With using show/hide visualizaion button at the left bottom corner could be used for visualize nested arrays and page index reminder to understand how system works. 

    ![alt text](https://github.com/ugurtosun/EducationPortalNavigationSystem/blob/main/visualization.png?raw=true)


- Run predefined test cases with triggering from User Interface. In this project, test div of html page is added for easily demonstration of project. In production, this part have to be removed as currentPageIndicator at right bottom of the page.

   ![alt text](https://github.com/ugurtosun/EducationPortalNavigationSystem/blob/main/test.png?raw=true)

## Design & Technical Details

The files which is listed in below added to project; 
    
* courseStructure.html 
* controller.js
* courseStructure.css
* test.js

#### **courseStructure.html**

This html file is the main page as a User Interface. At the top of page there is a header (Welcome text). At the left side there is hiddenable Table of Content div.I used iFrames to show corresponding html pages inside the main html page. At the bottom of iFrame div, the is a control panel which consisting of buttons like

* ToC (Corresponding changing visibility of Table Of Content)
* Back (Coresponding to close current concept stack and continue previous concept. If stack is empty, it returns to first page of main array.)
* Previous (Corresponding to decrease index by 1 in current concept, it has not a functionality to close current stack or concept)
* Next (Corresponding to increase index by 1 in current concept, if it is at end of current concept, it close concept and return previous point where came from)
* Forward (Corresponding to move current index to end page of current concept) 
* Show/Hide Visualization (As mentioned in above, the visualization component is added to project to understand how navigation system works. User can use this button show/hide the visualization component)

At the right bottom corner there is pageIndicator text field to show current page path. When user navigate with buttons and other tools, this text field shows which page is showing. 


#### **controller.js**

In this file javascript functions and one 'Stack' class is defined. The list of functions and class are listed in below;

* callFromTOC(name, parentName, event, indexHolder)
* createList(parent, array, parentName, indexHolder)
* createObjectTOC()
* readConcepts(list, tempArray)
* isAConcept(inputName)
* nextEvent()
* previousEvent()
* forwardEvent()
* backEvent()
* tableOfContentEvent()
* callConcept(conceptName)
* visualizeStack()
* showHideVisualization()
* class Stack

First of all, when courseStructure.html called the readConcepts() method is called to create base pageArray which corresponding to keep order of pages without ToC and concept calls. Then some necessary flags, constants and variable defined from script part of HTML page. Also an empty stack object is initialized from Stack class.

Before the page initilization finished, Table of Content has been created. 

In normal flow of application, the buttons such as next, previous, back, forwads correspond to change value of currentPageNumber variable. According to value of this variable, source of iFrame is changed. So, I handle basic of navigation system with pageArray and currentPageNumber variables. When a concept call or table of content call occur, the new array will be created. The old array and old currentPageNumber are pushed to the stack. 

New array and index holder are created according to concept which is called. And index is set when call from table of content. Then user navigates system within new array with respect to new currentPageNumber variable. When a new concept call occured, the current array and index holder pushed again to stack to remind when user finish new concept or want back to previous concept. 

 
![Image](https://github.com/ugurtosun/EducationPortalNavigationSystem/blob/main/stack.png?raw=true)


#### **courseStructure.css**

This file is used to define and change css attributes of HTML components. 

#### **test.js**

This js file is developed to create automated test cases. 
First four function of this file are defined to test several combinations  next(), previous(), back(), forward(), callConcept() functions. At the end compare the actual page displayed and expected page. 

This project also includes three visibility test cases. At any time of navigation, user can trigger buttonVisibilityTestCase, bubblesVisibilityTestCase and tableOfContentTestCase from User Interface.  

## Important Notes

Because of using iFrames to represent course page HTMLs, the Google Chrome browser restrics with error code; 

```
Uncaught DOMException: Blocked a frame with origin "null" from accessing a cross-origin frame.
```

To prevent from this limitation of my design, we have two options;
* Run google chrome with parameter added command;
    * google-chrome --disable-web-security --user-data-dir="[project_directory]"
* Run simple Python server to prevent using file system. 
    * localhost:9000/courseStructure.html
