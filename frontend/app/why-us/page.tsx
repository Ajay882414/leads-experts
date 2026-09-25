import Header from '@/components/common/Header';
import CareerPathsSection from '@/components/ui/CareerPathsSection';
import ContactAndFooter from '@/components/ui/ContactAndFooter';
import EntrepreneursSection from '@/components/ui/EntrepreneursSection';
import FaqSection from '@/components/ui/FaqSection';
import WhyUsSection from '@/components/ui/WhyUsSection';
import DataGuaranteeCard from '@/components/why-us/DataGuaranteeCard';
import WhyUsHero from '@/components/why-us/WhyUsHero';
import React from 'react';

const Page = () => {
    return (
        <div>
            <Header/>
            <WhyUsHero/>
            <WhyUsSection/>
            <EntrepreneursSection/>
            <CareerPathsSection/>
            <DataGuaranteeCard/>
            <FaqSection/>
            <ContactAndFooter/>

        </div>
    );
}

export default Page;
