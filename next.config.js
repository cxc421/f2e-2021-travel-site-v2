/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/attractions",
        permanent: true,
      },
    ];
  },
  images: {
    domains: [
      "www.taiwan.net.tw",
      "www.trimt-nsa.gov.tw",
      "tourism.chcg.gov.tw",
      "www.amazing-pingtung.com",
      "www.eastcoast-nsa.gov.tw",
      "www.penghu-nsa.gov.tw",
      "travel.nantou.gov.tw",
      "www.matsu-nsa.gov.tw",
      "www.sunmoonlake.gov.tw",
      "newtaipei.travel",
      "www.travel.taipei",
      "cloud.culture.tw",
      "travel.chiayi.gov.tw",
      "swcoast-nsa.travel",
      "khh.travel",
      "www.siraya-nsa.gov.tw",
      "210.69.151.212",
      "www.erv-nsa.gov.tw",
    ],
  },
};
