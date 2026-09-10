import {redirect} from 'next/navigation';

/** Racine du site : en attendant les pages Payload, on renvoie vers le catalogue. */
export default function Page() {
  redirect('/design');
}
