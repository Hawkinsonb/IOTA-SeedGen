// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

let $ = require('jquery')  // jQuery now loaded and assigned to $
const {clipboard} = require('electron')

var date = new Date()

var walletSeed = ""
var seed

$('#generatebtn').on('click', () => {
    $('#alerts').text("")
    walletSeed = "";    
    var choices = 'abcdefghijklmnopqrstuvwxyz900'.toUpperCase().split('')
    
    for (var i = choices.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = choices[i];
        choices[i] = choices[j];
        choices[j] = temp;
    }
    for(var i = 0; i < 81; i++) {
        //randomize the input

        var count = 0
        var randomTable = ["0"]
        for(var k = 0; k < 6; k++) {
            var x = Array(6).fill(0)
            randomTable[k] = x
            for(var j = 0; j < 6; j++) {
                if(k != 5) {
                    randomTable[k][j] = choices[count]                        
                } else {
                    randomTable[k][j] = "0" //0 says to reroll die
                }
                count++
            }
        }
        var die1 = Math.floor((Math.random() * 10000) + 1) % 5;
        var die2 = Math.floor((Math.random() * 10000) + 1) % 5;;



        var seedChar = randomTable[die1][die2]
        while(seedChar == "0") {
            die1 = Math.floor((Math.random() * 10000) + 1) % 5;
            die2 = Math.floor((Math.random() * 10000) + 1) % 5;;            
            seedChar = randomTable[die1][die2]
        } 
        walletSeed += seedChar
        console.log(i)
        if (i+1 == 81 && walletSeed.length != 81) {
            i--
        }
    }
    console.log(walletSeed);
    if(walletSeed.length == 81) {
        $('#seed').text(walletSeed)
        $('#alerts').text("Successfully generated a seed!")
    } else {
        $('#alerts').text("Failed to generate a seed, please try again...")      
        //should never be hit, however for good measure  
    }
    
}) 

$('#copybtn').on('click', () => {
    if(walletSeed == "") {
        $('#alerts').text("Please generate a seed first")         
    } else {
        clipboard.writeText(walletSeed) 
        $('#alerts').text("Copied to clipboard!") 
    }
}) 