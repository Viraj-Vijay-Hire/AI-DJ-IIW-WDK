song = "";

rightWrist_X = 0;
rightWrist_Y = 0;

leftWrist_X = 0;
leftWrist_Y = 0;

score_leftWrist = 0;
score_rightWrist = 0;

function preload()
{
    song = loadSound("music.mp3");
}

function setup()
{
    canvas = createCanvas(600, 500);
    canvas.center();
    
    video = createCapture(600, 500);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);

        score_rightWrist = results[0].pose.keypoints[10].score;
        score_leftWrist = results[0].pose.keypoints[9].score;
        console.log("right score right wristX = " + score_rightWrist + "left score left wristX = " + score_leftWrist);

        leftWrist_X = results[0].pose.leftWrist.x;
        leftWrist_Y = results[0].pose.leftWrist.y;
        console.log(leftWrist_X, leftWrist_Y);

        rightWrist_X = results[0].pose.rigthWrist.x;
        rightWrist_Y = results[0].pose.rightWrist.y; 
        console.log(rightWrist_X, rightWrist_Y);
    }    
}

function draw()
{
    image(video, 0, 0, 600, 500);
    fill("#c0fff4");
    stroke("#c0fff4");

    if(score_rightWrist > 0.2)
    {
        circle(rightWrist_X, rightWrist_Y, 20);

    if(rightWrist_Y > 0 && rightWrist_Y <= 100)
    {
        document.getElementById("speed").innerHTML = "speed = 0.5";
        song.rate(0.5);
    }
    else if(rightWrist_Y > 100 && rightWrist_Y <= 200)
    {
        document.getElementById("speed").innerHTML = "speed = 1.0";
        song.rate(1.0);
    }
    else if(rightWrist_Y > 200 && rightWrist_Y <= 300)
    {
        document.getElementById("speed").innerHTML = "speed = 1.5";
        song.rate(1.5);
    }
    else if(rightWrist_Y > 300 && rightWrist_Y <= 400)
    {
        document.getElementById("speed").innerHTML = "speed = 2.0";
        song.rate(2.0);
    }
    else if(rightWrist_Y > 400 && rightWrist_Y <= 500)
    {
        document.getElementById("speed").innerHTML = "speed = 2.5";
        song.rate(2.5);
    }
    }

    circle(leftWrist_X, leftWrist_Y, 20);

    

    if(score_leftWrist > 0.2)
    {
        InNumberleftWrist_Y = Number(leftWrist_Y);
        remove_decimals = floor(InNumberleftWrist_Y);
        volume = remove_decimals/500;
        document.getElementById("volume").innerHTML = "volume = " + volume;
        song.setVolume(volume);
    }

}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function modelLoaded()
{
    console.log("PoseNet is initialized");
}

