/*620079694
Info 2180 - Project 2
15 Puzzle Piece
*/




window.onload = function() {
    var puzzlearea = document.getElementById("puzzlearea");
    var Shuffle = document.getElementById("shufflebutton");

    //counter of steps
    var steps = 0;

    //time of use
    var time = 0;
    
    var reset = false;
  
    var T;
    var timer; 
    var blink;

    //display pic area
    var display = document.createElement("div");
    document.getElementById("overall").appendChild(display);
    display.style.position = "absolute";
    display.style.top = "250px";
    display.style.left = "50px";
    display.style.width = "150px";
    display.style.height = "150px";
    display.style.backgroundSize = "100% 100%";
    display.style.backgroundImage = "url('background.jpg')";



    var controls = document.getElementById("controls");

    //Create blank
    var blank = document.createElement("div");
    puzzlearea.appendChild(blank);
    var puzpie = puzzlearea.children;
    setposition(puzpie);

    //Create a select button
    var select_button = document.createElement("select");
    for (var i = 1; i <= 4; i++) {
        var options = document.createElement("option");
        options.value = "background" + i + ".jpg";
        options.text = "background" + i;
        select_button.appendChild(options);
    };
    controls.appendChild(select_button);

    //Create show time area & steps counter area
    var timearea = document.createElement("button");
    var stepsarea = document.createElement("button");
    timearea.innerHTML = "Time: 0s";
    stepsarea.innerHTML = "Steps: 0";
    controls.appendChild(timearea);
    controls.appendChild(stepsarea);

    //Select pic
    function selectpic() {
        for (var i = 0; i < puzpie.length; i++) {
            puzpie[i].style.backgroundImage = "url(" + select_button.value + ")";
        }
        clearTimeout(T);
        steps = 0;
        time = 0;
        timearea.innerHTML = "Time: 0s";
        stepsarea.innerHTML = "Steps: 0";
        display.style.backgroundImage = "url(" + select_button.value + ")";
    };

    //Set piece and blank
    function setposition() {
        for (var i = 0; i < puzpie.length; i++) {
            puzpie[i].classList.add("puzzlepiece");
            var x = Math.floor(i/4)*100;
            var y = Math.floor(i%4)*100;
            puzpie[i].style.top = x + "px";
            puzpie[i].style.left = y + "px";
            puzpie[i].style.backgroundPosition = "-" + y + "px -" + x + "px";
        }
        puzpie[puzpie.length-1].style.visibility = "hidden";
    };

    // Move piece
    function isvalid(test) {
        if (test.style.top == blank.style.top &&
            Math.abs(parseInt(test.style.left)-parseInt(blank.style.left)) == 100 ||
            test.style.left == blank.style.left &&
            Math.abs(parseInt(test.style.top)-parseInt(blank.style.top)) == 100)
            return true;
        return false;
    };

    //Highlights
    function lighton() {
        if (isvalid(this))
            this.classList.add("movablepiece");
    };

    //Removes
    function lightoff() {
        this.classList.remove("movablepiece");
    };

    //Exchanges two div
    function swop(div1, div2) {
        var top = div1.style.top;
        var left = div1.style.left;
        div1.style.top = div2.style.top;
        div1.style.left = div2.style.left;
        div2.style.top = top;
        div2.style.left = left;
    };

    //Click
    function clickmove() {
        if (isvalid(this)) {
            if (steps == 0) {
                timer();
            }
            swop(this, blank);
            steps++;
            stepsarea.innerHTML = "Steps: " + steps;
            winner();
        }
    };

    //Resets puzzle
    function shuffle() {
        for (var i = 0; i < 500; i++) {
            var test = Math.floor(Math.random() * 16);
            if (isvalid(puzpie[test])) {
                swop(puzpie[test], blank);
            }
        }
        clearTimeout(T);
        steps = 0;
        time = 0;
        timearea.innerHTML = "Time: 0s";
        stepsarea.innerHTML = "Steps: 0";
        reset = true;
    };

    //Finshed or not
    function complete() {
        for (var i = 0; i < puzpie.length; i++) {
            if (puzpie[i].style.top != Math.floor(i/4)*100 + "px" ||
                puzpie[i].style.left != Math.floor(i%4)*100 + "px")
                return false;
        }
        return true;
    };

    //Timer
    function timer() {
        timearea.innerHTML = "Time: " + time + "s";
        time++;
        T = setTimeout(timer, 1000);
    };

    function Blink()
{
    blink --;
    if (blink == 0)
    {
        var body = document.getElementsByTagName('body');
        body[0].style.backgroundColor = "#FFFFFF";
        return;
    }
    if (blink % 2)
    {
        var body = document.getElementsByTagName('body');
        body[0].style.backgroundColor = "#00FF00";  
    }
    else
    {
        var body = document.getElementsByTagName('body');
        body[0].style.backgroundColor = "#FF0000";
    }
    timer = setTimeout(Blink, 100);
}



    //If won
    function winner() {
        if (complete() && reset) {
            clearTimeout(T);
            var body = document.getElementsByTagName('body');
            body[0].style.backgroundColor = "#FF0000";
            blink = 10;
            timer = setTimeout(Blink, 100);
            alert("Congratulations :}! You finish in " + (time - 1) +"s in " + steps + " steps");
            reset = false;
        }
    };

     //When game starts
    for (var i = 0; i < puzpie.length; i++) {
        puzpie[i].onmouseover = lighton;
        puzpie[i].onmouseout = lightoff;
        puzpie[i].onclick = clickmove;
        puzpie[i].style.transition = "all 0.4s";
    };
    Shuffle.onclick = shuffle;
    select_button.onchange = selectpic;
}