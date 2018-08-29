import React from 'react';
import Cropper from 'cropperjs';

class CroppingTool extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            image: '',
        }

        this.handleUpload = this.handleUpload.bind(this);
        this.initializeCropper = this.initializeCropper.bind(this);
    }

    render() {
        return (
            <div>
                <div className="cropper-preview">
                    <img id="imagePreview" src={this.state.image} />
                </div>
                <div className="upload-btn">
                    <input id="upload"
                        className="upload-btn__input"
                        accept=".jpg,.png"
                        type="file"
                        onChange={(e) => this.handleUpload(e)}
                        name="img-upload" />
                </div>
            </div>
        )
    }

    handleUpload(event) {
        const app = this;
        const input = event.target;
        const reader = new FileReader();
        reader.onload = function() {
            var dataURL = reader.result;
            app.setState({ image: dataURL });
            app.initializeCropper();
        }
        reader.readAsDataURL(input.files[0]);
    }

    initializeCropper() {
        const image = document.getElementById('imagePreview');
        const cropper = new Cropper(image, {
            cropBoxResizable: false,
            minContainerWidth: 300,
            minContainerHeight: 300,
            minCanvasWidth: 300,
            minCanvasHeight: 300
        });

    }
}

module.exports = CroppingTool;
