import { useTranslation } from "react-i18next";

import Slider from "../../Components/HeroSection";
import Products from "./Products";
import ContactInfo from "./ContactInfo";
import Category from "./Category";

export default function Home() {
  const { t } = useTranslation();

  return (
    <>
      <title>{t("seo.home.title")}</title>
      <meta
        name="description"
        content={t("seo.home.description")}
      />
      <meta
        name="keywords"
        content={t("seo.home.keywords")}
      />
      <Slider />
      <Products />
      <Category />
      <ContactInfo />
    </>
  );
}