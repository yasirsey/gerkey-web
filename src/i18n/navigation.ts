import {createNavigation} from 'next-intl/navigation';
import {routing} from './routing';

// Next.js navigation API'lerinin hafif sarmalayıcıları
// routing konfigürasyonunu dikkate alır
export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation(routing); 