'use server';

import { redirect } from 'next/navigation';

export async function search(formData: FormData) {
  // nimmt den Suchbegriff aus dem FormData entgegen und leitet auf /search?term=term weiter
  const term = formData.get('term');

  if (typeof term !== 'string' || !term) {
    redirect('/');
  }

  redirect(`/search?term=${term}`);
}
