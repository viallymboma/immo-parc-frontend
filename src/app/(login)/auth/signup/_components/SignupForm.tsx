"use client";
import React from 'react';

import { EyeOffIcon } from 'lucide-react';
import {
  useRouter,
  useSearchParams,
} from 'next/navigation';
import {
  SubmitHandler,
  useForm,
} from 'react-hook-form';

import InputField from '@/components/FormElements/InputElement/InputField';
import {
  EmailSvgIcon,
  EyeSvgIcon,
  PasswordSvgIcon,
  UserSvgIcon,
} from '@/components/svgs/SvgIcons';
import { Button } from '@/components/ui/button';
import apiClient from '@/lib/apiClient';

type SignupFormType = {
  firstName?: string; 
  lastName?: string; 
  email?: string; 
  phone: string; 
  password: string; 
  parentId: string; 
  confirmPassword: string; 
}

const SignupForm = () => {

  const {
    register, 
    handleSubmit, 
    reset, 
    formState: {errors, isValid }, 
  } = useForm <SignupFormType> (); 

  const [ showPassword, setShowPassword ] = React.useState <boolean> (false)

  const router = useRouter (); 
  const searchParams = useSearchParams();
  // Extract the "supervisor" parameter from the URL
  const supervisor = searchParams.get('supervisor') || ''; 

  const onSubmit: SubmitHandler<SignupFormType> = async (data) => {
    data = {
      ...data, 
      parentId: supervisor
    }
    console.log(data, "what is going?"); 
    // return
    const response = await apiClient.post('/users/create-regular-user', data); 
    router.push ("/auth/signin"); 
    // return response.data; 
  }

  return (
    <form onSubmit={handleSubmit (onSubmit)}>
      <InputField 
        label='Prenom'
        name='firstName'
        register={
          register('firstName', { required: false, minLength: 3 })
        }
        svg={ <UserSvgIcon /> }
        type='text'
        placeholder='Entrez votre prenom'
      />

      <InputField 
        label='Nom'
        name='lastName'
        register={
          register('lastName', { required: false, minLength: 3 })
        }
        svg={ <UserSvgIcon /> }
        type='text'
        placeholder='Entrez votre surnom'
      />

      <InputField 
        label='Email'
        name='email'
        register={
          register('email', { required: false, minLength: 3 })
        }
        svg={ <EmailSvgIcon /> }
        type='email'
        placeholder='Entrez votre email'
      />

      <InputField 
        label='Numéro de téléphone'
        name='phone'
        register={
          register('phone', { 
            required: true, 
            pattern: /^(6(9|7|6|5|2|8)[0-9]{7}|2[0-9]{8})/
            // pattern: /^6(9|7|6|5|2|8)[0-9]{7}$/,
          })
        }
        svg={ <EmailSvgIcon /> }
        type='number'
        placeholder='Entrez le numéro de téléphone'
        error={ errors?.phone }
        errorMessage='Phone number invalid'
      />

      <div className='relative'>

        <InputField 
          label='Mot de passe'
          name='password'
          register={
            register('password', { 
              required: true, 
              minLength: 8,
              pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()]).{8,}$/
            })
          }
          svg={ <PasswordSvgIcon /> }
          type={ showPassword ? 'text' : 'password'}
          placeholder='Entrez votre mot de passe'
          error={ errors?.password }
          errorMessage='Mot de passe'
        />

        <div onClick={() => setShowPassword (showPassword => !showPassword)} className='absolute right-[15%] cursor-pointer top-[60%] rounded-full '>
          { showPassword ? <EyeSvgIcon /> : <EyeOffIcon />}
        </div>
        
      </div>

      <div className='relative'>
        <InputField 
          label='Confirmer mot de pass'
          name='confirmPassword'
          register={
            register('confirmPassword', { 
              required: true, 
              minLength: 8,
              pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()]).{8,}$/
            })
          }
          svg={ <PasswordSvgIcon /> }
          type={ showPassword ? 'text' : 'password'}
          placeholder='Confirmez votre mot de passe'
          error={ errors?.confirmPassword }
          errorMessage='Confirmer mot de passe'
        />
        <div onClick={() => setShowPassword (showPassword => !showPassword)} className='absolute right-[15%] cursor-pointer top-[60%] rounded-full '>
          { showPassword ? <EyeSvgIcon /> : <EyeOffIcon />}
        </div>
      </div>


      <div className="mb-4.5">
        <Button
          type="submit"
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary p-4 font-medium text-white transition hover:bg-opacity-90"
        >
          Créer
        </Button>
      </div>
    </form>
  );
}

