import React from 'react';
import content from "./content";
import "./styles.scss";
import InputField from "../../../common/InputField";

const ProfileForm = ({ 
    profileIsOpen, 
    toggleProfile, 
    displayName,
    userName,
    onInputChange
}) => {
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
                            id="display_name"
                            className="formInputField"
                            value={displayName}
                            onChange={(e) => onInputChange(e)}
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
                            id="user_name"
                            className="formInputField"
                            value={userName}
                            onChange={(e) => onInputChange(e)}
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

export default ProfileForm;