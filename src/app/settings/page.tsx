import { redirect } from 'next/navigation'
import { UserNameForm } from '~/components/UserNameForm'

import { authOptions, getServerAuthSession } from '~/server/auth'

export const metadata = {
  title: 'Settings',
  description: 'Manage account and website settings.',
}

export default async function SettingsPage() {
  const session = await getServerAuthSession()

  if (!session?.user) {
    redirect(authOptions?.pages?.signIn ?? '/signin')
  }

  return (
    <div className='max-w-4xl mx-auto py-12'>
      <div className='grid items-start gap-8'>
        <h1 className='font-bold text-3xl md:text-4xl'>Settings</h1>

        <div className='grid gap-10'>
          <UserNameForm
            user={{
              name: session?.user?.name ?? '',
              id: session?.user?.id ?? '',
            }}
          />
        </div>
      </div>
    </div>
  )
}
