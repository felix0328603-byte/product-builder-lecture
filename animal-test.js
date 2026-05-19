const URL = "https://teachablemachine.withgoogle.com/models/j-5TVFRen/";
let model, webcam, labelContainer, maxPredictions;

async function initAI() {
    const startButton = document.getElementById('start-ai');
    startButton.disabled = true;
    startButton.textContent = "Loading Model...";

    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    try {
        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();

        const flip = true;
        webcam = new tmImage.Webcam(200, 200, flip);
        await webcam.setup();
        await webcam.play();
        window.requestAnimationFrame(loop);

        document.getElementById("webcam-container").appendChild(webcam.canvas);
        labelContainer = document.getElementById("label-container");
        
        // Clear previous content if any
        labelContainer.innerHTML = '';
        
        for (let i = 0; i < maxPredictions; i++) {
            const bar = document.createElement('div');
            bar.className = 'prediction-bar';
            bar.innerHTML = `
                <span class="prediction-label"></span>
                <div class="prediction-progress-bg">
                    <div class="prediction-progress-fill" style="width: 0%"></div>
                </div>
                <span class="prediction-value">0%</span>
            `;
            labelContainer.appendChild(bar);
        }
        
        startButton.style.display = 'none';
    } catch (error) {
        console.error("AI Initialization failed:", error);
        startButton.disabled = false;
        startButton.textContent = "Error! Try Again";
    }
}

async function loop() {
    webcam.update();
    await predict();
    window.requestAnimationFrame(loop);
}

async function predict() {
    const prediction = await model.predict(webcam.canvas);
    for (let i = 0; i < maxPredictions; i++) {
        const classPrediction = prediction[i].className;
        const probability = (prediction[i].probability * 100).toFixed(0) + "%";
        
        const bar = labelContainer.childNodes[i];
        bar.querySelector('.prediction-label').textContent = classPrediction;
        bar.querySelector('.prediction-progress-fill').style.width = probability;
        bar.querySelector('.prediction-value').textContent = probability;
    }
}

document.getElementById('start-ai').addEventListener('click', initAI);
