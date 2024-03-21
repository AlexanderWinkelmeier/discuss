'use client';

import { useSearchParams } from 'next/navigation';
import { Input } from '@nextui-org/react';
import * as actions from '@/actions';

export function SearchInput() {
  const searchParams = useSearchParams();
  return (
    // die server action bewirkt die Umleitung auf /search?term=term
    // damit wird der query-string in die URL eingefügt
    <form action={actions.search}>
      {/* der defaultValue im Search Input Feld kommt vom query-string aus der umgeleiteten URL */}
      <Input name="term" defaultValue={searchParams.get('term') || ''} />
    </form>
  );
}
