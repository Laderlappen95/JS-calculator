/**
 * Se detta som en grund att utgå ifrån.
 * Det är helt fritt att ändra och ta bort kod om ni
 * önskar lösa problemen med andra metoder.
 */

let lcd = null; // displayen
let hiddenLCD = null; //gömd display, till för uträckningarna


let memory = 0; // Lagrat/gamlat värdet från display
let arithmetic = null; // Vilken beräkning som skall göras +,-, x eller /

function init() {
    lcd = document.getElementById('lcd');

    let keyBoard = document.getElementById('keyBoard')
    keyBoard.onclick = buttonClick;
}

/**
 * Händelsehanterare för kalkylatorns tangentbord
 */
function buttonClick(e) {
    let btn = e.target.id; //id för den tangent som tryckte ner


    // kollar om siffertangent är nedtryckt
    if (btn.substring(0, 1) === 'b') {
        digit = btn.substring(1, 2); // plockar ut siffran från id:et
        addDigit(digit);
    }
    else if (btn.substring(1, 2) === 'o') {
        addComma('.');
    }
    else if (btn.substring(0, 1) === 'c') {
        clearLCD();
    }
    else if (btn.substring(0, 1) === 'e') {
        calculate();
    }
    else { // Inte en siffertangent, övriga tangenter.
        setOperator(btn);
    }

}


/**
 *  Lägger till siffra på display.
 */
function addDigit(digit) {
    lcd.value = lcd.value + digit;
    hiddenLCD.value += digit;

}

/**
 * Lägger till decimaltecken
 */
function addComma(comma) {
    let utskrift = lcd.value;
    if (utskrift.includes('.')) {
        console.log("den fins redan en koma")
    }
    else {
        lcd.value = lcd.value + comma;
        hiddenLCD.value += comma;
    }

}
// function addOperator(operator){
//     lcd.value += operator;
// }

/**
 * Sparar operator.
 * +, -, *, /
 */
function setOperator(operator) {
    memory = lcd.value;
    clearLCD();

    if (operator === 'sub') {
        arithmetic = '-';
        addOperator("-");
    }
    if (operator === 'div') {
        arithmetic = '/';
        addOperator("/");
    }
    if (operator === 'add') {
        arithmetic = '+';
        addOperator("+");
    }
    if (operator === 'mul') {
        arithmetic = '*';
        addOperator("*");
    }
}

function avrundaTillDecimaltal(tal, decimalplatser) {
    var faktor = Math.pow(10, decimalplatser);
    return Math.round(tal * faktor) / faktor;
}


/**
 * Beräknar ovh visar resultatet på displayen.
 */
function calculate() {
    let decAmount = 0;
    while (memory % 1 != 0 || lcd.value % 1 != 0) {
        lcd.value *= 10;
        memory *= 10;
        decAmount++;
    }
    if (arithmetic === '+') {
        lcd.value = (+memory + +lcd.value) / Math.pow(10, decAmount);
    }
    else if (arithmetic === '-') {
        lcd.value = +memory - +lcd.value / Math.pow(10, decAmount);
    }
     else if (arithmetic === '*') {
         lcd.value = +memory * +lcd.value / Math.pow(10, 2 * decAmount);
     }
     else if (arithmetic === '/') {
         lcd.value = +memory / +lcd.value
     }
 
    
}





/** Rensar display */
function clearLCD() {
    lcd.value = '';
    isComma = false;
}

/** Rensar allt, reset */
function memClear() {
    memory = 0;
    arithmetic = null;
    clearLCD();
}

window.onload = init;
