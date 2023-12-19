import { AboutCompany, Advantages, MainScreen, Services } from "./components";
import { Nav } from "./section";

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
      <section  className=" bg-main-dark">
        <AboutCompany />
      </section>
    </div>
  );
}

export default App;