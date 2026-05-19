// repurposing the AI logic for Physiognomy framing
const URL = "https://teachablemachine.withgoogle.com/models/j-5TVFRen/";
let model, labelContainer, maxPredictions;

const uploadInput = document.getElementById('image-upload');
const faceImage = document.getElementById('face-image');
const previewContainer = document.getElementById('image-preview-container');

async function loadModel() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";
    try {
        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();
    } catch (e) {
        console.error("AI Model load failed", e);
    }
}

loadModel();

uploadInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
        faceImage.src = event.target.result;
        previewContainer.style.display = 'block';
        
        faceImage.onload = async () => {
            await predict();
        };
    };
    reader.readAsDataURL(file);
});

async function predict() {
    if (!model) return;

    const prediction = await model.predict(faceImage);
    labelContainer = document.getElementById("label-container");
    labelContainer.innerHTML = '<h3>[AI 분석 결과]</h3>';

    // Framing the results as Physiognomy types
    prediction.forEach(p => {
        const typeName = p.className === "Dog" ? "친근하고 충성스러운 강아지상 (대인관계운 우수)" : "예리하고 지혜로운 고양이상 (직관력 및 재물운 우수)";
        const prob = (p.probability * 100).toFixed(0);
        
        const bar = document.createElement('div');
        bar.className = 'prediction-bar';
        bar.innerHTML = `
            <div style="display:flex; justify-content:space-between; margin-bottom:5px;">
                <span>${typeName}</span>
                <span>${prob}%</span>
            </div>
            <div class="progress-bg">
                <div class="progress-fill" style="width: ${prob}%"></div>
            </div>
        `;
        labelContainer.appendChild(bar);
    });

    const advice = document.createElement('p');
    advice.style.marginTop = '2rem';
    advice.style.fontSize = '0.9rem';
    advice.style.color = 'var(--secondary-text)';
    advice.innerHTML = "* 본 분석은 AI 학습 모델을 기반으로 하며, 관상학적 통찰을 제공하기 위한 참고 자료입니다. 실제 운세는 심상(心相)과 노력에 따라 변화할 수 있습니다.";
    labelContainer.appendChild(advice);
}
