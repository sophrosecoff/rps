var human = []

var computer = []

var state = "start"

var computerscore = 0

var humanscore = 0

var gamemode = Math.floor(Math.random() * 2); //0 = random, 1 = smart

// start, countdown 3, countdown 2, countdown 1, play, score, finish 

function render(){
	document.getElementById('playbutton').disabled = state != "start";

	//countdown
	if (state == "countdown 3") {
		document.getElementById('countdown').innerHTML = "3";
	}
	else if (state == "countdown 2") {
		document.getElementById('countdown').innerHTML = "2";
	}
	else if (state == "countdown 1") {
		document.getElementById('countdown').innerHTML = "1";
	}
	else if (state == "play") {
		document.getElementById('countdown').innerHTML = "GO";
	}
	else {
		document.getElementById('countdown').innerHTML = "";
	}

	document.getElementById('rockbutton').disabled = state != "play" ;
	document.getElementById('paperbutton').disabled = state != "play" ;
	document.getElementById('scissorsbutton').disabled = state != "play" ;

	if (state == "score" && human[human.length - 1] == "rock"){
		document.getElementById('rockbutton').className = "played";
	} 
	else {
		document.getElementById('rockbutton').className = "";
	}

	if (state == "score" && human[human.length - 1] == "paper"){
		document.getElementById('paperbutton').className = "played";
	} 
	else {
		document.getElementById('paperbutton').className = "";
	}

	if (state == "score" && human[human.length - 1] == "scissors"){
		document.getElementById('scissorsbutton').className = "played";
	} 
	else {
		document.getElementById('scissorsbutton').className = "";
	}
	

	if (state == "score"){
		var humanwin = winnerwinnerchickendinner(human[human.length - 1], computer[computer.length - 1]);

		var compclass = computer[computer.length - 1];

		var humanclass = human[human.length - 1];

		if (compclass == humanclass) {
			compclass += " tie";
			humanclass += " tie";
		} else if (winnerwinnerchickendinner(humanclass, compclass)) {
			compclass += " lose";
			humanclass += " win";
		} else {
			compclass += " win";
			humanclass += " lose";
		}

		document.getElementById("compplay").className = compclass;
		document.getElementById("humanplay").className = humanclass;
	} else {
		document.getElementById("compplay").className = "";
		document.getElementById("humanplay").className = "";
	}

	//colculate sore
	humanscore = 0;

	computerscore = 0;

	for (var i = 0; i < human.length; i ++){
		if (human[i] != computer[i]){
			if (winnerwinnerchickendinner(human[i], computer[i])){
				humanscore ++;
			}
			else {
				computerscore ++;
			}
		}
		
	}
	document.getElementById("computerscore").innerHTML = computerscore;
	document.getElementById("humanscore").innerHTML = humanscore;

	if (state == "finish"){
		if (humanscore > computerscore){
			document.getElementById("endgame").innerHTML = "You Win!"
		}
		else {
			document.getElementById("endgame").innerHTML = "You Lose!"
		}
	}
	else {
		document.getElementById("endgame").innerHTML = ""
	}
}

function winnerwinnerchickendinner(human, computer){
	if (human == "rock"){
		return computer == "scissors";
	}
	if (human == "paper"){
		return computer == "rock";
	}
	if (human == "scissors"){
		return computer == "paper";
	}
}

function startcountdown(){
	state = "countdown 3";
	human = [];
	computer = [];
	render()
	setTimeout(set2, 500);
	setTimeout(set1, 1000);
	setTimeout(go, 1500);
}

function set2(){
	state = "countdown 2";
	render();
}

function set1(){
	state = "countdown 1";
	render();
}

function go(){
	state = "play";
	render();
}

function playsumthin(which){
	human.push(which);
	compplay();
	state = "score";
	render();
	setTimeout(next, 1750);
}

function next(){
	
	if (state == "finish") {
		state = "start";
	}
	else if (humanscore == 3 || computerscore == 3){
		state = "finish";
		setTimeout(next, 2000);
	}
	else{
		state = "play";
	}
	render(); 
}

function compplay(){
	if (gamemode == 0) compplayrand();
	else compplaysmart();
}

function compplayrand(){
	var choice = Math.floor(Math.random() * 3);
	if (choice == 0) computer.push("rock");
	if (choice == 1) computer.push("paper");
	if (choice == 2) computer.push("scissors");
}

function compplaysmart(){
//if they play the same thing twice then play what looses to that 
	//example: if they play scissors twice (regardless of winning or loosing) they are likely to switch plays so your safest pay is paper becuase it beats rock and ties with paper.
	if (human.length >= 3 && human[human.length - 2] == human[human.length - 3]){
		if (human[human.length -2] == "rock"){
			computer.push("scissors")
		}
		else if (human[human.length - 2] == "paper"){
			computer.push("rock")
		}
		else {
			computer.push("paper")
		}
	}

//if a player wins computer should play the move that beats that play in the next round
	//example: if the player wins with scissors they are likely to repeat that move so computer should play rock on the next round
	else if (winnerwinnerchickendinner(human[human.length - 2], computer[computer.length - 1]) == false){
		if (human[human.length - 2] == "rock"){
			computer.push("paper")
		}
		else if (human[human.lenght - 2] == "paper"){
			computer.push("scissors")
		}
		else {
			computer.push("rock")
		}
	}

//if the palyer looses they will switch to a move that beats the computer's previous move so play a move that beats that (they players previous move)
	//example: if the player plays scissors and looses to the computer's rock the player will likely switch to paper because it beats rock so they computer should play scissors.
	else if (winnerwinnerchickendinner(human[human.length - 2], computer[computer.lenght - 1]) == true){
		if (human[human.lenght - 2] == "rock"){
			computer.push("rock")
		}
		else if (human[human.lenght - 2] == "paper"){
			computer.push("paper")
		}
		else { 
			computer.push("scissors")
		}
	}

	else compplayrand(); 

}


















