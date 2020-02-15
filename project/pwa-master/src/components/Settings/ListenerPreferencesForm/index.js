import React from 'react';
import content from "./content";
import "./styles.scss";
import DetailsForm from "../../../components/ListenerPreferences/DetailsForm";
import PriceForm from "../../../components/ListenerPreferences/PriceForm";

const ListenerPreferencesForm = ({ preferencesIsOpen, togglePreferences }) => {
    return (
        <section className="formContainer">
            <header onClick={() => togglePreferences(!preferencesIsOpen)} className="formHeaderContainer">
                <span className="expandIcon">
                    {!preferencesIsOpen ? "+" : "-"}
                </span>
                <div className="formHeaderText">
                    {content.SUBCONTAINER5_LABEL}
                </div>
            </header>
            {preferencesIsOpen && (
                <React.Fragment>
                    <header onClick={() => togglePreferences(false)} className="formHeaderContainer">
                        <span className="expandIcon">
                            -
                        </span>
                        <div className="formHeaderText">
                            {content.SUBCONTAINER5_LABEL}
                        </div>
                    </header>
                    <DetailsForm />
                    <div className="priceContainer">
                        <PriceForm />
                    </div>
                </React.Fragment>
            )}
        </section>
    );
};

export default ListenerPreferencesForm;