import jsSHA from "jssha";

function GetAuthorizationHeader() {
  var AppID = process.env.VUE_APP_ID || "fa1140086f3d47febf92ceaf2d0b5e5b";
  var AppKey = process.env.VUE_APP_KEY || "F8QE_X3zv_mSX5lkjIVCbDz4aQ0";
  var GMTString = new Date().toGMTString();
  var ShaObj = new jsSHA("SHA-1", "TEXT");
  ShaObj.setHMACKey(AppKey, "TEXT");
  ShaObj.update("x-date: " + GMTString);
  var HMAC = ShaObj.getHMAC("B64");
  var Authorization =
    'hmac username="' +
    AppID +
    '", algorithm="hmac-sha1", headers="x-date", signature="' +
    HMAC +
    '"';
  return { Authorization: Authorization, "X-Date": GMTString };
}

export default GetAuthorizationHeader;
