(function () {
    /* HTML content */
    var video = document.getElementById('stream');
    var stopBtn = document.getElementById('stop');
    var startBtn = document.getElementById('start');
    var switchBtn = document.getElementById('switch');
    var takePicBtn = document.getElementById('takeBtn');
    var picture = document.getElementById('picture');
    var videoStream;
    var front = false; // for switch camera
    function startCamera() {
        var constraints = {
            video: {
                width: { min: 1024, ideal: 1280, max: 1920 },
                height: { min: 576, ideal: 720, max: 1080 },
                facingMode: front ? "user" : "environment"
            }
        };
        if (typeof window.navigator) {
            if (videoStream) {
                stopCamera();
                video.style.transform = front ? 'scaleX(-1);' : 'scaleX(1);';
            }
            window.navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
                video.srcObject = stream;
                videoStream = stream;
                // Playing video
                video.onloadedmetadata = function (event) {
                    video.play();
                };
            })["catch"](function (err) {
                console.log('Your browser does not supports video', err);
            });
        }
    }
    /* Function to switch camera between front and back camera */
    function switchCamera() {
        front = !front;
        startCamera();
    }
    stopBtn.addEventListener('click', function (event) {
        stopCamera();
    });
    startBtn.addEventListener('click', function (event) {
        if (video.requestFullscreen) {
            video.requestFullscreen();
        }
        startCamera();
    });
    switchBtn.addEventListener('click', function (event) {
        switchCamera();
    });
    /* Function to take a photo, and download taken photo  */
    function takePhoto() {
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        canvas.width = video.clientWidth;
        canvas.height = video.clientHeight;
        console.log(video.videoHeight, video.videoWidth);
        console.log(video.clientWidth, video.clientHeight);
        if (video)
            ctx === null || ctx === void 0 ? void 0 : ctx.drawImage(video, 0, 0, video.clientWidth, video.clientHeight);
        picture.prepend(canvas);
        // save image
        var a = document.createElement('a');
        a.download = 'om.jpeg';
        a.href = canvas.toDataURL("image/jpeg");
        a.click();
    }
    takePicBtn.addEventListener('click', function (event) {
        takePhoto();
    });
    video.addEventListener('click', function () {
        takePhoto();
    });
    /* Function to stop video */
    function stopCamera() {
        videoStream.getTracks().forEach(function (track) {
            track.stop();
        });
    }
    // Start video 
    startCamera();
})();
