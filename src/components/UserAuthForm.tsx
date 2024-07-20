'use client'

import { signIn } from 'next-auth/react'
import * as React from 'react'
import { type FC } from 'react'
import { Button } from '~/components/ui/button'
import { Icons } from './Icons'
import { useToast } from '~/hooks/use-toast'
import { cn } from '~/lib/utils'

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>

const UserAuthForm: FC<UserAuthFormProps> = ({ className, ...props }) => {
  const { toast } = useToast()
  const [isPending, setIsPending] = React.useState<boolean>(false)

  const loginWithGoogle = async () => {
    setIsPending(true)

    try {
      await signIn('google')
    } catch (error) {
      toast({
        title: 'Error',
        description: 'There was an error logging in with Google',
        variant: 'destructive',
      })
    } finally {
      setIsPending(false)
    }
  }

  return (
    <div className={cn('flex justify-center', className)} {...props}>
      <Button
        type='button'
        size='sm'
        className='w-full'
        onClick={loginWithGoogle}
        disabled={isPending}>
        {isPending ? null : <Icons.google className='h-4 w-4 mr-2' />}
        Google
      </Button>
    </div>
  )
}

export default UserAuthForm
