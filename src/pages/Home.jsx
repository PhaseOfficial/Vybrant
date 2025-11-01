import HeroSection from '../components/HeroSection';
import Navbar from '../components/Navbar';
// import Explore from '../components/Exploreprod';
import '../App.css';
import Contactus from '../components/Contactus';
import Footer from '../components/footer';
// import Companies from '../components/companies';
import Offer from '../components/Offer';
import Trust from '../components/Trust';
import PartnersSection from '../components/PartnersSection';
// import Carreer from '../components/Carreer';
import Testimonials from '../components/Testimonials';

export default function Home() {
    return (
        <div>
            <Navbar />
            
            <HeroSection className=""/>
            <Offer className=""/>
            {/* <Explore className=""/> */}
            
            <Trust className=""/>
            <Testimonials className="mt-20"/>
            {/* <Companies className=""/> */}
            {/* <Carreer className=""/> */}
            <PartnersSection />
            <Contactus className="mt-20" id="contact"/>
            <Footer className="mt-20"/>

        </div>

           
    );
}
