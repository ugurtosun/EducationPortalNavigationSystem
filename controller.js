function callFromTOC(name, parentName, event, indexHolder){

    if(name.includes("concept")){
        myStack.push(array);
        myStack.push(currentPageNumber);
        var tempArray = eval(name + '();').arrPage;
        var array2 = [];
        readConcepts(tempArray, array2)
        array = array2;
        currentPageNumber = -1;
    }else if(parentName.includes("concept")){
        myStack.push(array);
        myStack.push(currentPageNumber);
        var tempArray = eval(parentName + '();').arrPage;
        var array2 = [];
        readConcepts(tempArray, array2)
        array = array2;
        currentPageNumber = indexHolder - 2;
    }
    if(event != null){
        event.stopPropagation();
    }
    nextEvent();
}

function createList(parent, array, parentName, indexHolder) {

    array.forEach(function (o) {
        var li = document.createElement("li"),
            ul;

        if(o.name.includes("Table") || parentName.includes("Table")){
            indexHolder = 0;
        }else{
            indexHolder++;
        }

        if(!o.name.includes("Table")){
            li.setAttribute("class", "li_s");
        }

        a = document.createElement(o.name.split(" ")[0].split("/")[0]);
        a.innerText = o.name;
        li.appendChild(a);
        li.setAttribute("orderID", indexHolder);

        if(!o.name.includes("Content")) {
            li.addEventListener("click", function () {
                callFromTOC(o.name, parentName, event, li.getAttribute("orderID"));
            }, false)
        }
        parent.appendChild(li);
        if (o.nest) {
            ul = document.createElement("ul");
            li.appendChild(ul);
            createList(ul, o.nest, o.name, indexHolder);
        }
    });
}

function createObjectTOC(){

    var conceptList = course();
    var object = "{ \"name\": \"Table Of Contents\", \"nest\": [";


    for(let i = 0; i < conceptList.arrConcept.length; i++) {

        var a = conceptList.arrConcept[i];
        a = a.substr(1);
        var newList = eval(a + '();').arrPage;

        object += "{ \"name\": \"" + a + "\", \"nest\": [";

        for (let j = 0; j < newList.length; j++) {

            if(newList[j].charAt(0) === '*'){
                newList[j] = newList[j].substr(1);
            }

            object += "{ \"name\": \"" + newList[j] + "\"}"
            if (j !== newList.length - 1) {
                object += ",";
            }
        }
        object += "]}";

        if (i !== conceptList.arrConcept.length - 1) {
            object += ",";
        }
    }
    object += "]}";

    return JSON.parse(object);
}

function readConcepts(list, tempArray){

    for(let i = 0 ; i < list.length; i++){

        if(isAConcept(list[i])){
            var a = list[i];
            a = a.substr(1);
            var newList = eval(a + '();').arrPage;
            tempArray.concat(readConcepts(newList, tempArray));
        }else{
            tempArray.push(list[i]);
        }
    }
    return tempArray;
}

function isAConcept(inputName){
    return inputName.charAt(0) === '*';
}

function nextEvent(){
    if(currentPageNumber !== array.length-1){
        currentPageNumber++;
        document.getElementById("currentPage").src = "courseA/" + array[currentPageNumber];
        document.getElementById("pageIndicator").innerText = "courseA/" + array[currentPageNumber];
    }else if(!myStack.isEmpty()){
        currentPageNumber = myStack.pop();
        array = myStack.pop();
        nextEvent();
    }else {
        document.getElementById("currentPage").src = "courseA/" + array[currentPageNumber];
        document.getElementById("pageIndicator").innerText = "courseA/" + array[currentPageNumber];
    }
    visualizeStack();
}

function previousEvent(){
    if(currentPageNumber !== 0){
        currentPageNumber--;
        document.getElementById("currentPage").src = "courseA/" + array[currentPageNumber];
        document.getElementById("pageIndicator").innerText = "courseA/" + array[currentPageNumber];
    }
    visualizeStack();
}

function forwardEvent(){
    currentPageNumber = array.length-1;
    document.getElementById("currentPage").src = "courseA/" + array[currentPageNumber];
    document.getElementById("pageIndicator").innerText = "courseA/" + array[currentPageNumber];
    visualizeStack();
}

