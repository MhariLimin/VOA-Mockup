/* Addresses renamed on 5 October 2026, when the client supplied the final page URLs
   (VOA_Redirect_Map.xlsx, "New routes"), and again on 2 November 2026, when the content writer's SEO
   sheet ("SEO Titles, Meta Descriptions, and URL Slugs for VOA Revamp.xlsx") gave seven services and
   About new slugs. Old mockup links that were already shared keep working: App.tsx sends each old
   address to its new one. The live WordPress site's own old addresses are a separate list, in
   docs/wordpress-integration/redirects.csv. */
export const renamedRoutes: Readonly<Record<string, string>> = {
  '/services/mortgage-loans': '/services/mortgage-loans-processing-virtual-support',
  '/services/financial-planning': '/services/virtual-financial-planning-and-admin-assistant',
  '/services/accounting-bookkeeping': '/services/accounting-and-bookkeeping-virtual-assistant',
  '/services/insurance-processing': '/services/insurance-processing-virtual-assistant-support',
  '/services/real-estate-conveyancing': '/services/real-estate-virtual-assistant-admin-support',
  '/services/back-office-admin': '/services/executive-virtual-assistant-admin-support',
  '/services/digital-marketing': '/services/digital-marketing-virtual-assistant-support',
  '/services/sales-marketing': '/services/sales-and-e-commerce-virtual-assistant-support',
  '/services/creative-copywriting': '/services/copywriting-virtual-assistant-support',
  '/services/it-technology': '/services/it-virtual-assistant-and-tech-support',
  '/why-voa': '/managed-virtual-support',
  '/services/insurance-processing-virtual-assistance': '/services/insurance-processing-virtual-assistant-support',
  '/services/real-estate-virtual-assistant-services': '/services/real-estate-virtual-assistant-admin-support',
  '/services/executive-and-administrative-virtual-assistance': '/services/executive-virtual-assistant-admin-support',
  '/services/digital-marketing-virtual-assistant-services': '/services/digital-marketing-virtual-assistant-support',
  '/services/sales-and-e-commerce-virtual-assistant': '/services/sales-and-e-commerce-virtual-assistant-support',
  '/services/creative-copywriting-virtual-assistant': '/services/copywriting-virtual-assistant-support',
  '/services/it-virtual-assistant-services': '/services/it-virtual-assistant-and-tech-support',
  '/about': '/about-us',
};
