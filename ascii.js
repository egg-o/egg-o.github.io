function generate() {
    const pet = new Player("B", 2, 'o');
}

class Player {
    constructor(line, pos, symbol) {
        this.line = line; //location from left border
        this.pos = pos; //location from right border
        this.symbol = symbol;
        document.getElementById(line).textContent.charAt(pos) = symbol;
        console.log(pos, line);
    }
    change(symbol) {
        this.symbol = symbol;
    }
    move(oline, opos, nline, npos ) {
    var prev = document.getElementById(nline).textContent;
    var to = document.getElementById(oline).textContent;
    to.charAt(npos) = symbol;
    }
}

generate();
