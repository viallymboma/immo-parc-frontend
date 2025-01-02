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
import toast from 'react-hot-toast';

import InputField from '@/components/FormElements/InputElement/InputField';
import {
  EmailSvgIcon,
  EyeSvgIcon,
  PasswordSvgIcon,
  UserSvgIcon,
} from '@/components/svgs/SvgIcons';
import { Button } from '@/components/ui/button';
import apiClient from '@/lib/apiClient';
import { passwordRules } from '@/lib/constants';

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
    formState: { isLoading, isSubmitting, isSubmitted, errors, isValid }, 
  } = useForm <SignupFormType> (); 

  const [ showPassword, setShowPassword ] = React.useState <boolean> (false)
  const [password, setPassword] = React.useState("");
  const [passwordValidations, setPasswordValidations] = React.useState({
    minLength: false,
    uppercase: false,
    lowercase: false,
    digit: false,
    specialChar: false,
  });

  React.useEffect(() => {
    console.log(passwordValidations);
  }, [passwordValidations]);

  const validatePassword = (password: string) => {
    setPasswordValidations({
      minLength: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      digit: /\d/.test(password),
      specialChar: /[!@#$%^&*()]/.test(password),
    });
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPassword(value);
    validatePassword(value);
  };

  const router = useRouter (); 
  const searchParams = useSearchParams();
  // Extract the "supervisor" parameter from the URL
  const supervisor = searchParams.get('supervisor') || ''; 

  const onSubmit: SubmitHandler<SignupFormType> = async (data) => {
    console.log(supervisor, "supervisors")
    if (!supervisor) {
      toast.error("Obtenez un lien d'enregistrement au pres de celui qui vous invite.")
      return null
    }
    data = {
      ...data, 
      parentId: supervisor
    }
    try {
      await apiClient.post('/users/create-regular-user', data, { withCredentials: true });
      toast.success("Enregistrement réussie !")
      router.push("/auth/signin");
    } catch (error: any) {
      // Check if the error is from Axios and has a response
      if (error.response) {
        console.error("Error Response:", error.response.data); // The server response
        console.error("Error Status:", error.response.status); // HTTP status code
        console.error("Error Headers:", error.response.headers); // Response headers
        // Optionally show the error message in the UI
        toast.error(`Error: ${error.response.data.error || 'Something went wrong!'}`)
      } else if (error.request) {
        // No response was received from the server
        console.error("Erreur Request:", error.request);
        toast.error(`Erreur Request: ${error.request || 'Something went wrong!'}`)
      } else {
        // Something went wrong while setting up the request
        console.error("Error Message:", error.message);
        toast.error(`Erreur Message: ${error.request || 'Something went wrong!'}`)
      }
    }
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
              pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()]).{8,}$/,
              onChange(event) {
                handlePasswordChange (event)
              },
            })
          }
          svg={ <PasswordSvgIcon /> }
          type={ showPassword ? 'text' : 'password'}
          placeholder='Entrez votre mot de passe'
          error={ errors?.password }
          errorMessage='Mot de passe'
          // onChangeProp={handlePasswordChange}
        />

        <div onClick={() => setShowPassword (showPassword => !showPassword)} className='absolute right-[15%] cursor-pointer top-[60%] rounded-full '>
          { showPassword ? <EyeSvgIcon /> : <EyeOffIcon />}
        </div>
        
      </div>

      {/* Password Validation Rules */}
      <div className="mt-2 space-y-1 text-sm">
        {Object.entries(passwordRules).map(([key, rule]) => (
          <p
            key={key}
            className={`${
              passwordValidations[key as keyof typeof passwordValidations]
                ? "text-green-500"
                : "text-gray-500"
            }`}
          >
            {passwordValidations[key as keyof typeof passwordValidations] ? "✔" : "✘"} {rule}
          </p>
        ))}
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
          disabled={isSubmitting} // Disable button during submission
          className={`flex w-full items-center justify-center gap-2 rounded-lg p-4 font-medium text-white transition ${
            isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-primary hover:bg-opacity-90"
          }`}
        >
          {isSubmitting ? "Connexion en cours..." : "Créer"}
        </Button>
      </div>

      {/* Loading/Success Indicators */}
      {isLoading && <p className="text-center text-blue-500">Chargement...</p>}
      {/* {isSubmitted && !isSubmitting && (
        <p className="text-center text-green-500">Enregistrement réussie !</p>
      )} */}
    </form>
  );
}

export default SignupForm; 








