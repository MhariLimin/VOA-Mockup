/* Addresses renamed on 5 October 2026, when the client supplied the final page URLs
   (VOA_Redirect_Map.xlsx, "New routes"). Old mockup links that were already shared keep working:
   App.tsx sends each old address to its new one. The live WordPress site's own old addresses are a
   separate list, in docs/wordpress-integration/redirects.csv. */
export const renamedRoutes: Readonly<Record<string, string>> = {
  '/services/mortgage-loans': '/services/mortgage-loans-processing-virtual-support',
  '/services/financial-planning': '/services/virtual-financial-planning-and-admin-assistant',
  '/services/accounting-bookkeeping': '/services/accounting-and-bookkeeping-virtual-assistant',
  '/services/insurance-processing': '/services/insurance-processing-virtual-assistance',
  '/services/real-estate-conveyancing': '/services/real-estate-virtual-assistant-services',
  '/services/back-office-admin': '/services/executive-and-administrative-virtual-assistance',
  '/services/digital-marketing': '/services/digital-marketing-virtual-assistant-services',
  '/services/sales-marketing': '/services/sales-and-e-commerce-virtual-assistant',
  '/services/creative-copywriting': '/services/creative-copywriting-virtual-assistant',
  '/services/it-technology': '/services/it-virtual-assistant-services',
  '/why-voa': '/managed-virtual-support',
};
