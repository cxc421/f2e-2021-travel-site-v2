// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import jsSHA from "jssha";

const getAuthorizationHeader = function () {
  var AppID = "f54807a14a41432585d1f9126577a44e";
  var AppKey = "35LEn2lV_kg8qtXbKG87eQ073aE";

  var UTCString = new Date().toUTCString();
  var ShaObj = new jsSHA("SHA-1", "TEXT");
  ShaObj.setHMACKey(AppKey, "TEXT");
  ShaObj.update("x-date: " + UTCString);
  var HMAC = ShaObj.getHMAC("B64");
  const Authorization = `hmac username="${AppID}", algorithm="hmac-sha1", headers="x-date", signature="${HMAC}"`;

  return {
    Authorization: Authorization,
    "X-Date": UTCString,
    "Accept-Encoding": "gzip",
  };
};

export default function stationHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  axios
    .get(
      "https://ptx.transportdata.tw/MOTC/v2/Rail/TRA/Station?$top=10&$format=JSON",
      {
        // 欲呼叫之API網址(此範例為台鐵車站資料)
        headers: getAuthorizationHeader(),
      }
    )
    .then(function (response) {
      // console.log(response.data);
      res.status(200).send(response.data);
    })
    .catch((err) => {
      res.status(500).send(err.toString());
    });
}
