import React from 'react';
import ReactCrop from 'react-image-crop';
import { Button } from 'element-react';

import { getCroppedImg } from './utils.js';

class CroppingTool extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            imgData: null,
            pixelCrop: {},
            cropSettings: {
                aspect: 1 / 1,
            }
        }

        this.handleUpload = this.handleUpload.bind(this);
        this.createImgCrop = this.createImgCrop.bind(this);
    }

    render() {
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
                            {this.state.pixelCrop &&
                                <Button
                                    type="primary"
                                    onClick={() => this.createImgCrop(this.state.imgData, this.state.pixelCrop, 'img') }>
                                    Crop </Button>
                            }
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

}

module.exports = CroppingTool;
