(function () {
    /* HTML content */
    const video = document.getElementById('stream') as HTMLVideoElement;
    const stopBtn = document.getElementById('stop') as HTMLButtonElement;
    const startBtn = document.getElementById('start') as HTMLButtonElement;
    const switchBtn = document.getElementById('switch') as HTMLButtonElement;
    const takePicBtn = document.getElementById('takeBtn') as HTMLCanvasElement;
    const picture = document.getElementById('picture') as HTMLCanvasElement;


    let videoStream: MediaStream;
    let front = false; // for switch 

    function startCamera() {
        let constraints = {
            video: {
                width: { min: 1024, ideal: 1280, max: 1920 },
                height: { min: 576, ideal: 720, max: 1080 },
                facingMode: front ? "user" : "environment"
            }
        }

        if (typeof window.navigator) {
            if (videoStream)
                stopCamera();
            console.log(constraints)
            window.navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
                video.srcObject = stream;
                videoStream = stream
                // Playing video
                video.onloadedmetadata = (event) => {
                    video.play()
                }
            }).catch(err => {
                console.log('Your browser does not supports video', err);
            })
        }
    }

    function switchCamera() {
        front = !front;
        startCamera();
    }

    stopBtn.addEventListener('click', (event) => {
        stopCamera()
    })

    startBtn.addEventListener('click', (event) => {
        startCamera();
    })

    switchBtn.addEventListener('click', (event) => {
        switchCamera();
    })

    takePicBtn.addEventListener('click', (event) => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d');
        canvas.width = video.clientWidth
        canvas.height = video.clientHeight
        if (video)
            ctx?.drawImage(video, 0, 0, video.clientWidth, video.clientHeight);

        picture.prepend(canvas);
    })

    function stopCamera() {
        videoStream.getTracks().forEach(track => {
            track.stop()
        })
    }

    startCamera();

})()