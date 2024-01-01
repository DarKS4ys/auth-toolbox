"use client"

import React, { useCallback, useEffect, useState } from 'react'
import CardWrapper from './CardWrapper'
import { ScaleLoader } from 'react-spinners'
import { newVerification } from '@/actions/new-verification'
import FormSuccess from '../FormSuccess'
import FormError from '../FormError'

interface NewVerificationFormProps {
    token: string
}

export default function NewVerificationForm({token}: NewVerificationFormProps) {

    const [error, setError] = useState<string | undefined>()
    const [success, setSuccess] = useState<string | undefined>()

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

  return (
    <CardWrapper headerLabel='Confirming your verification' backButtonHref='/auth/login' backButtonLabel='Back to login'>
        <div className='flex items-center w-full justify-center'>
            {!success && !error && (
                <ScaleLoader/>
            )}
            <FormSuccess message={success} />
            {!success && (
                <FormError message={error} />
            )}
        </div>
    </CardWrapper>
  )
}
