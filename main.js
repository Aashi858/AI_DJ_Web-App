music = "";
let_it_go = "";
rightWristX = "";
rightWristY = "";
leftWristX = "";
leftWristY = "";
scoreLeftwrist = "";
scoreRightwrist = "";
rightWristX = "";
rightWristY = "";
song = 0;

function preload(){
    music = loadSound("music.mp3");
    let_it_go = loadSound("let it go.mp3");
}
function setup(){
    canvas = createCanvas(500,400);
    canvas.position(400,180);

    video =  createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,model_loaded);
    poseNet.on("pose",got_result);
}
function draw(){
    image(video,0,0,500,400);
    if(scoreLeftwrist > 0.2){
        circle(leftWristX,leftWristY,30);
        fill("#d1a7eb");
        stroke("#d1a7eb");
        numberleftWristY = Number(leftWristY);
        removeleftWristY = floor(numberleftWristY);
        value_volume = removeleftWristY/400;
        music.setVolume(value_volume);
        document.getElementById("volume").innerHTML = value_volume;
    }
    if(scoreRightwrist > 0.2){
        circle(rightWristX,rightWristY,30);
        fill("deepskyblue");
        stroke("deepskyblue");
        if(rightWristY > 0 && rightWristY <= 100){
           music.rate(0.5);
           document.getElementById("speed").innerHTML = "0.5";
        }
        else if(rightWristY > 100 && rightWristY <= 200){
            music.rate(1);
            document.getElementById("speed").innerHTML = "1";
        }
        else if(rightWristY > 200 && rightWristY <= 300){
            music.rate(1.5);
            document.getElementById("speed").innerHTML = "1.5";
        }
        else if(rightWristY > 300 && rightWristY <= 400){
            music.rate(2);
            document.getElementById("speed").innerHTML = "2";
        }
    }
}
function colour(){
    document.getElementById("music").style.backgroundColor = "#24e3e0";
}
function play_music(){
    if(song == 0){
        let_it_go.stop()
        music.play();
        music.setVolume(1);
        music.rate(1);
    }
    else if(song == 1){
        music.stop()
        let_it_go.play();
        let_it_go.setVolume(1);
        let_it_go.rate(1);
    }
}
function model_loaded(){
    console.log("Model is loaded");
}
function got_result(results){
    if(results.length > 0){
        console.log(results);

        scoreRightwrist = results[0].pose.keypoints[10].score;
        console.log("scoreRightwrist :" + scoreRightwrist);

        scoreLeftwrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftwrist :" + scoreLeftwrist);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Right_Wrist X :" + rightWristX + " Right_Wrist_Y :" + rightWristY);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("Left_Wrist X :" + leftWristX + " Left_Wrist_Y :" + leftWristY);
    }
}
function previous(){
    if(song > 0){
        song = song - 1;
        play_music();
    }
}
function next(){
        song = song + 1;
        play_music();
    if(song == 2){
        song = 0;
        play_music();
    }
  }
