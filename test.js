function runTest(){

}

function expectedPageTestCase1(){

    initializePage();
    callConcept("conceptA");
    callConcept("conceptB");
    callConcept("conceptC");
    callConcept("conceptMixed");
    backEvent();
    nextEvent();
    previousEvent();
    forwardEvent();
    var message = "Expected Page Test Case 1 Result Is ";
    if(checkResult("courseA/chB/secA/d3.html")){
        message += "Pass \n";
    }else{
        message += "Fail \n";
    }
    document.getElementById("textResult").innerText +=  message;
}

function expectedPageTestCase2(){

    initializePage();
    for(let i = 0; i < 5; i++){
        nextEvent();
    }
    callConcept("conceptB");
    previousEvent();
    previousEvent();
    forwardEvent();
    for(let i = 0; i < 5; i++){
        callConcept("conceptMixed");
    }
    callConcept("conceptMixed");
    callConcept("conceptA");
    nextEvent();
    backEvent();
    callConcept("conceptC");
    for(let i = 0; i < 5; i++){
        nextEvent();
    }
    var message = "Expected Page Test Case 2 Result Is ";
    if(checkResult("courseA/chA/secB/c2.html")){
        message += "Pass \n";
    }else{
        message += "Fail \n";
    }
    document.getElementById("textResult").innerText +=  message;
}

function expectedPageTestCase3(){

    initializePage();
    for(let i = 0; i < 10; i++){
        callConcept("conceptMixed");
        nextEvent();
        callConcept("conceptC");
        nextEvent();
        callConcept("conceptB");
        nextEvent();
        callConcept("conceptA");
    }

    for(let i = 0; i < 30; i++){
        nextEvent();
    }

    var message = "Expected Page Test Case 3 Result Is ";
    if(checkResult("courseA/chA/secB/c3.html")){
        message += "Pass \n";
    }else{
        message += "Fail \n";
    }
    document.getElementById("textResult").innerText +=  message;
}

function expectedPageTestCase4(){

    initializePage();
    for(let i = 0; i < 20; i++){
        callConcept("conceptMixed");
    }
    for(let i = 0; i < 20; i++){
        backEvent();
    }
    for(let i = 0; i < 10; i++){
        forwardEvent();
    }

    var message = "Expected Page Test Case 4 Result Is ";
    if(checkResult("courseA/chB/secA/d4.html")){
        message += "Pass \n";
    }else{
        message += "Fail \n";
    }
    document.getElementById("textResult").innerText +=  message;
}

function buttonsVisibilityTestCase(){

    var value = !isHidden(document.getElementById("tocButton")) &&
    !isHidden(document.getElementById("backButton")) &&
    !isHidden(document.getElementById("previousButton")) &&
    !isHidden(document.getElementById("nextButton")) &&
    !isHidden(document.getElementById("forwardButton"));

    var message = "Button Visibility Result Is ";
    if(value){
        message += "Pass \n";
    }else{
        message += "Fail \n";
    }
    document.getElementById("textResult").innerText +=  message;
}

function bubblesVisibilityTestCase(){

    var message = "Bubble Visibility Result Is ";
    if(flagVisual !== isHidden(document.getElementById("navBubbles"))){
        message += "Pass \n";
    }else{
        message += "Fail \n";
    }
    document.getElementById("textResult").innerText +=  message;
}

function tableOfContentTestCase(){
    var message = "Table Of Content Visibility Result Is ";
    if(flagTOC !== isHidden(document.getElementById("toc"))){
        message += "Pass \n";
    }else{
        message += "Fail \n";
    }
    document.getElementById("textResult").innerText +=  message;
}

function isHidden(el) {
    var style = window.getComputedStyle(el);
    return (style.display === 'none')
}

function checkResult(expectedPage){
    return  document.getElementById("pageIndicator").innerText === expectedPage;
}

function initializePage(){

    for(let i = 0; i < 30; i++){
        backEvent();
    }
}