export default SignupForm; 











{/* <svg class="fill-current" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M10.9975 1.146C8.59278 1.146 6.64335 3.09542 6.64335 5.50016C6.64335 7.9049 8.59278 9.85433 10.9975 9.85433C13.4023 9.85433 15.3517 7.9049 15.3517 5.50016C15.3517 3.09542 13.4023 1.146 10.9975 1.146ZM8.01835 5.50016C8.01835 3.85481 9.35217 2.521 10.9975 2.521C12.6429 2.521 13.9767 3.85481 13.9767 5.50016C13.9767 7.14551 12.6429 8.47933 10.9975 8.47933C9.35217 8.47933 8.01835 7.14551 8.01835 5.50016Z" fill=""></path><path fill-rule="evenodd" clip-rule="evenodd" d="M10.9975 11.2293C8.87676 11.2293 6.92287 11.7114 5.47501 12.5258C4.04871 13.3281 2.97669 14.5441 2.97669 16.0418L2.97662 16.1353C2.97559 17.2003 2.97429 18.537 4.14673 19.4917C4.72374 19.9616 5.53096 20.2958 6.62154 20.5165C7.71518 20.7379 9.14056 20.8543 10.9975 20.8543C12.8545 20.8543 14.2799 20.7379 15.3735 20.5165C16.4641 20.2958 17.2713 19.9616 17.8483 19.4917C19.0207 18.537 19.0194 17.2003 19.0184 16.1353L19.0184 16.0418C19.0184 14.5441 17.9463 13.3281 16.52 12.5258C15.0722 11.7114 13.1183 11.2293 10.9975 11.2293ZM4.35169 16.0418C4.35169 15.2614 4.92128 14.4149 6.14912 13.7242C7.35542 13.0457 9.06819 12.6043 10.9975 12.6043C12.9269 12.6043 14.6396 13.0457 15.8459 13.7242C17.0738 14.4149 17.6434 15.2614 17.6434 16.0418C17.6434 17.2406 17.6064 17.9155 16.9801 18.4255C16.6404 18.7021 16.0726 18.9721 15.1007 19.1688C14.1318 19.3649 12.8072 19.4793 10.9975 19.4793C9.18781 19.4793 7.8632 19.3649 6.89433 19.1688C5.92242 18.9721 5.35463 18.7021 5.01498 18.4255C4.38864 17.9155 4.35169 17.2406 4.35169 16.0418Z" fill=""></path></svg> */}
{/* <div className="mb-6 flex items-center justify-between gap-2 py-2">
        <label
          htmlFor="remember"
          className="flex cursor-pointer select-none items-center font-satoshi text-base font-medium text-dark dark:text-white"
        >
          <input
            type="checkbox"
            name="remember"
            id="remember"
            className="peer sr-only"
          />
          <span
            className={`mr-2.5 inline-flex h-5.5 w-5.5 items-center justify-center rounded-md border border-stroke bg-white text-white text-opacity-0 peer-checked:border-primary peer-checked:bg-primary peer-checked:text-opacity-100 dark:border-stroke-dark dark:bg-white/5 ${
              data.remember ? "bg-primary" : ""
            }`}
          >
            <svg
              width="10"
              height="7"
              viewBox="0 0 10 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.70692 0.292787C9.89439 0.480314 9.99971 0.734622 9.99971 0.999786C9.99971 1.26495 9.89439 1.51926 9.70692 1.70679L4.70692 6.70679C4.51939 6.89426 4.26508 6.99957 3.99992 6.99957C3.73475 6.99957 3.48045 6.89426 3.29292 6.70679L0.292919 3.70679C0.110761 3.51818 0.00996641 3.26558 0.0122448 3.00339C0.0145233 2.74119 0.119692 2.49038 0.3051 2.30497C0.490508 2.11956 0.741321 2.01439 1.00352 2.01211C1.26571 2.00983 1.51832 2.11063 1.70692 2.29279L3.99992 4.58579L8.29292 0.292787C8.48045 0.105316 8.73475 0 8.99992 0C9.26508 0 9.51939 0.105316 9.70692 0.292787Z"
                fill="currentColor"
              />
            </svg>
          </span>
          Remember me
        </label>

        <Link
          href="/auth/forgot-password"
          className="select-none font-satoshi text-base font-medium text-dark underline duration-300 hover:text-primary dark:text-white dark:hover:text-primary"
        >
          Forgot Password?
        </Link>
      </div> */}