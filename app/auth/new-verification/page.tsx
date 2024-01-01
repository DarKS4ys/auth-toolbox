import NewVerificationForm from '@/components/Auth/NewVerificationForm';

interface NewVerificationPageProps {
  searchParams: {
    token: string;
  };
}

export default function NewVerificationPage(
  { searchParams: { token } }: NewVerificationPageProps //! GETS QUERY PARAM (like ?token=blabla -> only the bla bla part cuz its searParams not params)
) {
  return <NewVerificationForm token={token} />;
}
