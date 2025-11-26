import Banner from "../components/Banner";
import FeaturedSection from "../components/FeaturedSection";
import Newsletter from "../components/Newsletter";
import OfferSection from "../components/OfferSection";
import { PageTitle } from "../components/PageTitle";
import Testimonials from "../components/Testimonials";
import BlogList from "./BlogList";
import "../../src/App.css";
import { useEffect } from "react";
import Faq from "./Faq";
import WhyChooseUs from "../components/WhyChooseUse";

const Home = () => {
  useEffect(() => {
    document.title = "Home | Bi-Cycle Store";
  }, []);

  return (
    <div>
      <PageTitle title="Home"></PageTitle>
      <Banner></Banner>
      {/* <FeaturedSection></FeaturedSection> */}
      <OfferSection></OfferSection>
      <BlogList></BlogList>
      <Newsletter></Newsletter>
      <WhyChooseUs></WhyChooseUs>
      <Faq></Faq>
      <Testimonials></Testimonials>
    </div>
  );
};

export default Home;
