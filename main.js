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
            let locations = ship.locations;
            let index = locations.indexOf(guess);
            // the indexOf method searches an array for a matching value, and returns its index or -1 if it can't find it
            if (index >= 0) {
                ship.hits[index] = "hit";
                return true;
            }
        }

        return false;
    }
}