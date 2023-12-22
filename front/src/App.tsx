import { AboutCompany, Advantages, Contact, MainScreen, Partners, Services } from "./components";
import { Footer, Nav } from "./section";

function App() {
  return (
    <div>
      <section>
        <Nav />
      </section> 
      <section>
        <MainScreen />
      </section>
      <section  className="pt-16 bg-bg-main">
        <Advantages />
      </section>
      <section  className="pt-16 bg-main-dark">
        <Services />
      </section>
      <section  className=" bg-bg-main">
        <AboutCompany />
      </section>
      <section  className="pt-16 bg-main-dark">
      <Partners />
      </section>
      <section  className=" bg-bg-main">
        <Contact />
      </section>
      <section  className=" pt-16 bg-[#414141]">
        <Footer />
      </section>
    </div>
  );
}

export default App;