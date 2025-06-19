import { redirect } from 'next/navigation';

export default function AuthRootPage() {
  redirect('/auth/login');
  // Return null atau komponen loading jika diperlukan,
  // meskipun redirect() akan menginterupsi render.
  return null;
}
