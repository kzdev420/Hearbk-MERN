import React, { Component } from "react";
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";
import capitalise from "lodash/capitalize";
import ListenerPreferencesComponent from "../../components/ListenerPreferences/ListenerPreferencesComponent";
import { preferencsSelector } from "../../state/selectors/preferences";
import { getGenres, getTags } from "../../state/actions/preferencesActions";
import {
  updateSelectedGenres,
  updateSelectedTags,
} from "../../state/actions/preferencesActions";
import {
  postListenerPreferences,
  getUserDetails,
} from "../../state/actions/userActions";
import moment from "moment";
import { toast } from "react-toastify";

class ListenerPreferencesContainer extends Component {
  state = {
    hitRequestBox: false,
    proRequestBox: false,
    genresList: false,
    tagsList: false,
    toggle: "closed",
    covered: "",
    gender: "",
    city: "",
    bio: "",
    headline: "",
    price: "",
    dob: "",
    saveButtonIsShowing: true,
    menuIsOpen: false,
    loadUserData: false,
    disabled: false,
  };

  componentDidMount() {
    if (!localStorage.getItem("x-access-token")) {
      this.props.history && this.props.history.push("/signin");
      return;
    }
    const {
      getGenresDispatchAction,
      getTagsDispatchAction,
      getUserDetailsDispatchAction,
    } = this.props;
    getGenresDispatchAction();
    getTagsDispatchAction();
    getUserDetailsDispatchAction();
  }

  componentDidUpdate() {
    if (
      this.props.userDetails &&
      !isEmpty(this.props.userDetails) &&
      !this.state.loadUserData &&
      this.props.genres.length > 0 &&
      this.props.tags.length > 0
    ) {
      const {
        favourite_genres = [],
        listener_tags = [],
        feedback_type = [],
      } = this.props.userDetails;
      const selectedGenres = this.props.genres.filter((g) =>
        favourite_genres.includes(g._id)
      );
      const selectedTags = this.props.tags.filter((g) =>
        listener_tags.includes(g._id)
      );
      this.props.updateSelectedGenresDispatchAction(selectedGenres);
      this.props.updateSelectedTagsDispatchAction(selectedTags);

      this.setState({
        gender: capitalise(this.props.userDetails.gender) || "",
        city: this.props.userDetails.city || "",
        bio: this.props.userDetails.bio || "",
        headline: this.props.userDetails.headline || "",
        price: this.props.userDetails.price || "",
        dob:
          moment(this.props.userDetails.date_of_birth, "YYYY-MM-DD").format(
            "MM-DD-YYYY"
          ) || "",
        loadUserData: true,
        hitRequestBox: feedback_type.includes("HIT"),
        proRequestBox: feedback_type.includes("PRO"),
      });
    }
  }

  handleClickRequestBoxes = (e) => {
    const el = e.target;
    if (el.id === "hitRequestBox") {
      this.setState({
        hitRequestBox: !this.state.hitRequestBox,
        saveButtonIsShowing: true,
        ...(this.state.disabled && { disabled: false })
      });
    } else {
      this.setState({
        proRequestBox: !this.state.proRequestBox,
        saveButtonIsShowing: true,
        ...(this.state.disabled && { disabled: false })
      });
    }
  };

  validateFormData = (payload) => {
    const dateIsValid = moment(this.state.dob, "MM-DD-YYYY").isBefore(moment());
    const isFormError = [payload].some((value) => {
      if (value.city.length < 1) {
        toast.error("Enter city");
        return true;
      }
      if (value.gender.length < 1) {
        toast.error("Select a gender");
        return true;
      }
      if (!dateIsValid) {
        toast.error("Enter a valid Date of Birth");
        return true;
      }
      if (this.props.selectedGenres.length < 1) {
        toast.error("Select a genre");
        return true;
      }
      if (this.props.selectedTags.length < 1) {
        toast.error("Select a tag");
        return true;
      }

      if (this.state.proRequestBox) {
        if (value.price.length < 1) {
          toast.error("Enter a price");
          return true;
        }
        if (value.headline.length < 1) {
          toast.error("Enter a send me");
          return true;
        }
        if (value.bio.length < 1) {
          toast.error("Enter a biography");
          return true;
        }
      }

      return false;
    });

    return isFormError;
  };

