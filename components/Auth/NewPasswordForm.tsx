'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { NewPasswordSchema } from '@/schemas';
import { z } from 'zod';

import CardWrapper from './CardWrapper';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '../ui/modifiedInput';
import { Button } from '../ui/button';
import FormError from '../FormError';
import FormSuccess from '../FormSuccess';
import { useCallback, useEffect, useState, useTransition } from 'react';
import { newPassword } from '@/actions/new-password';
import { useRouter } from 'next/navigation';

interface NewPasswordFormProps {
  token: string;
}

const NewPasswordForm = ({token}: NewPasswordFormProps) => {
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition();

  const [countdown, setCountdown] = useState<number | null>(5);

  const router = useRouter()

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: ''
    },
  });

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setError('');
    setSuccess('');

    startTransition(() => {
      newPassword(values, token).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };

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
    <CardWrapper
      headerLabel="Enter a new password"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
    >
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter your new password here"
                      type="password"
                      disabled={isPending || !!success}
                      eye
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type="submit" className="w-full" disabled={isPending || !!success}>
            Reset password
          </Button>
          {success && (
            <div className="text-center text-blue-500">
              Returning to login in {countdown} seconds
            </div>
          )}
        </form>
      </Form>
    </CardWrapper>
  );
};

export default NewPasswordForm;
