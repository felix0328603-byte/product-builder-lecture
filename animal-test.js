const URL = "https://teachablemachine.withgoogle.com/models/j-5TVFRen/";
let model, labelContainer, maxPredictions;

const uploadInput = document.getElementById('image-upload');
const uploadTrigger = document.getElementById('upload-trigger');
const faceImage = document.getElementById('face-image');
const previewContainer = document.getElementById('image-preview-container');

// Load model on page load
async function loadModel() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();
    console.log("AI Model Loaded");
}

loadModel();

uploadTrigger.addEventListener('click', () => {
    uploadInput.click();
});

uploadInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
        faceImage.src = event.target.result;
        previewContainer.style.display = 'block';
        
        // Wait for image to load to ensure it's ready for prediction
        faceImage.onload = async () => {
            await predict();
        };
    };
    reader.readAsDataURL(file);
});

async function predict() {
    if (!model) {
        alert("Model still loading, please wait a moment.");
        return;
    }

    const prediction = await model.predict(faceImage);
    labelContainer = document.getElementById("label-container");
    labelContainer.innerHTML = '';

    for (let i = 0; i < maxPredictions; i++) {
        const classPrediction = prediction[i].className;
        const probability = (prediction[i].probability * 100).toFixed(0) + "%";

        const bar = document.createElement('div');
        bar.className = 'prediction-bar';
        bar.innerHTML = `
            <span class="prediction-label">${classPrediction}</span>
            <div class="prediction-progress-bg">
                <div class="prediction-progress-fill" style="width: ${probability}"></div>
            </div>
            <span class="prediction-value">${probability}</span>
        `;
        labelContainer.appendChild(bar);
    }
}
