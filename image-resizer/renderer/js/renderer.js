const form = document.querySelector('#img-form');
const img = document.querySelector('#img');
const outputPath = document.querySelector('#output-path');
const filename = document.querySelector('#filename');
const heightInput = document.querySelector('#height');
const widthInput = document.querySelector('#width');

// console.log(versions.node());

const loadImage = (e) => {
    const file = e.target.files[0];

    if (!isFileAllowedImage(file)) {
        console.log('Please select an valid image');
        return;
    }

    const image = new Image();
    image.src = URL.createObjectURL(file);
    image.onload = function () {
        widthInput.value = this.width;
        heightInput.value = this.height;
    }

    form.style.display = 'block';
    filename.innerText = file.name;
    outputPath.innerText = path.join(os.homedir(), 'imagesizer')
}


function sendImage(e) {
    e.preventDefault();

    const width = widthInput.value;
    const height = heightInput.value;
    const imgPath = img.files[0].path;

    if (!img.files[0]) {
        console.log('Please upload an image');
        return;
    }

    if (width === '' || height === '') {
        console.log('Please enter height and width');
        return;
    }

    // Send to maiin using IpcRendrer
    ipcRenderer.send('image:resize', {
        imgPath, width, height
    });
}

ipcRenderer.on("image:done", () => {
    alertSuccess(`Image resized to ${heightInput.value} x ${widthInput.value}`)
})

function isFileAllowedImage(file) {
    const acceptedFileImages = ["images/gif", "image/png", "image/jpeg"];
    return file && acceptedFileImages.includes(file['type']);
}

function alertError(message) {
    Toastify.toast({
        text: message,
        duration: 5000,
        close: false,
        style: {
            background: 'red',
            color: 'white',
            textAlign: 'center'
        }
    })
}


function alertSuccess(message) {
    Toastify.toast({
        text: message,
        duration: 5000,
        close: false,
        style: {
            background: 'green',
            color: 'white',
            textAlign: 'center'
        }
    })
}

img.addEventListener('change', loadImage)
form.addEventListener('submit', sendImage)