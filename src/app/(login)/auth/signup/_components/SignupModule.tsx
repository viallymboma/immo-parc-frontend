"use client";
import React from 'react';

import Link from 'next/link';

// import GoogleSigninButton from '@/components/Auth/GoogleSigninButton';
import SignupForm from './SignupForm';

const SignupModule = () => {
    return (
        <>
            {/* <GoogleSigninButton text="Enregistrez vous" /> */}
            {/* <div className="my-6 flex items-center justify-center">
                <span className="block h-px w-full bg-stroke dark:bg-dark-3"></span>
                    <div className="block w-full min-w-fit bg-white px-3 text-center font-medium dark:bg-gray-dark">
                        Ou créez un compte avec votre email
                    </div>
                <span className="block h-px w-full bg-stroke dark:bg-dark-3"></span>
            </div> */}
            <div>
                <SignupForm />
            </div>
            <div className="mt-6 text-center">
                <p>
                    Vous avez déja un compte?{" "}
                    <Link href="/auth/signin" className="text-primary">
                        Connectez-vous
                    </Link>
                </p>
            </div>
        </>
    );
}

export default SignupModule


