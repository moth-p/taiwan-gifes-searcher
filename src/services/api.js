import axios from "axios";

const ProductsDatas_URL =
  "https://data.moa.gov.tw/Service/OpenData/ODwsv/ODwsvAgriculturalProduce.aspx?&UnitId=197";

export const fetchGiftsData = async () => {
  try {
    const response = await axios.get(ProductsDatas_URL);
    return response.data;
  } catch (error) {
    console.error("資料取得失敗：", error);
    return [];
  }
};
