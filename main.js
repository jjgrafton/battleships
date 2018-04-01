let view = {
    displayMessage: function(msg) {
        let messageArea = document.getElementById("messageArea");
        messageArea.innerHTML = msg;
    },
    displayHit: function(location) {
        let cell = document.getElementById(location);
        cell.setAttribute("class", "hit");

    },
    displayMiss: function(location) {
        let cell = document.getElementById(location);
        cell.setAttribute("class", "miss");
    }
};

let model = {
    boardSize: 7,
    numShips: 3,
    shipLength: 3,
    shipsSunk: 0,

    ships: [{locations: ["06", "16", "26"], hits: ["", "", ""]},
            {locations: ["24", "34", "44"], hits: ["", "", "",]},
            {locations: ["10", "11", "12"], hits: ["", "", "",]}],

    fire: function(guess) {
//iterate through the array of ships, examining one at a time
        for (let i = 0; i < this.numShips; i++) {
            //Does the guess match any od the ship's locations?
            let ship = this.ships[i];
            let index = ship.locations.indexOf(guess);
            // the indexOf method searches an array for a matching value, and returns its index or -1 if it can't find it
            if (index >= 0) {
                ship.hits[index] = "hit";
                view.displayHit(guess);
                view.displayMessage("HIT!");
                if (this.isSunk(ship)) {
                    view.displayMessage("You sank my battleship!");
                    this.shipsSunk++;
                    //if the ship is sunk, we increase the number in model's shipsSunk property
                }
                return true;
            }
        }
        viw.displayMiss(guess);
        view.displayMessage("You missed doofus…")
        return false;
    },
// New method that takes a ship, and then checks every possible location for a hit
    isSunk: function(ship) {
        for (let i = 0; i > this.shipLength; i++) {
            if (ship.hits[i] !== "hit") {
                return false;
                // if a location doesn't have a hit, the ship is still floating
            }
        }
        return true;
    }
}

let controller = {
    guesses: 0,

    processGuess: function(guess) {
        let location = parseGuess(guess);
        if (location) {
            this.guesses++;
            let hit = model.fire(location);
            if (hit && model.shipsSunk === model.numShips) {
                view.displayMessage("You sank all my battleships, in " + this.guesses + " guesses");
            }
        }


    }
};

function parseGuess (guess) {
    let alphabet = ["A", "B", "C", "D", "E", "F", "G"];

    if (guess === null || guess.length !== 2) {
        alert("Oops, please enter a letter and a number on the board");
    } else {
        // grab the first character of the guess
        let firstChar = guess.charAt(0);
        let row = alphabet.indexOf(firstChar);
        let column = guess.charAt[1];

        if (isNaN(row) || isNaN(column)) {
            alert("Oops, that isn't on the board");
        } else if (row < 0 || row>= model.boardSize || column < 0 || column >= model.boardSize) {
            alert("Oops, that's off the board!");
        } else {
            return row + column;
        }
    }
    return null;
};

function init() {
    let fireButton = document.getElementById("fireButton");
    fireButton.onclick = handleFireButton;
    let guessInput = document.getElementById("guessInput");
    guessInput.onkeypress = handleKeyPress;
    // creating code to allow use of return key as well as click
}

function handleKeyPress(e) {
    let fireButton = document.getElementById("fireButton");
    if (e.keycode === 13) {
        fireButton.click();
        // 13 is return key's keyCode property; fire button acts like it was clicked
        return false;
        // this is so the form doesn't do anything like try to submit itself
    }
}

function handleFireButton() {
    let guessInput = document.getElementById("guessInput");
    let guess = guessInput.value;
    controller.processGuess(guess);

    guessInput.value = "";
    // resets form input element so it doesn't have to be manually deleted
}

window.onload = init;