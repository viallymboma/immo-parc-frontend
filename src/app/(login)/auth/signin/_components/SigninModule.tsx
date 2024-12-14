"use client";
import React from 'react';

import Link from 'next/link';

import GoogleSigninButton from '@/components/Auth/GoogleSigninButton';

// import GoogleSigninButton from './GoogleSigninButton';
import SigninForm from './SigninForm';

const SigninModule = () => {
    return (
        <>
            <GoogleSigninButton text="Connectez-vous" />
            <div className="my-6 flex items-center justify-center">
                <span className="block h-px w-full bg-stroke dark:bg-dark-3"></span>
                    <div className="block w-full min-w-fit bg-white px-3 text-center font-medium dark:bg-gray-dark">
                        Ou connectez-vous avec e-mail
                    </div>
                <span className="block h-px w-full bg-stroke dark:bg-dark-3"></span>
            </div>
            <div>
                <SigninForm />
            </div>
            <div className="mt-6 text-center">
                <p>
                    Vous n'avez pas de compte ?{" "}
                    <Link href="/auth/signup" className="text-primary">
                        Inscrivez-vous
                    </Link>
                </p>
            </div>
        </>
    );
}

export default SigninModule


