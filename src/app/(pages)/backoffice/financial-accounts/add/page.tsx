"use client";
import React from 'react';

import {
  SubmitHandler,
  useForm,
} from 'react-hook-form';

import {
  accounts,
  AccountTypeM,
} from '@/components/data/Productsdata';
import InputField from '@/components/FormElements/InputElement/InputField';
import SelectField
  from '@/components/FormElements/InputElement/SelectInputField';
import ReturnHeader from '@/components/Sidebar/ReturnHeader';
import { PhoneSvgIcon } from '@/components/svgs/SvgIcons';

type SignupFormType = {
    operator: string, 
    service?: string, 
    abreviation?: string, 
    balance?: number, 
    phone_number: number
}


const AddFinancialAccount = () => {
    const {
        register, 
        handleSubmit, 
        reset, 
        setValue,
        formState: {errors, isValid }, 
    } = useForm <SignupFormType> (); 

    const onSubmit: SubmitHandler<SignupFormType> = async (data) => {

        const findElement = accounts?.find((account: AccountTypeM, index: number) => {
            return account?.id === parseInt(data?.operator)
        })

        const my_account = {
            id: 4,
            operator: data?.operator, 
            service: findElement?.service, 
            abreviation: findElement?.abreviation, 
            balance: 0, 
            phone_number: data?.phone_number
        }
    }
    return (
        <div>
            <ReturnHeader 
                headerName='Ajouter un Compte'
                returnBtnLabel='Retour'
                returnLink='/backoffice/financial-accounts'
            />
            <form onSubmit={handleSubmit (onSubmit)}>
                <InputField 
                    label='Numéro de téléphone'
                    name="phone_number"
                    register={
                        register('phone_number', { 
                            required: true, 
                            pattern: /^(6(9|7|6|5|2|8)[0-9]{7}|2[0-9]{8})/ // THIS VALIDATES EVEN CAMTEL NUMBER
                            // 621167987
                            // pattern: /^6(9|7|6|5|2|8)[0-9]{7}$/, // THIS VALIDATE WITHOUT CAMTEL NUMBER
                        })
                    }
                    svg={ <PhoneSvgIcon /> }
                    type='number'
                    placeholder='Entrez le numéro de téléphone'
                    // error={ errors?.phone_number }
                    // errorMessage='Fixing message'
                />
                <p className="mt-1 text-sm text-red-400">
                    {
                        errors?.phone_number && "Inserez un MTN, Orange Ou Camtel"
                    }
                </p>

                {
                    accounts?.length > 0 && (
                        <div className="w-full">
                            <h1>
                                Operateur
                            </h1>
                            <SelectField
                                name="operator"
                                options={accounts}
                                register={register('operator', { 
                                    required: true, 
                                })}
                            />
                            <p className="mt-1 text-sm text-red-400">
                                {
                                    errors?.operator && 
                                        <>
                                            Selectinnez un operateur
                                        </>
                                }
                            </p>
                        </div> 
                    )
                }
                <div className="mb-4.5">
                    <button
                        type="submit"
                        className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary p-4 font-medium text-white transition hover:bg-opacity-90"
                    >
                        Créer
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddFinancialAccount