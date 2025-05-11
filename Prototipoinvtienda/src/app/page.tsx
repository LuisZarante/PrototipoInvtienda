// Redirect root to login page
import { redirect } from 'next/navigation';

export default function RootPage() {
  redirect('/login');
}
