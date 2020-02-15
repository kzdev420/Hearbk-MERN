import React from "react";
import cx from "classnames";
import sortBy from "lodash/sortBy";
import InputMask from "react-input-mask";
import content from "./content";
import "./styles.scss";
import Icon from "../../../common/IconComponent";
import InputField from "../../../common/InputField";
import Button from "../../../common/Button";
import AutoComplete from "react-google-autocomplete";
const DetailsComponent = ({
  handleClickToggleAddList,
  handleClickAddGenres,
  handleClickAddTags,
  genresList,
  tagsList,
  genresAdded,
  tagsAdded,
  city,
  dob,
  gender,
  genres,
  tags,
  onInputChange,
  handleGenderChange,
  disabled
}) => {
  const genderBoxArray = content.GENDER.map((g, i) => {
    return (
      <div className="genderBoxButtonWrapper" key={i}>
        <Button
          buttonText={g}
          id="gender"
          className={cx("genderBoxSelectors", g === gender && "selected")}
          onClick={disabled ? "" : () => handleGenderChange(g)}
        />
      </div>
    );
  });
  const genresNameArray = sortBy(genres, genre => genre.name);
  const addGenresArray = genresNameArray.map((genre, i) => {

    return (
      <div className="addGenresButtonWrapper" key={i}>
        <Button
          buttonText={genre.name.toUpperCase()}
          className={cx("addGenresLis")}
          onClick={(e) => handleClickAddGenres(e, genre)}
        />
      </div>
    );
  });
  const addGenresSelectedArray = genresAdded.map((genre, i) => {
    return (
      <div className="addGenresSelectedButtonWrapper" key={i}>
        <Button
          buttonText={genre.name.toUpperCase()}
          className={cx("addGenresSelectedLis")}
          onClick={disabled ? "" : (e) => handleClickAddGenres(e, genre)}
        />
      </div>
    );
  });
  const tagsNameArray = sortBy(tags, tag => tag.tag);
  const addTagsArray = tagsNameArray.map((tag, i) => {
    return (
      <div className="addTagsButtonWrapper" key={i}>
        <Button
          buttonText={tag.tag.toUpperCase()}
          className={cx("addTagsLis")}
          onClick={(e) => handleClickAddTags(e, tag)}
        />
      </div>
    );
  });
  const addTagsSelectedArray = tagsAdded.map((tag, i) => {
    return (
      <div className="addTagsSelectedWrapper" key={i}>
        <Button
          buttonText={tag.tag.toUpperCase()}
          className={cx("addTagsSelectedLis")}
          onClick={disabled ? "" : (e) => handleClickAddTags(e, tag)}
        />
      </div>
    );
  });

  let addGenresList = genresList ? (
    <ul className="addGenresList">{addGenresArray}</ul>
  ) : (
    ""
  );
  let addTagsList = tagsList ? (
    <ul className="addTagsList">{addTagsArray}</ul>
  ) : (
    ""
  );

  return (
    <div className="formInputContainer">
      <label htmlFor="cityName" className="formInputLabel">
        {content.CITY_LABEL}
      </label>
      <AutoComplete
        id="city"
        className="formInputField"
        style={{width: '90%'}}
        onPlaceSelected={e => {
          onInputChange({
            id: "location",
            city: e.formatted_address
          })
        }}
        onChange={onInputChange}
        value={city}
        types={['(cities)']}
        placeholder={content.CHOOSE_CITY}
        disabled={disabled}
      />
      <div className="formInputLabel">{content.GENDER_LABEL}</div>
      <div className="form genderBoxRow">{genderBoxArray}</div>
      <label htmlFor="dateOfBirth" className="formInputLabel">
        {content.DOB_LABEL}
      </label>
      <InputMask
        id="dob"
        className="formInputField"
        maskChar=""
        maskPlaceholder=""
        mask="99-99-9999"
        value={dob}
        onChange={onInputChange}
        placeholder={content.DOB}
        disabled={disabled}
      />
      <label htmlFor="genresInputs" className="formInputLabel">
        {content.FAVOURITE_GENRES_LABEL}
      </label>
      <div className="addCircleIconContainer">
        <div
          onClick={disabled ? "" : (e) => handleClickToggleAddList(e, "genres")}
          className="formIconContainer"
        >
          <Icon className="addCircleIcon" iconName="AddCircle" />
        </div>
        {addGenresList}
        </div>
        <InputField
          id="genres"
          className="formInputField"
          onChange={onInputChange}
          placeholder={content.FAVOURITE_GENRES_SEARCH}
          disabled={disabled}
        />
        <ul className="selectedGenresContainer">{addGenresSelectedArray}</ul>
        <hr className="firstHR" />
        <label htmlFor="tagsInputs" className="formInputLabel">
          {content.TAGS_LABEL}
        </label>
        <div className="addCircleIconContainer">
          <div
            onClick={disabled ? "" : (e) => handleClickToggleAddList(e, "tags")}
            className="formIconContainer"
          >
            <Icon className="addCircleIcon" iconName="AddCircle" />
          </div>
          {addTagsList}
        </div>
        <InputField
          id="tags"
          className="formInputField"
          onChange={onInputChange}
          placeholder={content.TAGS_SEARCH}
          disabled={disabled}
        />
        <ul className="selectedTagsContainer">{addTagsSelectedArray}</ul>
        <hr className="lastHR"/>
    </div>
  );
};

DetailsComponent.defaultProps = {
  city: "",
  dateOfBirth: "",
  favouriteGenres: "",
  tags: "",
};

export default DetailsComponent;
