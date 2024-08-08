import Footer from "./components/footer/Footer";
import Categories_section from "./components/landing-comp/Categories_section";
import Header from "./components/landing-comp/Header";
import Offers_section from "./components/landing-comp/Offers_section";
import NavBar from "./components/navBar/NavBar";

export default function Landing() {
  return (
    <main className="flex flex-col">
        <Header></Header>
        <article className="flex flex-col gap-20 mx-5 md:mx-10 lg:mx-10">
        <Offers_section></Offers_section>
        <Categories_section></Categories_section>
      </article>
    </main>
  );
}
