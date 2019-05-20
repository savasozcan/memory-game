const data = [
    {
        type: "cube",
        icon: "<i class='fa fa-cube'></i>",
        popup:'<h4>CUBE</h4>'
    },
    {
        type: "leaf",
        icon: "<i class='fa fa-leaf'></i>",
        popup:'<h4>leaf</h4>'
    },
    {
        type: "bomb",
        icon: "<i class='fa fa-bomb'></i>",
        popup:'<h4>bomb</h4>'
    },
    {
        type: "anchor",
        icon: "<i class='fa fa-anchor'></i>",
        popup:'<h4>anchor</h4>'
    },
    {
        type: "plane",
        icon: "<i class='fa fa-paper-plane-o'></i>",
        popup:'<h4>plane</h4>'
    },
    {
        type: "diamond",
        icon: "<i class='fa fa-diamond'></i>",
        popup:'<h4>diamond</h4>'
    },
    {
        type: "bolt",
        icon: "<i class='fa fa-bolt'></i>",
        popup:'<h4>bolt</h4>'
    },
    {
        type: "bicycle",
        icon: "<i class='fa fa-bicycle'></i>",
        popup:'<h4>bicycle</h4>'
    }
]

let dataMarkup = [];
let dataModal  = [];

for(let i = 0; i < data.length; i++){
    let d = data[i];
    let closeText = 'X';

    let content = '<li id="'+ d.type +'1" class="card" type="'+d.type+'" datatype="try">';
        content += d.icon;
        content+= '</li>';
        dataMarkup.push(content);

        content = '<li id="'+ d.type +'2" class="card" type="'+d.type+'" datatype="try">';
        content += d.icon;
        content+= '</li>';
        dataMarkup.push(content);

        content = '<div class="popup" id="popup_'+ d.type+'">';
        content += '<a class="close" href="#">';
        content += closeText;
        content += '</a>';
        content += '<div class="content-1">';
        content += d.popup;
        content += '</div>';
        content += '</div>';

        console.log(content)

        dataModal.push(content);
}
dataMarkup = shuffle(dataMarkup);

// deck of all cards in game
const deck     = document.getElementById("card-deck");

deck.innerHTML     = dataMarkup.join("");

// cards array holds all cards
let card = document.getElementsByClassName("card");
let cards = [...card];

// declaring move variable
let moves = 0;
let counter = document.querySelector(".moves");

// declare variables for star icons
const stars = document.querySelectorAll(".fa-star");

// declaring variable of matchedCards
let matchedCard = document.getElementsByClassName("match");

 // stars list
 let starsList = document.querySelectorAll(".stars li");

 // close icon in modal
 let closeicons = document.getElementsByClassName("close");

 // declare modal
 // let modal = document.getElementById("popup1");

 // array for opened cardspopup1
var openedCards = [];


// @description shuffles cards
// @param {array}
// @returns shuffledarray
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};


// @description shuffles cards when page is refreshed / loads
document.body.onload = startGame();


// @description function to start a new play 
function startGame(){
 
    // empty the openCards array
    openedCards = [];

    // shuffle deck
    cards = shuffle(cards);
    // remove all exisiting classes from each card
    for (var i = 0; i < cards.length; i++){
        deck.innerHTML = "";
        [].forEach.call(cards, function(item) {
            deck.appendChild(item);
        });
        cards[i].classList.remove("show", "open", "match", "disabled");
    }
    // reset moves
    moves = 0;
    counter.innerHTML = moves;
    // reset rating
    for (var i= 0; i < stars.length; i++){
        stars[i].style.color = "#FFD700";
        stars[i].style.visibility = "visible";
    }
    //reset timer
    second = 0;
    minute = 0;
    hour = 0;
    var timer = document.querySelector(".timer");
    timer.innerHTML = "0 mins 0 secs";
    clearInterval(interval);
}


// @description toggles open and show class to display cards
var displayCard = function (){
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
};


// @description add opened cards to OpenedCards list and check if cards are match or not
function cardOpen() {
    openedCards.push(this);
    var len = openedCards.length;
    if(len === 2){
        moveCounter();
        if(openedCards[0].type === openedCards[1].type){
            matched();
        } else {
            unmatched();
        }
    }
};


// @description when cards match
function matched(){

    console.log(openedCards[0].type)
    let matchedType = openedCards[0].type;
    var matchedTypeData = data.filter(function(element){
        return element.type == matchedType
    })[0];
    console.log(matchedTypeData);
    document.getElementById("popup-text").innerHTML = matchedTypeData.popup;
    document.getElementById("popup_").classList.add("show");
    closeInfoModal();


    openedCards[0].classList.add("match", "disabled");
    openedCards[1].classList.add("match", "disabled");
    openedCards[0].classList.remove("show", "open", "no-event");
    openedCards[1].classList.remove("show", "open", "no-event");
    openedCards = [];
}


// description when cards don't match
function unmatched(){
    openedCards[0].classList.add("unmatched");
    openedCards[1].classList.add("unmatched");
    disable();
    setTimeout(function(){
        openedCards[0].classList.remove("show", "open", "no-event","unmatched");
        openedCards[1].classList.remove("show", "open", "no-event","unmatched");
        enable();
        openedCards = [];
    },1100);
}


// @description disable cards temporarily
function disable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.add('disabled');
    });
}


// @description enable cards and disable matched cards
function enable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.remove('disabled');
        for(var i = 0; i < matchedCard.length; i++){
            matchedCard[i].classList.add("disabled");
        }
    });
}


// @description count player's moves
function moveCounter(){
    moves++;
    counter.innerHTML = moves;
    //start timer on first click
    if(moves == 1){
        second = 0;
        minute = 0;
        hour = 0;
        startTimer();
    }
    // setting rates based on moves
    if (moves > 8 && moves < 12){
        for( i= 0; i < 3; i++){
            if(i > 1){
                stars[i].style.visibility = "collapse";
            }
        }
    }
    else if (moves > 13){
        for( i= 0; i < 3; i++){
            if(i > 0){
                stars[i].style.visibility = "collapse";
            }
        }
    }
}


// @description game timer
var second = 0, minute = 0; hour = 0;
var timer = document.querySelector(".timer");
var interval;
function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML = minute+"mins "+second+"secs";
        second++;
        if(second == 60){
            minute++;
            second=0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
    },1000);
}

function closeInfoModal() {
    for (let i = 0; i < closeicons.length; i++){
        console.log(closeicons[i])
        closeicons[i].addEventListener("click", function () {
            document.getElementById("popup_").classList.remove("show");
            console.log('here')
        })
    }
}

// loop to add event listeners to each card
for (var i = 0; i < cards.length; i++){
    card = cards[i];
    card.addEventListener("click", displayCard);
    card.addEventListener("click", cardOpen);
    // card.addEventListener("click",congratulations);
};
