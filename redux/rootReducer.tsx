import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth";
import userReducer from "./userSlice";
import blogReducer from "./blogSlice";
import blogCateReducer from "./blogCateSlice";
import siderReducer from "./sliderSlice";
import voucheReducer from "./voucheSlice";
import prdReducer from "./prdSlice";
import prdColorReducer from "./prdColorSlice";
import prdSizeReducer from "./prdSizeSlice";
import prdCateReducer from "./prdCateSlice";
import commentReducer from "./cmtSlice";
const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  blog: blogReducer,
  blogCate: blogCateReducer,
  slider: siderReducer,
  vouche: voucheReducer,
  prd : prdReducer,
  prdColor: prdColorReducer,
  prdSize: prdSizeReducer,
  prdCate: prdCateReducer,
  cmt: commentReducer
});

export default rootReducer;
