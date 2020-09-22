var buttonColours=["red","blue","green","yellow"];
var generatedColours=[];
var selectedColours=[];
var level=0;
var start= false;
$(document).keypress(function(){
    if(!start)
    {
        $("#level-title").text("Level "+level);
        $("footer").text("SCORE : 0");
         generatingSequence();
         start=true;
    }
});
function generatingSequence(){
    selectedColours=[];
    level++;
    $("#level-title").text("Level "+level);
    var randomnumber=Math.floor(Math.random()*4);
    var colourgenerated=buttonColours[randomnumber];
    generatedColours.push(colourgenerated);
    $("#"+colourgenerated).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playsound(colourgenerated);
};
$(".btn").on("click",function(){
    var colourSelected=$(this).attr("id");
    playsound(colourSelected);
   pressAnimate(colourSelected);
    selectedColours.push(colourSelected);
    checkColour(selectedColours.length-1);
});
function pressAnimate(colour){
    $("#"+colour).addClass("pressed");
    setTimeout(function () {
        $("#" + colour).removeClass("pressed");
      }, 100);
};
function checkColour(currentindex)
{
   if(selectedColours[currentindex]===generatedColours[currentindex])
   {
       if(selectedColours.length===generatedColours.length)
        {
            $("body").addClass("level-passed");
            setTimeout(function(){
                $("body").removeClass("level-passed");
            },100);
            setTimeout(function () {
                generatingSequence();
              }, 1000);
        }
   }
   else
   {
       playsound("sounds/wrong.mp3");
       $("body").addClass("game-over");
       setTimeout(function(){
           $("body").removeClass("game-over");
       },100);
      gameover();
   }
};
function playsound(colour){
    var audio= new Audio("sounds/"+colour+".mp3");
    audio.play();
};
function gameover(){
    $("#level-title").text("Game Over, Press any key to Restart");
    $("footer").text("SCORE :"+(level-1)*10);
     generatedColours=[]; 
     level=0;
     start=false;

    
};
