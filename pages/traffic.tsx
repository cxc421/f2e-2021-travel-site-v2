import type { NextPage, GetStaticProps } from "next";
import sharedStyle from "../styles/shared.module.scss";
import { Button } from "../components/button/button";
import { Header } from "../components/header/header";
import { CustomSelectbox } from "../components/selectbox/custom-selectbox";
import cities from "../constants/cities";

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

const MobileFilter = () => {
  const cityOptions = [{ value: "", text: "選擇縣市" }].concat(cities);
  const pathOptions = [
    { value: "", text: "選擇路線" },
    { value: "A", text: "河山東線" },
    { value: "B", text: "北投竹子湖線" },
  ];

  return (
    <div className={sharedStyle.mobileFilterContainer}>
      <CustomSelectbox
        options={cityOptions}
        defaultValue=""
        className={sharedStyle.mobileSelectbox}
      />
      <CustomSelectbox
        options={pathOptions}
        defaultValue=""
        className={sharedStyle.mobileSelectbox}
      />
      <Button bgColor="red" size={40} className={sharedStyle.sendButton}>
        送出
      </Button>
    </div>
  );
};

const Traffic: NextPage = () => {
  return (
    <>
      <Header mobileFilterContent={<MobileFilter />} />
    </>
  );
};

export default Traffic;
