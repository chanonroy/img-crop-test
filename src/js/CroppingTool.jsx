import React from 'react';
import Cropper from 'cropperjs';
import { Button } from 'element-react';

class CroppingTool extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            imagePreview: null
        }

        this.handleUpload = this.handleUpload.bind(this);
        this.initializeCropper = this.initializeCropper.bind(this);
        this.clearCropper = this.clearCropper.bind(this);
        this.getImageCrop = this.getImageCrop.bind(this);
    }

    render() {
        return (
            <div>
                {/* Cropper Preview */}
                <div className="cropper-preview">
                    <img id="imagePreview" src={this.state.image} />
                </div>
                {/* Cropper Upload */}
                {!this.state.imagePreview ?
                    <div className="upload-img">
                        <label htmlFor="upload-photo" className="el-button el-button--primary">
                            Upload
                        </label>
                        <input id="upload-photo"
                            className="upload-img__input"
                            accept=".jpg,.png"
                            type="file"
                            onChange={(e) => this.handleUpload(e)}
                            name="photo" />
                    </div>
                    :
                    <div className="upload-img">
                        <Button type="primary" onClick={() => this.getImageCrop()}>
                            Crop Image </Button>
                        <Button
                            onClick={() => this.clearCropper()}>
                            Clear </Button>
                    </div>
                }
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

    clearCropper() {
        let image = this.state.imagePreview;
        if (image) {
            image.cropper.destroy();
            image.src = ""
        }
        this.setState({ imagePreview: null });
    }

    initializeCropper() {
        this.clearCropper();
        const image = document.getElementById('imagePreview');
        new Cropper(image, {
            aspectRatio: 1 / 1,
            cropBoxResizable: false,
            minCanvasHeight: 300,
            minCanvasWidth: 300,
            minContainerHeight: 300,
            minContainerWidth: 300
        });
        this.setState({ imagePreview: image });
    }

    getImageCrop() {
        let image = this.state.imagePreview;
        let canvas = image.cropper.getCroppedCanvas();
        canvas.toBlob((blob) => {
            console.log(blob);
        });
    }
}

module.exports = CroppingTool;
