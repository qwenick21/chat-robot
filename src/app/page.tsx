import { checkPermissions } from '@/lib/auth'

export default async function Home() {
  const permissions = await checkPermissions();
  return (
    <h2>{ permissions ? 'Add or select a chat to start your journey' : 'Please login or contact the administrator for permission' }</h2>
  )
}
