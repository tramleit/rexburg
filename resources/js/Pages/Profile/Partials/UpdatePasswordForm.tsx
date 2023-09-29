import { useRef, type FormEventHandler, type ReactElement } from 'react'
import { useForm } from '@inertiajs/react'
import { Transition } from '@headlessui/react'
import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import { PrimaryButton } from '@/Components/Buttons'
import TextInput from '@/Components/TextInput'

export default function UpdatePasswordForm ({ className = '' }: { className?: string }): ReactElement {
  const passwordInput = useRef<HTMLInputElement>()
  const currentPasswordInput = useRef<HTMLInputElement>()

  const {
    data, setData, errors, put, reset, processing, recentlySuccessful
  } = useForm({
    current_password: '',
    password: '',
    password_confirmation: ''
  })

  const updatePassword: FormEventHandler = (e) => {
    e.preventDefault()

    put(route('password.update'), {
      preserveScroll: true,
      onSuccess: () => { reset() },
      onError: () => {
        if (errors.password !== undefined) {
          reset('password', 'password_confirmation')
          passwordInput.current?.focus()
        }

        if (errors.current_password !== undefined) {
          reset('current_password')
          currentPasswordInput.current?.focus()
        }
      }
    })
  }

  return (
    <section className={className}>
      <header>
        <h2 className="text-lg font-medium text-slate-900 dark:text-slate-100">Update Password</h2>

        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          Ensure your account is using a long, random password to stay secure.
        </p>
      </header>

      <form onSubmit={updatePassword} className="mt-6 space-y-6">
        <div>
          <InputLabel htmlFor="current_password" value="Current Password" />

          <TextInput
            id="current_password"
            ref={currentPasswordInput}
            value={data.current_password}
            onChange={(e) => { setData('current_password', e.target.value) }}
            type="password"
            className="mt-1 block w-full"
            autoComplete="current-password"
          />

          <InputError message={errors.current_password} className="mt-2" />
        </div>

        <div>
          <InputLabel htmlFor="password" value="New Password" />

          <TextInput
            id="password"
            ref={passwordInput}
            value={data.password}
            onChange={(e) => { setData('password', e.target.value) }}
            type="password"
            className="mt-1 block w-full"
            autoComplete="new-password"
          />

          <InputError message={errors.password} className="mt-2" />
        </div>

        <div>
          <InputLabel htmlFor="password_confirmation" value="Confirm Password" />

          <TextInput
            id="password_confirmation"
            value={data.password_confirmation}
            onChange={(e) => { setData('password_confirmation', e.target.value) }}
            type="password"
            className="mt-1 block w-full"
            autoComplete="new-password"
          />

          <InputError message={errors.password_confirmation} className="mt-2" />
        </div>

        <div className="flex items-center gap-4">
          <PrimaryButton disabled={processing}>Save</PrimaryButton>

          <Transition
            show={recentlySuccessful}
            enter="transition ease-in-out"
            enterFrom="opacity-0"
            leave="transition ease-in-out"
            leaveTo="opacity-0"
          >
            <p className="text-sm text-slate-400">Saved.</p>
          </Transition>
        </div>
      </form>
    </section>
  )
}
