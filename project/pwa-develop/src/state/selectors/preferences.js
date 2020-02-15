export const preferencsSelector = (state) => ({
  genres: state.preferences.genres,
  tags: state.preferences.tags,
  selectedGenres: state.preferences.selectedGenres,
  selectedTags: state.preferences.selectedTags,
  userDetails: state.userDetails.user,
});
