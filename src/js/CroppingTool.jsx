import React from 'react';
import ReactCrop from 'react-image-crop';
import { Button } from 'element-react';

import { getCroppedImg } from './utils.js';

class CroppingTool extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            imgData: null,
            pixelCrop: null,
            cropSettings: {
                aspect: 1 / 1,
            }
        }

        this.handleUpload = this.handleUpload.bind(this);
        this.createImgCrop = this.createImgCrop.bind(this);
        this.clearImg = this.clearImg.bind(this);
    }

    render() {
        const hasCrop = this.state.pixelCrop && this.state.pixelCrop.height > 0;
        return (
            <div className="cropper">
                {this.state.imgData ?
                    <div>
                        <ReactCrop
                            src={this.state.imgData}
                            crop={this.state.cropSettings}
                            onChange={(crop, pixelCrop) => { this.setState({ cropSettings: crop, pixelCrop: pixelCrop }) }}
                            />
                        <div className="cropper__buttons">
                            <Button
                                type="primary"
                                disabled={!hasCrop}
                                onClick={() => this.createImgCrop(this.state.imgData, this.state.pixelCrop, 'img') }>
                                Crop Image </Button>
                            <Button onClick={() => this.clearImg()}>
                                Reset
                            </Button>
                        </div>
                    </div>
                    :
                    <div className="cropper__buttons">
                        <input
                            type="file"
                            accept=".png,.jpg"
                            onChange={(e) => this.handleUpload(e)}/>
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
            app.setState({ imgData: dataURL });
        }
        reader.readAsDataURL(input.files[0]);
    }

    async createImgCrop(image, pixelCrop, fileName) {
        let img = new Image();
        img.src = image;
        let croppedImage = await getCroppedImg(img, pixelCrop, fileName);
        console.log(croppedImage);
    }

    clearImg() {
        this.setState({
            imgData: null,
            pixelCrop: null,
            cropSettings: {
                aspect: 1 / 1,
            }
        })
    }

}

module.exports = CroppingTool;
