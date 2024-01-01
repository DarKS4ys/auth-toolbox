"use client"
import { useCallback, useEffect, useState } from 'react'
import CardWrapper from './CardWrapper'
import { ScaleLoader } from 'react-spinners'
import { newVerification } from '@/actions/new-verification'
import FormSuccess from '../FormSuccess'
import FormError from '../FormError'
import { useRouter } from 'next/navigation'

interface NewVerificationFormProps {
    token: string
}

export default function NewVerificationForm({token}: NewVerificationFormProps) {
    const [error, setError] = useState<string | undefined>()
    const [success, setSuccess] = useState<string | undefined>()

    const [countdown, setCountdown] = useState<number | null>(5);

    const router = useRouter()

    // ? IN DEVELOPMENT MODE, IT MIGHT SAY NO TOKEN FOUND AFTER VERIFICATION PROCESS, THATS CUZ THE USEEFFECT RUNS TWICE IN DEVELOPMENT
    // ? YOU CAN IGNORE THE ISSUE SINCE IT WONT BE LIKE THAT IN PRODUCTION.

    const onSubmit = useCallback(() => {
        if (success || error) return

        if (!token) {
            setError("Missing token!")
            return
        }

        newVerification(token)
            .then((data) => {
                setSuccess(data.success)
                setError(data.error)
            })
            .catch(() => {
                setError("Something went wrong!")
            })
    }, [token, success, error])

    useEffect(() => {
        onSubmit()
    }, [onSubmit])

    const startCountdown = useCallback(() => {
        let timer = 5; // initial countdown value in seconds
    
        const interval = setInterval(() => {
          timer--;
    
          if (timer === 0) {
            clearInterval(interval);
            router.push('/auth/login')
    
            // ? perform actions here once the countdown ends
          }
    
          setCountdown(timer);
        }, 1000); // re-render every second
    
        return interval;
      }, [router])
    
      useEffect(() => {
        if (success) {
          const countdownInterval = startCountdown();
    
          return () => clearInterval(countdownInterval);
        }
      }, [success, startCountdown]);

  return (
    <CardWrapper headerLabel='Confirming your verification' backButtonHref='/auth/login' backButtonLabel='Back to login'>
        <div className='flex items-center w-full justify-center'>
            {!success && !error && (
                <ScaleLoader/>
            )}
            <FormSuccess message={success} />

            {success && (
                <div className="text-center text-blue-500">
                    Returning to login in {countdown} seconds
                </div>
            )}

            {!success && (
                <FormError message={error} />
            )}
        </div>
    </CardWrapper>
  )
}
