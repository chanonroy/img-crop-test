import React from 'react';

class Cropper extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            image: '',
        }

        this.handleUpload = this.handleUpload.bind(this);
    }

    render() {
        return (
            <div>
                <img src={this.state.image} />
                <div className="upload-btn">
                    <label htmlFor="upload" className="upload-btn__label"> Upload Image </label>
                    <input id="upload" className="upload-btn__input" type="file" onChange={(e) => this.handleUpload(e)} name="img-upload" />
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
            app.setState({ image: dataURL })
        }
        reader.readAsDataURL(input.files[0]);
    }
}

module.exports = Cropper;
