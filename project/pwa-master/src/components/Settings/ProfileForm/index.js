import React from 'react';
import content from "./content";
import "./styles.scss";
import InputField from "../../../common/InputField";

const ProfileForm = ({ profileIsOpen, toggleProfile, displayName, username, onInputChange }) => {
    return (
        <section className="formContainer">
            <header onClick={() => toggleProfile(!profileIsOpen)} className="formHeaderContainer">
                <span className="expandIcon">
                    {!profileIsOpen ? "+" : "-"}
                </span>
                <div className="formHeaderText">
                    {content.SUBCONTAINER1_LABEL}
                </div>
            </header>
            {profileIsOpen && (
                <React.Fragment>
                    <div className="formInputContainer">
                        <label for="displayName" className="formInputLabel">
                            {content.SUBCONTAINER1_SUBLABEL1}
                        </label>
                        <InputField 
                            id="displayName"
                            className="formInputField"
                            value={displayName}
                            onChange={onInputChange}
                            placeholder={content.SUBCONTAINER1_PLACEHOLDER1}
                            hasIcon
                            iconPosition="right"
                            iconName="pencil_1"
                        />
                    </div>
                    <div className="formInputContainer">
                        <label for="username" className="formInputLabel">
                            {content.SUBCONTAINER1_SUBLABEL2}
                        </label>
                        <InputField 
                            id="username"
                            className="formInputField"
                            value={username}
                            onChange={onInputChange}
                            placeholder={content.SUBCONTAINER1_PLACEHOLDER2}
                            hasIcon
                            iconPosition="right"
                            iconName="pencil_1"
                        />
                    </div>
                </React.Fragment>
            )}
        </section>
    );
};

ProfileForm.defaultProps = {
    displayName: "Vess Dynamick",
    username: "@vessdynamick",
}

export default ProfileForm;