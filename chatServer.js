/*
chatServer.js
Author: David Goedicke (da.goedicke@gmail.com)
Closley based on work from Nikolas Martelaro (nmartelaro@gmail.com) as well as Captain Anonymous (https://codepen.io/anon/pen/PEVYXz) who forked of an original work by Ian Tairea (https://codepen.io/mrtairea/pen/yJapwv)
*/

var express = require('express'); // web server application
var app = express(); // webapp
var http = require('http').Server(app); // connects http library to server
var io = require('socket.io')(http); // connect websocket library to server
var serverPort = 8000;


//---------------------- WEBAPP SERVER SETUP ---------------------------------//
// use express to create the simple webapp
app.use(express.static('public')); // find pages in public directory

// start the server and say what port it is on
http.listen(serverPort, function() {
  console.log('listening on *:%s', serverPort);
});
//----------------------------------------------------------------------------//


//---------------------- WEBSOCKET COMMUNICATION -----------------------------//
// this is the websocket event handler and say if someone connects
// as long as someone is connected, listen for messages
io.on('connect', function(socket) {
  console.log('a new user connected');
  var questionNum = 0; // keep count of question, used for IF condition.
  socket.on('loaded', function(){// we wait until the client has loaded and contacted us that it is ready to go.

  socket.emit('answer',"Hey, Hello I am mobo, a simple bot that loves movies."); //We start with the introduction;
  setTimeout(timedQuestion, 2500, socket,"What is your Name?"); // Wait a moment and respond with a question.

});
  socket.on('message', (data)=>{ // If we get a new message from the client we process it;
        console.log(data);
        questionNum= bot(data,socket,questionNum);	// run the bot function with the new message
      });
  socket.on('disconnect', function() { // This function  gets called when the browser window gets closed
    console.log('user disconnected');
  });
});
//--------------------------CHAT BOT FUNCTION-------------------------------//
function bot(data,socket,questionNum) {
  var input = data; // This is generally really terrible from a security point of view ToDo avoid code injection
  var answer;
  var question;
  var waitTime;

/// These are the main statments that make up the conversation.
  if (questionNum == 0) {
  answer= 'Hello ' + input + ' :-)';// output response
  waitTime =2000;
  question = 'In what year were you born?';			    	// load next question
  }
  else if (questionNum == 1) {
  answer= 'So that means you are: ' + (2018-parseInt(input)) + ' years old, or I should say ' + (2018-parseInt(input)) + ' years young.';// output response
  waitTime =2000;
  question = 'Are you in the mood for movie?';			    	// load next question
  }
  else if (questionNum == 2) {
    if(input.toLowerCase()==='yes'|| input===1){
      answer = "Perfect! Let's find a movie for you.";
      waitTime =2000;
      question = 'Do you like drama?';
    }
    else if(input.toLowerCase()==='no'|| input===0){
        answer= "That's fine. Let's do some math then." // To be finished
        waitTime =2000;
        question= '1+1=?';
        questionNum=questionNum + 6;
    }else{
      answer=''
      question='I did not understand you. Can you please answer with simply with yes or no.';
      questionNum--;
      waitTime =0;
    }
  // load next question
  }
  else if (questionNum == 3) {
    if(input.toLowerCase()==='yes'|| input===1){
      answer = 'I like drama, too!';
      waitTime =2000;
      question = 'How about romance, yes?';
    }
    else if(input.toLowerCase()==='no'|| input===0){
        answer= "That's fine. Let's find something else.";
        waitTime =2000;
        question='How about Animation? Do you like it?';
        questionNum=questionNum+4;
    }else{
      answer=''
      question='I did not understand you. Can you please answer with simply with yes or no.';
      questionNum--;
      waitTime =0;
    }
  // load next question
  }
  else if (questionNum == 4) {
    if(input.toLowerCase()==='yes'|| input===1){
      answer = 'So drama and romance... I think I found one. "Call Me by Your Name". I think you will like it';
      waitTime =0;
      question = '';
    }
    else if(input.toLowerCase()==='no'|| input===0){
        answer = "That's fine. Let's find you something else.";
        waitTime =2000;
        question = 'You like action?';
    }else{
      answer=''
      question='I did not understand you. Can you please answer with simply with yes or no.';
      questionNum--;
      waitTime =0;
    }
  // load next question
  }
  else if (questionNum == 5) {
    if(input.toLowerCase()==='yes'|| input===1){
      answer = 'So drama and action... Let me ask you one more question.';
      waitTime =3000;
      question = 'History, yes or no?';
    }
    else if(input.toLowerCase()==='no'|| input===0){
        answer = "So you don't like action either.";
        waitTime =2000;
        question = 'Do you like crime?';
        questionNum++;
    }else{
      answer=''
      question='I did not understand you. Can you please answer with simply with yes or no.';
      questionNum--;
      waitTime =0;
    }
  // load next question
  }
  else if (questionNum == 6) {
    if(input.toLowerCase()==='yes'|| input===1){
      answer = 'Drama, action, and history... I think I found one. "12 Strong". Very good movie. I think you will like it';
      waitTime =0;
      question = '';
    }
    else if(input.toLowerCase()==='no'|| input===0){
        answer = "OK...You like drama and action, but not history. I think you'll enjoy Den of Thieves";
        waitTime =0;
        question = '';
    }else{
      answer=''
      question='I did not understand you. Can you please answer with simply with yes or no.';
      questionNum--;
      waitTime =0;
    }
  // load next question
  }
  else if (questionNum == 7) {
    if(input.toLowerCase()==='yes'|| input===1){
      answer = "Great! You like drama and crime, but not romance and action. I think you'll find All the Money in the World to your taste.";
      waitTime =0;
      question = '';
    }
    else if(input.toLowerCase()==='no'|| input===0){
        answer = "Alright, you do like drama. But you don't like romance, action or crime. I guess you'll like Darkest Hour. It's my favorite!";
        waitTime =0;
        question = '';
        questionNum++;
    }else{
      answer=''
      question='I did not understand you. Can you please answer with simply with yes or no.';
      questionNum--;
      waitTime =0;
    }
  // load next question
  }
  else if (questionNum == 8) {
    if(input.toLowerCase()==='yes'|| input===1){
      answer = "OK. You don't like drama. But you do like animation. Let's watch Coco. It's a great movie";
      waitTime =0;
      question = '';
    }
    else if(input.toLowerCase()==='no'|| input===0){
        answer = "You don't like drama or animation. But I think you'll like Colao. Because I like it!";
        waitTime =0;
        question = '';
        questionNum++;
    }else{
      answer=''
      question='I did not understand you. Can you please answer with simply with yes or no.';
      questionNum--;
      waitTime =0;
    }
  // load next question
  }
  else if (questionNum == 9) {
    if (input == 2){
      answer = "Correct. Let's do something harder.";
      waitTime = 2000;
      question = "12 X 12 = ?";
    }
    else {
      answer = "";
      question='Try again';
      questionNum--;
      waitTime = 0;
    }
  // load next question
  }
  else if (questionNum == 10) {
    if (input == 144){
      answer = "";
      waitTime =0;
      question = "Excellent! You are really good at math. Time for movies?";
    }

    else{
      answer=''
      question='Think again. What is 12 X 12?';
      questionNum--;
      waitTime =0;
    }
  // load next question
  }
  else if (questionNum == 11) {
    if(input.toLowerCase()==='yes'|| input===1){
      answer = "Perfect! Let's find a movie for you.";
      waitTime =2000;
      question = 'Do you like drama?';
      questionNum = 2;
    }
    else if(input.toLowerCase()==='no'|| input===0){
        answer= "May be next time? See you."
        waitTime =0;
        question= '';
    }else{
      answer=''
      question='I did not understand you. Can you please answer with simply with yes or no.';
      questionNum--;
      waitTime =0;
    }
  // load next question
  }

  //else if (questionNum == 5) {
  //answer= 'Ok, ' + input+' it is.';
  //socket.emit('changeBG',input.toLowerCase());
  //waitTime = 2000;
  //question = 'Can you still read the font?';			    	// load next question
  //}
  //else if (questionNum == 6) {
  //  if(input.toLowerCase()==='yes'|| input===1){
  //    answer = 'Perfect!';
  //    waitTime =2000;
  //    question = 'Whats your favorite place?';
  //  }
  //  else if(input.toLowerCase()==='no'|| input===0){
  //      socket.emit('changeFont','white'); /// we really should look up the inverse of what we said befor.
  //      answer=''
  //      question='How about now?';
  //      waitTime =0;
  //      questionNum--; // Here we go back in the question number this can end up in a loop
  //  }else{
  //    answer=' I did not understand you. Can you please answer with simply with yes or no.'
  //    question='';
  //    questionNum--;
  //    waitTime =0;
  //  }
  // load next question
  //}
  //else{
  //  answer= 'I have nothing more to say!';// output response
  //  waitTime =0;
  //  question = '';
  //}


/// We take the changed data and distribute it across the required objects.
  socket.emit('answer',answer);
  setTimeout(timedQuestion, waitTime,socket,question);
  return (questionNum+1);
}

function timedQuestion(socket,question) {
  if(question!=''){
  socket.emit('question',question);
}
  else{
    //console.log('No Question send!');
  }

}
//----------------------------------------------------------------------------//
