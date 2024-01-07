//splash
var SplashScreen = document.querySelector('.splash_screen');
SplashScreen.addEventListener('click', ()=>{
    SplashScreen.style.opacity = 0;
    //appear
    var appear = document.getElementById("camera");
    appear.style.display= "block";

    var appear_4 = document.getElementById("result");
    appear_4.style.display= "block";

    var appear_1 = document.getElementById("label_1");
    appear_1.style.display = "block";

    var appear_2 = document.getElementById("label_2");
    appear_2.style.display= "block";
    appear_2.style.width = "200px";

    var appear_3 = document.getElementById("label_3");
    appear_3.style.display= "block";

    var appear_5 = document.getElementById("btn_1");
    appear_5.style.display= "block";

    var appear_6 = document.getElementById("btn_2");
    appear_6.style.display= "block";

    //apear
    setTimeout(()=>{
        SplashScreen.classList.add('hidden')
      },610)
})

//splash

prediction = "";

Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
})

camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

console.log("ml5 version:",ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/iQ2midmLT/model.json',modelLoaded);

function modelLoaded(){
    console.log("Model Loaded!");
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data = "The predicted gesture is " + prediction;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}
function check(){
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, results){
    if (error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        prediction = results[0].label;
        speak()
    }

    if (results[0].label == "amazing"){
        document.getElementById("update_emoji").innerHTML = "&#128076;";
    }
    if (results[0].label == "best"){
        document.getElementById("update_emoji").innerHTML = "&#128077;";
    }
    if (results[0].label == "worst"){
        document.getElementById("update_emoji").innerHTML = "&#128078;";
    }
    if (results[0].label == "victory"){
        document.getElementById("update_emoji").innerHTML = "&#9996;";
    }
}