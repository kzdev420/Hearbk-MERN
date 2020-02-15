import { combineReducers } from "redux";
import userReducer from "./userReducer";
import orderReducer from "./orderReducer";
import preferencesReducer from "./preferencesReducer";
import discoverReducer from "./discoverReducer";

export default combineReducers({
  userDetails: userReducer,
  orderDetails: orderReducer,
  preferences: preferencesReducer,
  discover: discoverReducer,
});
