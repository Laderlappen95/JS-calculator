/**
 * Se detta som en grund att utgå ifrån.
 * Det är helt fritt att ändra och ta bort kod om ni
 * önskar lösa problemen med andra metoder.
 */

let lcd = null; // displayen
let sifferArray;



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
    //setOperator(btn.substring(0, 1));//VEt ej vad detta är

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
    
}

/**
 * Lägger till decimaltecken
 */
function addComma(comma) {
    let utskrift = lcd.value;
   if(utskrift.includes('.')){
    console.log("den fins redan en koma")
   }
   else{
    lcd.value = lcd.value + comma;
   }
    
}

/**
 * Sparar operator.
 * +, -, *, /
 */
function setOperator(operator) {
    memory = lcd.value;
    clearLCD();
    
    if(operator === 'sub'){
        arithmetic = '-';
    }
    if(operator === 'div'){
        arithmetic = '/';
    }
    if(operator === 'add'){
        arithmetic = '+';
    }
    if(operator === 'mul'){
        arithmetic = '*';
    }
}

/**
 * Beräknar ovh visar resultatet på displayen.
 */
function calculate() {
    if(arithmetic === '+'){ 
       let mem = parseInt(memory);
       let originValue = parseInt(lcd.value);
        lcd.value = mem + originValue;
    }
    else if(arithmetic === '*'){
        lcd.value = memory * lcd.value;
    }
    else if(arithmetic === '-'){
        lcd.value = memory - lcd.value;
    }
    else if(arithmetic === '/'){
        lcd.value = memory / lcd.value;
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
