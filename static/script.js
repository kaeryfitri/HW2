const uploadArea = document.getElementById('upload-area');
const imageInput = document.getElementById('image-input');
const uploadPlaceholder = document.getElementById('upload-placeholder');
const imagePreview = document.getElementById('image-preview');
const predictBtn = document.getElementById('predict-btn');
const resultCard = document.getElementById('result-card');
const predClass = document.getElementById('pred-class');
const predConf = document.getElementById('pred-conf');
const spinner = document.getElementById('loading-spinner');
const errorMsg = document.getElementById('error-message');

let currentFile = null;

uploadArea.addEventListener('click', () => {
    imageInput.click();
});

uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.style.borderColor = '#60a5fa';
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.style.borderColor = 'rgba(255, 255, 255, 0.1)';
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.style.borderColor = 'rgba(255, 255, 255, 0.1)';
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFile(e.dataTransfer.files[0]);
    }
});

imageInput.addEventListener('change', (e) => {
    if (e.target.files && e.target.files[0]) {
        handleFile(e.target.files[0]);
    }
});

function handleFile(file) {
    if (!file.type.startsWith('image/')) {
        showError("Please upload an image file.");
        return;
    }
    currentFile = file;
    hideError();
    resultCard.hidden = true;
    
    const reader = new FileReader();
    reader.onload = (e) => {
        imagePreview.src = e.target.result;
        imagePreview.hidden = false;
        uploadPlaceholder.hidden = true;
        predictBtn.disabled = false;
    };
    reader.readAsDataURL(file);
}

predictBtn.addEventListener('click', async () => {
    if (!currentFile) return;

    // Reset UI state
    resultCard.hidden = true;
    hideError();
    predictBtn.hidden = true;
    spinner.hidden = false;

    const formData = new FormData();
    formData.append('image', currentFile);

    try {
        const response = await fetch('/predict', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            const errData = await response.json();
            throw new Error(errData.detail || 'Prediction failed');
        }

        const data = await response.json();
        
        // Update DOM
        predClass.textContent = data.prediction;
        predConf.textContent = (data.confidence * 100).toFixed(2) + '%';
        
        // Show results
        resultCard.hidden = false;
    } catch (err) {
        showError(err.message);
    } finally {
        spinner.hidden = true;
        predictBtn.hidden = false;
    }
});

function showError(msg) {
    errorMsg.textContent = msg;
    errorMsg.hidden = false;
}

function hideError() {
    errorMsg.hidden = true;
}