function backEvent(){

    if(!myStack.isEmpty()){
        currentPageNumber = myStack.pop();
        array = myStack.pop();
        nextEvent();
    }
    else if(currentPageNumber !== 0){
            currentPageNumber = 0;
            document.getElementById("currentPage").src = "courseA/" + array[currentPageNumber];
            document.getElementById("pageIndicator").innerText = "courseA/" + array[currentPageNumber];
    }else {
        document.getElementById("currentPage").src = "courseA/" + array[currentPageNumber];
        document.getElementById("pageIndicator").innerText = "courseA/" + array[currentPageNumber];
    }
    visualizeStack();
}

function showHideTestTable(){

    if(flagTest !== true){
        if(flagTOC === true){
            tableOfContentEvent();
        }
        document.getElementById("testTable").style.display = "inline";
        document.getElementsByClassName("iFrame")[0].style.width = "80%";
        flagTest = true;
    }else{
        document.getElementById("testTable").style.display = "none";
        document.getElementsByClassName("iFrame")[0].style.width = "100%";
        flagTest = false;
    }
}

function tableOfContentEvent(){

    if(flagTOC !== true){
        if(flagTest === true){
            showHideTestTable();
        }
        document.getElementById("toc").style.display = "inline";
        document.getElementsByClassName("iFrame")[0].style.width = "80%";
        flagTOC = true;
    }else{
        document.getElementById("toc").style.display = "none";
        document.getElementsByClassName("iFrame")[0].style.width = "100%";
        flagTOC = false;
    }
}

function callConcept(conceptName){
    parent.callFromTOC(conceptName,null,event,0);
}

function visualizeStack(){

    var stackInfo = myStack.data;
    var arrayInfo = array;
    var currentPageNumberInfo = currentPageNumber;

  //  for(let i = 0; i < stackInfo.length; i++){
  //      console.log(stackInfo[i]);
  //  }

    if(document.getElementById("navBubbles") != null){
        document.getElementById("navBubbles").remove();
    }
    const navBubbles = document.createElement("div");
    navBubbles.setAttribute("id", "navBubbles");

    for(let i = 0; i < stackInfo.length; i++) {
        var rows = document.createElement("div");
        rows.classList.add("bubbles");

        for (let j = 0; j < stackInfo[i].length; j++) {
            var columns = document.createElement("div");
            columns.classList.add("target");

            if(j === stackInfo[i+1]){
               columns.classList.add("bubbleIndicator");
            }
            rows.appendChild(columns);
        }
        navBubbles.appendChild(rows)
    }

    rows = document.createElement("div");
    rows.classList.add("bubbles");

    for(let i = 0; i < arrayInfo.length; i++){
        var columns = document.createElement("div");
        columns.classList.add("target");

        if(i === currentPageNumberInfo){
            columns.classList.add("bubbleCurrentIndicator");
        }
        rows.appendChild(columns);
    }
    navBubbles.appendChild(rows)

    document.body.appendChild(navBubbles);

    if(flagVisual === false){
        document.getElementById("navBubbles").style.display = "none";
    }else{
        document.getElementById("navBubbles").style.display = "inline";
    }

}

function showHideVisualization(){
    if(flagVisual === true){
        document.getElementById("navBubbles").style.display = "none";
        flagVisual = false;
    }else{
        document.getElementById("navBubbles").style.display = "inline";
        flagVisual = true;
    }
}

class Stack {
    constructor(){
        this.data = [];
        this.top = 0;
        this.index = 0;
    }
    push(element) {
        this.data[this.top] = element;
        this.top = this.top + 1;
    }
    length() {
        return this.top;
    }
    peek() {
        return this.data[this.top-1];
    }
    isEmpty() {
        return this.top === 0;
    }
    pop() {
        if( this.isEmpty() === false ) {
            this.top = this.top -1;
            return this.data.pop();
        }
    }
    print() {
        var top = this.top - 1;
        while(top >= 0) { 
            top--;
        }
    }
    reverse() {
        this._reverse(this.top - 1 );
    }
    _reverse(index) {
        if(index != 0) {
            this._reverse(index-1);
        }
        console.log(this.data[index]);
    }
}