  handlePostListernerPreferences = () => {
    const {
      hitRequestBox,
      proRequestBox,
      city,
      gender,
      price,
      bio,
      headline,
    } = this.state;
    const { selectedGenres, selectedTags } = this.props;
    const userFeedbackType = [];
    if (hitRequestBox) {
      userFeedbackType.push("HIT");
    }
    if (proRequestBox) {
      userFeedbackType.push("PRO");
    }
    const payload = {
      feedback_type: userFeedbackType,
      favourite_genres: selectedGenres.map((genre) => genre._id),
      listener_tags: selectedTags.map((tag) => tag._id),
      city,
      date_of_birth: moment(this.state.dob, "MM-DD-YYYY").format("YYYY-MM-DD"),
      gender: gender.toLowerCase(),
      ...(proRequestBox && {
        price,
        bio,
        headline,
      }),
    };
    const isFormError = this.validateFormData(payload);
    if (!isFormError) {
      this.props.postListenerPreferenceDispatchAction(payload);
      this.setState({ saveButtonIsShowing: false, disabled: true });
    }
  };

  handleGenderChange = (gender) => {
    this.setState({
      gender,
    });
  };

  onInputChange = (e) => {
    if (e.id === "location") {
      this.setState({
        city: e.city,
      });
    } else {
      this.setState({
        [e.target.id]: e.target.value,
      });
    }
  };

  handleButtonClick = () => {
    this.handlePostListernerPreferences();
  };

  handleClickToggleAddList = (e, type) => {
    if (type === "genres") {
      this.setState({
        genresList: !this.state.genresList,
        tagsList: false,
      });
    } else {
      this.setState({
        genresList: false,
        tagsList: !this.state.tagsList,
      });
    }
  };

  handleClickAddGenres = (e, genreId) => {
    const { selectedGenres, updateSelectedGenresDispatchAction } = this.props;
    let updatedSelectedGenres = [...selectedGenres];
    if (!selectedGenres.includes(genreId)) {
      updatedSelectedGenres.push(genreId);
    } else {
      updatedSelectedGenres = updatedSelectedGenres.filter(
        ({ _id }) => _id !== genreId
      );
    }
    updateSelectedGenresDispatchAction(updatedSelectedGenres);
    this.setState({
      genresList: !this.state.genresList,
    });
  };

  handleClickAddTags = (e, tagId) => {
    const { selectedTags, updateSelectedTagsDispatchAction } = this.props;
    let updatedSelectedTags = [...selectedTags];
    if (!updatedSelectedTags.includes(tagId)) {
      updatedSelectedTags.push(tagId);
    } else {
      updatedSelectedTags = updatedSelectedTags.filter(
        ({ _id }) => _id !== tagId
      );
    }
    updateSelectedTagsDispatchAction(updatedSelectedTags);
    this.setState({ tagsList: !this.state.tagsList });
  };
  handleClickMenuToggle = (toggle) => {
    this.setState({ menuIsOpen: toggle });
  };

  changeToSave = () => {
    this.setState({ saveButtonIsShowing: true, disabled: false });
  };

  render() {
    return (
      <ListenerPreferencesComponent
        city={this.state.city}
        gender={this.state.gender}
        price={this.state.price}
        bio={this.state.bio}
        sendMeText={this.state.headline}
        dob={this.state.dob}
        handleClickRequestBoxes={this.handleClickRequestBoxes}
        handleClickToggleAddList={this.handleClickToggleAddList}
        handleClickAddGenres={this.handleClickAddGenres}
        handleClickAddTags={this.handleClickAddTags}
        hitRequestBox={this.state.hitRequestBox}
        proRequestBox={this.state.proRequestBox}
        genresList={this.state.genresList}
        tagsList={this.state.tagsList}
        genres={this.props.genres}
        tags={this.props.tags}
        genresAdded={this.props.selectedGenres}
        tagsAdded={this.props.selectedTags}
        toggle={this.state.toggle}
        onInputChange={this.onInputChange}
        handleGenderChange={this.handleGenderChange}
        handleButtonClick={this.handleButtonClick}
        saveButtonIsShowing={this.state.saveButtonIsShowing}
        menuIsOpen={this.state.menuIsOpen}
        handleClickMenuToggle={this.handleClickMenuToggle}
        changeToSaveButton={this.changeToSave}
        disabled={this.state.disabled}
      />
    );
  }
}

const mapActions = (dispatch) => ({
  getGenresDispatchAction: () => dispatch(getGenres()),
  getTagsDispatchAction: () => dispatch(getTags()),
  getUserDetailsDispatchAction: () => dispatch(getUserDetails()),
  updateSelectedGenresDispatchAction: (genres) =>
    dispatch(updateSelectedGenres(genres)),
  updateSelectedTagsDispatchAction: (tags) =>
    dispatch(updateSelectedTags(tags)),
  postListenerPreferenceDispatchAction: (payload, navigateToPath) =>
    dispatch(postListenerPreferences(payload, navigateToPath)),
});

export default connect(
  preferencsSelector,
  mapActions
)(ListenerPreferencesContainer);
