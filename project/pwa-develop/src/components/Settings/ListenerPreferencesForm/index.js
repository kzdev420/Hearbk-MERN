import React from 'react';
import content from "./content";
import "./styles.scss";
import DetailsForm from "../../../components/ListenerPreferences/DetailsForm";
import PriceForm from "../../../components/ListenerPreferences/PriceForm";

const ListenerPreferencesForm = ({ 
    preferencesIsOpen, 
    togglePreferences, 
    city,
    gender,
    dateOfBirth,
    genres,
    tags,
    price,
    headline,
    bio 
}) => {
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
                    <DetailsForm
                        city={city}
                        gender={gender}
                        dob={dateOfBirth}
                        genres={genres}
                        tags={tags}
                    />
                    <div className="priceContainer">
                        <PriceForm 
                            price={price}
                            sendMe={headline}
                            describeSelf={bio}
                        />
                    </div>
                </React.Fragment>
            )}
        </section>
    );
};

export default ListenerPreferencesForm;