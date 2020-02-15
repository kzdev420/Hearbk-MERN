import React from "react";
import cx from "classnames";
import content from "./content";
import Icon from "../../common/IconComponent";
import "./ListenerPreferences.styles.scss";
import DetailsForm from "./DetailsForm";
import PriceForm from "./PriceForm";
import Button from "../../common/Button";
import history from "../../history";
import FooterNav from "../FooterNav";

const ListenerPreferencesComponent = ({
  handleClickRequestBoxes,
  handleClickToggleAddList,
  handleClickAddGenres,
  handleClickAddTags,
  onInputChange,
  hitRequestBox,
  proRequestBox,
  genresList,
  tagsList,
  genres,
  tags,
  gender,
  dob,
  bio,
  city,
  price,
  sendMeText,
  genresAdded,
  tagsAdded,
  handleButtonClick,
  handleGenderChange,
  saveButtonIsShowing,
  changeToSaveButton,
  disabled
}) => {
  let hitRequestBoxSelected = hitRequestBox ? "selected" : "";
  let proRequestBoxSelected = proRequestBox ? "selected" : "";
  let hitCheckIcons = hitRequestBox ? "checkcirclegreen" : "checkcircle";
  let proCheckIcons = proRequestBox ? "checkcircleblue" : "checkcircle";
  let containerContents;
  let heightAuto = "";
  if (hitRequestBox || proRequestBox) {
    heightAuto = "heightAuto";
    containerContents = (
      <React.Fragment>
        <section className="formContainer">
          <header className="formHeaderContainer">
            <div className="formHeaderText">
                {content.DETAILS_TITLE}
            </div>
          </header>
          <DetailsForm
            city={city}
            gender={gender}
            dob={dob}
            handleClickToggleAddList={handleClickToggleAddList}
            handleClickAddGenres={handleClickAddGenres}
            handleClickAddTags={handleClickAddTags}
            genresList={genresList}
            tagsList={tagsList}
            genresAdded={genresAdded}
            tagsAdded={tagsAdded}
            genres={genres}
            tags={tags}
            onInputChange={onInputChange}
            handleGenderChange={handleGenderChange}
            disabled={disabled}
          />
        </section>
        {saveButtonIsShowing && (
          <div className="buttonWrapper">
            <Button
              className="launchButton saveButton"
              buttonText={content.SAVE}
              onClick={() => handleButtonClick()}
            ></Button>
          </div>
        )}

        {!saveButtonIsShowing && (
          <div className="buttonWrapper">
            <div className="buttonLabel">{content.BUTTON_LABEL}</div>
            <Button 
              className="launchButton moreEditsButton"
              buttonText={content.MAKE_EDITS}
              onClick={() => changeToSaveButton()} 
            ></Button>
            <Button
              className="launchButton"
              buttonText={content.RATE_TRACKS_TEXT}
              onClick={() => history.push("/discover")}
            ></Button>
            <Button
              className="launchButton"
              buttonText={content.ORDER_FEEDBACK_TEXT}
              onClick={() => history.push("/feedback")}
            ></Button>
          </div>
        )}
      </React.Fragment>
    );
  }
  if (hitRequestBox && proRequestBox) {
    heightAuto = "heightAuto";
    containerContents = (
      <React.Fragment>
        <section className="formContainer">
          <header className="formHeaderContainer">
            <div className="formHeaderText">
                {content.DETAILS_TITLE}
            </div>
          </header>
          <DetailsForm
            city={city}
            gender={gender}
            dob={dob}
            handleClickToggleAddList={handleClickToggleAddList}
            handleClickAddGenres={handleClickAddGenres}
            handleClickAddTags={handleClickAddTags}
            genresList={genresList}
            tagsList={tagsList}
            genresAdded={genresAdded}
            tagsAdded={tagsAdded}
            genres={genres}
            tags={tags}
            onInputChange={onInputChange}
            handleGenderChange={handleGenderChange}
            disabled={disabled}
          />
        </section>
        <section className="formContainer">
          <PriceForm
            onInputChange={onInputChange}
            sendMe={sendMeText}
            price={price}
            describeSelf={bio}
            disabled={disabled}
          />
        </section>
        {saveButtonIsShowing && (
          <div className="buttonWrapper">
            <Button
              className="launchButton saveButton"
              buttonText={content.SAVE}
              onClick={() => handleButtonClick()}
            ></Button>
          </div>
        )}

        {!saveButtonIsShowing && (
          <div className="buttonWrapper">
            <div className="buttonLabel">{content.BUTTON_LABEL}</div>
            <Button 
              className="launchButton moreEditsButton"
              buttonText={content.MAKE_EDITS}
              onClick={() => changeToSaveButton()} 
            ></Button>
            <Button
              className="launchButton"
              buttonText={content.RATE_TRACKS_TEXT}
              onClick={() => history.push("/discover")}
            ></Button>
            <Button
              className="launchButton"
              buttonText={content.ORDER_FEEDBACK_TEXT}
              onClick={() => history.push("/feedback")}
            ></Button>
          </div>
        )}
      </React.Fragment>
    );
  }

  return (
    <div className={`listenerPreferencesContainer ${heightAuto}`}>
      {/* <div onClick={() => handleClickMenuToggle(!menuIsOpen)} className="menuIconContainer">
        <Icon iconName="menu" className="menuIcon" />
      </div>
      {menuIsOpen && (
        <Menu handleClickMenuToggle={handleClickMenuToggle} />
      )} */}
      <section className="listenerPreferencesHeaderText">
        <div>
          <strong>{content.HEADER_A}</strong>
        </div>
        <div>{content.HEADER_B}</div>
      </section>
      <div className="listenerPreferencesDescription">
        {content.DESCRIPTION_A}
        <br />
        {content.DESCRIPTION_B}
      </div>
      <div className="requestBoxesContainer">
        <div
          onClick={(e) => handleClickRequestBoxes(e)}
          className={cx("requestBox", hitRequestBoxSelected)}
          id="hitRequestBox"
        >
          <div className="requestBoxContents">
            <label>{content.HIT_REQUESTS_TITLE}</label>
            <ul>
              <li>
                <div className="checkIconContainer">
                  <Icon className={cx("checkIcon")} iconName={hitCheckIcons} />
                </div>
                {content.HIT_REQUESTS_LIS_A}
              </li>
              <li>
                <div className="checkIconContainer">
                  <Icon className={cx("checkIcon")} iconName={hitCheckIcons} />
                </div>
                {content.HIT_REQUESTS_LIS_B}
              </li>
              <li>
                <div className="checkIconContainer">
                  <Icon className={cx("checkIcon")} iconName={hitCheckIcons} />
                </div>
                {content.HIT_REQUESTS_LIS_C}
              </li>
            </ul>
          </div>
        </div>
        <div
          onClick={(e) => handleClickRequestBoxes(e)}
          className={cx("requestBox", proRequestBoxSelected)}
          id="proRequestBox"
        >
          <div className="requestBoxContents">
            <label>{content.PRO_REQUESTS_TITLE}</label>
            <ul>
              <li>
                <div className="checkIconContainer">
                  <Icon className={cx("checkIcon")} iconName={proCheckIcons} />
                </div>
                {content.PRO_REQUESTS_LIS_A}
              </li>
              <li>
                <div className="checkIconContainer">
                  <Icon className={cx("checkIcon")} iconName={proCheckIcons} />
                </div>
                {content.PRO_REQUESTS_LIS_B}
              </li>
              <li>
                <div className="checkIconContainer">
                  <Icon className={cx("checkIcon")} iconName={proCheckIcons} />
                </div>
                {content.PRO_REQUESTS_LIS_C}
              </li>
            </ul>
          </div>
        </div>
      </div>
      {containerContents}
      <FooterNav />
    </div>
  );
};

export default ListenerPreferencesComponent;
