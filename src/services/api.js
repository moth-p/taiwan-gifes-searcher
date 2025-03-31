import axios from "axios";

const API_URL =
  "https://data.moa.gov.tw/Service/OpenData/ODwsv/ODwsvAgriculturalProduce.aspx?&UnitId=197";

export const fetchGiftsData = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("資料取得失敗：", error);
    return [];
  }
};
