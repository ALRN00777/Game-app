/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// Lecture first DOM Access and Manipulation

var scores, roundScore, activePlayer, gamePlaying;

init();
/*
//Due to DRY principle, we will remove it below and just add the function which is defined all the way at the end
scores = [0,0]; //stores scores for both the players
roundScore = 0; //
activePlayer = 0; //stores the active player
*/
//dice = Math.floor(Math.random() * 6) + 1; //gives random integer

//DOM starts here, docuument object will give access to the DOM
//'querySelector' will be used to select elements from our webpage like CSS

// 'current-' has been used to change the content of HTML here
// Two ways to change the content of the selection: innerHTML method & textContent
// document.querySelector('#current-' + activePlayer).textContent = dice; 
// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

//setter: when we set a value.
//getter: when we get a value.

//var x = document.querySelector('#score-0').textContent; //to read the value or content
// of the element with this id 'score 0' and store it to variable x. 'score-0' is 43 so on the window it'll show 43
//console.log(x);

// We can use the querySelector to change the CSS of some element 
//querySelector is to select the elements

//STEP BY STEP CODE EVALUATION

//KEEP IN MIND, the whole lecture is about this!!! 
//select something using query selesctor and do SOMETHING with that selection that the query selector method RETURNS.

//document object (querySelector), which will return a selection
//then selected the class '.dice', use the style method 
//and then the CSS property is slelected 
//CSS property's value is changed to 'none' to remove the dice
//document.querySelector('.dice').style.display = 'none';

// Lecture: Events and Events Handling: Rolling the Dice

//ony for Ids we use the 'getElementById' method, for IDs which is faster instead of using querySelector all the time
/*document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';
this has been greyed out because of the dry principle which is included in "init function"(last lecture finishing steps*/


document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying) {

   	//Got this code down there after "next player() line"	
	var dice = Math.floor(Math.random() * 6) + 1;

		var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

	if (dice !== 1) {
 	roundScore += dice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
 	//Next Player
          nextPlayer();
        }
    }    
});



/* greying this area because we want to have this in the if statement on top^^
 // 1. Random number
 var dice = Math.floor(Math.random() * 6) + 1;

 // 2. Display the result
 var diceDOM =  document.querySelector('.dice');
 diceDOM.style.display = 'block';
 diceDOM.src = 'dice-' + dice + '.png';
 
 
 // Lecture Updating Scores and Changing the Active Player
 

 // 3. Update the round score if the rolled number not equal 1
 
 if (dice !== 1) {
 	//Add score
 	roundScore += dice;
 	document.querySelector('#current-' + activePlayer).textContent = roundScore;

 } else {
 	//Next Player
 nextPlayer ();

 }

});
*/
//TERNARY OPERATOR:-
/* Greying this area out because I am using DRY principle instead repeating the whole thing below. 
	the function will do the same thing but by not repeating the same thing which is 'nextPlayer ();''
 	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; //means if activePlayer is 0, then activePlayer will be 1. else activePlayer is 0
 	roundScore = 0;

 	document.getElementById('current-0').textContent = '0';
 	document.getElementById('current-1').textContent = '0';

 	document.querySelector('.player-0-panel').classList.toggle('active');
 	document.querySelector('.player-1-panel').classList.toggle('active');

 	//document.querySelector('.player-0-panel').classList.remove('active');
 	//document.querySelector('.player-1-panel').classList.add('active');
 	
 	document.querySelector('.dice').style.display = 'none';
*/
 

// Lecture: Implementing our hold function and the DRY principle
/* THings that wil be covered in this lesson:
- How to use functions to correctly apply the DRY principle;
- How to think about the game logic like a programmer. */

 
document.querySelector('.btn-hold').addEventListener('click', function() {

if (gamePlaying) { //This line means, if the game is playing the do the stuff below

// Add current score to Global Score
	scores[activePlayer] += roundScore;

//Update the UI
	document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

//Check if player has won the game
	if (scores[activePlayer] >= 100) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
 } else {
//Next Player
            nextPlayer();
        }
    }
});


/* greying this area because we want to have this in the if statement on top^^
//Add current score to Global Score
scores[activePlayer] += roundScore; //Score the player already had + score we got in this very round
// above code same as ---> scores[activePlayer] = scores[activePlayer] + roundScore;

//Update the UI
document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
// this holds the score and toggles to another player


//Check if player won the game    <---- ALMOST FINISHING STEP OF THE PROJECT ---->

if (scores[activePlayer] >= 20) {
	document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
	document.querySelector('.dice').style.display = 'none';
	document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
	document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
	gamePlaying = false;

} else {
	nextPlayer ();
}

//Next player
*/


function nextPlayer() {
activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; //means if activePlayer is 0, then activePlayer will be 1. else activePlayer is 0
roundScore = 0;

 	document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

 	
// toggle means to add the class if the class is not there and if its already there then it removes it
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
 	
 	document.querySelector('.dice').style.display = 'none';

}

// Lecture: Creating a game initializtion function

//when clicking the new game it should reset to zero
document.querySelector('.btn-new').addEventListener('click', init); /* this is to
tell the event listener when someone clicks this button then please call the init function for me*/
function init() {
	scores = [0, 0];
	activePlayer = 0;
	roundScore = 0;
	gamePlaying = true;

	document.querySelector('.dice').style.display = 'none';


	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2';
// These lines come in effect when the new game is clicked then the scores go
//back to 0 and player 1 & 2 are also reset

	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.add('active');

}

// Lecture: State Variables
//State variable tells us the condition of the system, we need state variable
// when we need to remember something or state something
//All the functions have access to the global scope or the scope of their parents