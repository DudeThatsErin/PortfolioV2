'use client';

import { usePathname } from 'next/navigation';
import SashaWidget from './SashaWidget';

// Only show the AI widget on root-level pages (e.g. "/", "/work", "/projects",
// "/contact"). Nested routes like "/codinghelp/appeal" have more than one path
// segment and should not display it.
export default function ConditionalSashaWidget() {
  const pathname = usePathname();
  const segments = (pathname ?? '/').split('/').filter(Boolean);
  const isRootLevel = segments.length <= 1;
  const isDashboard = segments[0] === 'dashboard';

  if (!isRootLevel || isDashboard) return null;
  return <SashaWidget />;
}
