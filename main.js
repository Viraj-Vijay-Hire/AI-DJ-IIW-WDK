song = "";

rightWrist_X = 0;
rightWrist_Y = 0;

leftWrist_X = 0;
leftWrist_Y = 0;

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

