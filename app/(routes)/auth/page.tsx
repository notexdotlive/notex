'use client';

import { useEffect, useState } from 'react';

import {
  useRouter,
  usePathname,
  useSearchParams,
  redirect,
} from '@/infra/next';
import { Icon } from '@/components/icon';
import { useAuth } from '@/contexts/auth-context';

type FormTypes = 'login' | 'register' | 'forgot';

type Required = { label: string; conclusion: boolean; regex: string };

interface Form {
  forms: string[];
  label: string;
  field: string;
  fieldType: string;
  value: string;
  validation: {
    required: boolean;
    minLength: number;
    maxLength: number;
    regex?: string;
    requisites?: Required[];
  };
}

export default function AuthPage() {
  const { user, loading, handleCreateUser, handleLoginEmail } = useAuth();

  const router = useRouter();

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const action = searchParams.get('action');

  const [formType, setFormType] = useState<FormTypes>('login');
  const [form, setForm] = useState<Form[]>([
    {
      forms: ['register'],
      label: 'Username',
      field: 'username',
      fieldType: 'text',
      value: '',
      validation: {
        required: true,
        minLength: 3,
        maxLength: 16,
        requisites: [
          {
            label: 'Between 3 and 16 characters',
            conclusion: false,
            regex: '^.{3,16}$',
          },
          {
            label: 'No special characters',
            conclusion: false,
            regex: '^[a-zA-Z0-9]*$',
          },
        ],
      },
    },
    {
      forms: ['login', 'register', 'forgot'],
      label: 'Email',
      field: 'email',
      fieldType: 'email',
      value: '',
      validation: {
        required: true,
        minLength: 8,
        maxLength: 64,
        regex: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
        requisites: [
          {
            label: 'Valid email address',
            conclusion: false,
            regex: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
          },
          {
            label: 'Use a valid email domain',
            conclusion: false,
            regex:
              '^[a-zA-Z0-9._%+-]+@(?:gmail.com|yahoo.(?:com|com.br)|hotmail.(?:com|com.br)|outlook.(?:com|com.br))$',
          },
        ],
      },
    },
    {
      forms: ['login', 'register'],
      label: 'Password',
      field: 'password',
      fieldType: 'password',
      value: '',
      validation: {
        required: true,
        minLength: 8,
        maxLength: 32,
        requisites: [
          {
            label: 'Between 8 and 32 characters',
            conclusion: false,
            regex: '^.{8,32}$',
          },
          {
            label: 'At least one lowercase letter and one uppercase letter',
            conclusion: false,
            regex: '^(?=.*[a-z])(?=.*[A-Z])',
          },
          {
            label: 'At least one number',
            conclusion: false,
            regex: '^(?=.*[0-9])',
          },
          {
            label: 'At least one special character',
            conclusion: false,
            regex: '^(?=.*[!@#$%^&*])',
          },
        ],
      },
    },
  ]);

  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const handleChangeInputValue = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target;

    const index = form.findIndex((item) => item.field === name);
    const updatedForm = [...form];

    updatedForm[index].value = value;

    const validation = updatedForm[index].validation;

    if (
      !validation.requisites ||
      (validation.requisites && validation.requisites.length === 0)
    )
      return setForm(updatedForm);

    for (const requisite of validation.requisites) {
      const { regex } = requisite;
      const conclusion = new RegExp(regex).test(value);

      requisite.conclusion = conclusion;

      if (!conclusion) return setForm(updatedForm);
    }

    setForm(updatedForm);
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const values = [];
    const fields = form.filter((item) => item.forms.includes(formType));

    for (const field of fields) {
      const { field: name, value } = field;
      values.push({ name, value });
    }

    const data = Object.fromEntries(
      values.map((item) => [item.name, item.value]),
    );

    switch (formType) {
      case 'login':
        await handleLoginEmail(data.email, data.password).then((res) => {
          const { user, error, code } = res;
          if (user) router.push('/notes');
          console.log(code);
          switch (code) {
            case 'auth/user-not-found':
              alert('User not found');
              break;
            case 'auth/invalid-credential':
              alert('Invalid credentials');
              break;
            default:
              if (error) alert('An error occurred');
              break;
          }
        });
        break;
      case 'register':
        await handleCreateUser(data.email, data.password).then((res) => {
          if (res.ok) redirect('/notes');
        });
        break;
      case 'forgot':
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (user) redirect('/notes');
  }, [user]);

  useEffect(() => {
    if (!searchParams.has('action') || user) return;

    switch (action) {
      case 'login':
        setFormType('login');
        break;
      case 'register':
        setFormType('register');
        break;
      case 'forgot':
        setFormType('forgot');
        break;
      default:
        redirect('/auth?action=login');
    }

    const params = new URLSearchParams(searchParams);
    params.delete('action');

    router.replace(`${pathname}?${params.toString()}`);
  }, [searchParams, action, router, pathname, user]);

  return (
    <section className="relative flex flex-1 flex-col items-start justify-center gap-8 w-full h-auto mx-auto p-4 z-0 graph-paper">
      <div className="flex flex-col items-center justify-center gap-8 my-4 w-full max-w-md mx-auto z-50">
        <a href="/" className="flex items-center justify-center gap-2 mx-auto">
          <img
            src="/logos/logo-notex.svg"
            alt="NoteX Logo"
            className="w-auto min-h-10 h-10 object-contain pointer-events-none select-none"
          />
        </a>

        <form
          onSubmit={handleFormSubmit}
          className="flex flex-col items-center justify-center w-full mx-auto bg-zinc-50 border border-zinc-200 rounded-md overflow-hidden"
        >
          <header className="flex flex-1 items-center justify-center w-full max-w-md p-4 bg-zinc-100 border-b border-zinc-200">
            <span className="text-2xl font-medium text-zinc-900 py-2">
              {(() => {
                switch (formType) {
                  case 'login':
                    return 'Welcome back';
                  case 'register':
                    return 'Create an account';
                  case 'forgot':
                    return 'Recover your account';
                  default:
                    break;
                }
              })()}
            </span>
          </header>

          <section className="flex flex-1 flex-col items-start justify-start gap-4 w-full p-8">
            <div className="flex flex-1 flex-col items-start justify-start gap-4 w-full transition-all duration-300 ease-in-out">
              {form.map((item, index) => {
                if (!item.forms.includes(formType)) return;
                const { label, field, fieldType, value, validation } = item;

                const hasPendencies =
                  value !== '' &&
                  validation.requisites &&
                  validation.requisites.length > 0 &&
                  validation.requisites.some(
                    (requisite) => !requisite.conclusion,
                  );

                const handleFocus = () => setFocusedInput(field);
                const handleBlur = () => setFocusedInput(null);

                return (
                  <label
                    key={index}
                    className={`group/input flex flex-1 flex-col items-start justify-start space-y-1 w-full transition-all duration-300 ease-in-out`}
                  >
                    <span
                      className={`flex items-center justify-start text-sm ${hasPendencies && focusedInput !== field ? 'text-rose-500' : 'text-zinc-500'}`}
                    >
                      {label}
                    </span>

                    <input
                      required={validation.required}
                      type={fieldType}
                      name={field}
                      className={`w-full p-2 border ${hasPendencies ? 'border-rose-500' : ' border-zinc-200'} rounded-md transition-all duration-300 ease-in-out`}
                      value={value}
                      onChange={handleChangeInputValue}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    />

                    {formType === 'register' &&
                      validation.requisites &&
                      validation.requisites.length > 0 && (
                        <div
                          className={`h-auto translate-y-0 opacity-0 group-focus-within/input:translate-y-1 group-focus-within/input:opacity-100 group-focus-within/input:!my-2 !mt-0 flex flex-col items-start justify-start gap-1 w-full text-sm text-pretty font-medium text-zinc-500 transition-all duration-300 ease-in-out pointer-events-none select-none overflow-hidden`}
                          style={{
                            height:
                              focusedInput === field ? 'fit-content' : '0px',
                          }}
                        >
                          {validation.requisites &&
                            validation.requisites.map((requisite, index) => {
                              if (!requisite || !requisite.label) return;

                              const { label: requisiteLabel, conclusion } =
                                requisite;

                              return (
                                <span
                                  key={index}
                                  className="flex items-center gap-1"
                                >
                                  <Icon
                                    name={
                                      conclusion ? 'CheckCircle2' : 'XCircle'
                                    }
                                    className={`w-4 h-4 ${
                                      conclusion
                                        ? 'text-emerald-500'
                                        : 'text-rose-500'
                                    }`}
                                  />
                                  <span>{requisiteLabel}</span>
                                </span>
                              );
                            })}
                        </div>
                      )}

                    {formType === 'login' && item.field === 'password' && (
                      <a
                        href="/auth/forgot"
                        className="flex items-center justify-end w-full text-sm text-pretty font-medium text-zinc-500 hover:underline mt-2"
                      >
                        <span>Forgot your password?</span>
                      </a>
                    )}
                  </label>
                );
              })}
            </div>

            <button
              type="submit"
              className="flex flex-1 items-center justify-center w-full px-4 py-2 text-center text-pretty bg-zinc-900 text-zinc-50 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={form.some((item) => {
                if (!item.forms.includes(formType)) return false;
                const { value, validation } = item;

                if (validation.required && !value) return true;

                if (validation.requisites && validation.requisites.length > 0) {
                  return (
                    validation.requisites.some(
                      (requisite) => !requisite.conclusion,
                    ) ||
                    (validation.regex &&
                      !new RegExp(validation.regex).test(value))
                  );
                }
              })}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Icon name="Loader" className="size-4 animate-spin" />
                  <span>Loading...</span>
                </span>
              ) : (
                (() => {
                  switch (formType) {
                    case 'login':
                      return 'Login';
                    case 'register':
                      return 'Register';
                    case 'forgot':
                      return 'Send reset link';
                    default:
                      break;
                  }
                })()
              )}
            </button>
          </section>

          <footer className="flex flex-1 items-center justify-center w-full p-4 bg-zinc-100 border-t border-zinc-200">
            {(() => {
              switch (formType) {
                case 'login':
                  return (
                    <span className="text-sm text-zinc-900">
                      Don&apos;t have an account?{' '}
                      <a
                        href="/auth/register"
                        className="text-pretty font-medium text-rose-500 hover:underline"
                      >
                        Register
                      </a>
                    </span>
                  );
                case 'register':
                  return (
                    <span className="text-sm text-zinc-900">
                      Already have an account?{' '}
                      <a
                        href="/auth/login"
                        className="text-pretty font-medium text-rose-500 hover:underline"
                      >
                        Login
                      </a>
                    </span>
                  );
                case 'forgot':
                  return (
                    <span className="text-sm text-zinc-900">
                      Remembered your password?{' '}
                      <a
                        href="/auth/login"
                        className="text-pretty font-medium text-rose-500 hover:underline"
                      >
                        Login
                      </a>
                    </span>
                  );
                default:
                  break;
              }
            })()}
          </footer>
        </form>

        {(() => {
          switch (formType) {
            case 'login':
              return (
                <a
                  href="/"
                  className="flex items-center justify-center gap-2 text-center text-sm text-pretty font-medium text-zinc-900 hover:underline"
                >
                  <span>Back to home</span>
                </a>
              );
            case 'register':
              return (
                <p className="flex items-center justify-center gap-2 text-center text-sm text-pretty font-medium text-zinc-900">
                  <span>
                    By registering, you agree to our{' '}
                    <a href="/terms" className="text-rose-500 hover:underline">
                      Terms
                    </a>{' '}
                    and{' '}
                    <a
                      href="/privacy"
                      className="text-rose-500 hover:underline"
                    >
                      Privacy Policy
                    </a>
                    .
                  </span>
                </p>
              );
            default:
              break;
          }
        })()}
      </div>
    </section>
  );
}
