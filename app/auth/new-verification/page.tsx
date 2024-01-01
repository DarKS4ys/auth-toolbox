import NewVerificationForm from '@/components/Auth/NewVerificationForm';
import { redirect } from 'next/navigation';

interface NewVerificationPageProps {
  searchParams: {
    token: string;
  };
}

export default function NewVerificationPage(
  { searchParams: { token } }: NewVerificationPageProps //? GETS QUERY PARAM (like ?token=blabla -> only the bla bla part cuz its searParams not params)
) {
  
  if (!token) {
    redirect('/') // ? Redirects the user if there is no token
  }

  return <NewVerificationForm token={token} />;
}
