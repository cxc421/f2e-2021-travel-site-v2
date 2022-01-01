export type City =
  | "Taipei"
  | "NewTaipei"
  | "Taoyuan"
  | "Taichung"
  | "Tainan"
  | "Kaohsiung"
  | "Keelung"
  | "Hsinchu"
  | "HsinchuCounty"
  | "MiaoliCounty"
  | "ChanghuaCounty"
  | "NantouCounty"
  | "YunlinCounty"
  | "ChiayiCounty"
  | "Chiayi"
  | "PingtungCounty"
  | "YilanCounty"
  | "HualienCounty"
  | "TaitungCounty"
  | "KinmenCounty"
  | "PenghuCounty"
  | "LienchiangCounty";

const cities: ReadonlyArray<{ text: string; value: City }> = [
  { text: "Taipei", value: "Taipei" },
  { text: "NewTaipei", value: "NewTaipei" },
  { text: "Taoyuan", value: "Taoyuan" },
  { text: "Taichung", value: "Taichung" },
  { text: "Tainan", value: "Tainan" },
  { text: "Kaohsiung", value: "Kaohsiung" },
  { text: "Keelung", value: "Keelung" },
  { text: "Hsinchu", value: "Hsinchu" },
  { text: "HsinchuCounty", value: "HsinchuCounty" },
  { text: "MiaoliCounty", value: "MiaoliCounty" },
  { text: "ChanghuaCounty", value: "ChanghuaCounty" },
  { text: "NantouCounty", value: "NantouCounty" },
  { text: "YunlinCounty", value: "YunlinCounty" },
  { text: "ChiayiCounty", value: "ChiayiCounty" },
  { text: "Chiayi", value: "Chiayi" },
  { text: "PingtungCounty", value: "PingtungCounty" },
  { text: "YilanCounty", value: "YilanCounty" },
  { text: "HualienCounty", value: "HualienCounty" },
  { text: "TaitungCounty", value: "TaitungCounty" },
  { text: "KinmenCounty", value: "KinmenCounty" },
  { text: "PenghuCounty", value: "PenghuCounty" },
  { text: "LienchiangCounty", value: "LienchiangCounty" },
];

export default cities;
