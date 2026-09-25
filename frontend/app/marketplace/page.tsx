import Header from '@/components/common/Header';
import LeadAnatomyPreview from '@/components/marketplace/LeadAnatomyPreview';
import MarketplaceHero from '@/components/marketplace/MarketplaceHero';
import ContactAndFooter from '@/components/ui/ContactAndFooter';
import FaqSection from '@/components/ui/FaqSection';
import LeadPacks from '@/components/ui/LeadPacks';
import MarqueeBanner from '@/components/ui/MarqueeBanner';
import React from 'react';

const Page = () => {
  return (
    <div>
      <Header/>
      <MarketplaceHero/>
      <LeadPacks/>
      <MarqueeBanner/>
      <LeadAnatomyPreview/>
      <FaqSection/>
      <ContactAndFooter/>
    </div>
  );
}

export default Page;
