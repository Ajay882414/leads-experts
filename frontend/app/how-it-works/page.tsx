import Header from '@/components/common/Header';
import DeliveryAssuranceStrip from '@/components/how-it-works/DeliveryAssuranceStrip';
import HowItWorksHero from '@/components/how-it-works/HowItWorksHero';
import MarketplaceCTA from '@/components/how-it-works/MarketplaceCTA';
import ContactAndFooter from '@/components/ui/ContactAndFooter';
import FaqSection from '@/components/ui/FaqSection';
import ProcessSection from '@/components/ui/ProcessSection';
import React from 'react';

const Page = () => {
    return (
        <div>
            <Header/>
            <HowItWorksHero/>
            <ProcessSection/>
            <DeliveryAssuranceStrip/>
            <MarketplaceCTA/>
            <FaqSection/>
            <ContactAndFooter/>
        </div>
    );
}

export default Page;
