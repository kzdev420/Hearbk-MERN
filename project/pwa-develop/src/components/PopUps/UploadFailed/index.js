import React from 'react';
import content from "./content";
import "./styles.scss";
import Button from "../../../common/Button";

const UploadFailed = (props) => {
    return (
        <div className="cancelContainer">
            <div className="cancelLabel">
                {content.FAIL}
            </div>
            <div className="buttonWrapper">
                <Button 
                    className="cancelButton"
                    buttonText={content.RETRY_UPLOAD}
                    disabled={false}
                    onClick={props.retryUpload}
                />
            </div>
        </div>
    );
};

UploadFailed.defaultProps = {

};

export default UploadFailed;