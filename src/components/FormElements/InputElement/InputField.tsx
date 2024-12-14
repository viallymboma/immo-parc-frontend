import React from 'react';

import { FieldError } from 'react-hook-form';

interface InputFieldProps {
    customClasses?: string;
    register: any;
    label: string;
    type: string;
    placeholder: string;
    required?: boolean;
    name?: string;
    error?: FieldError; 
    errorMessage?: string; 
    onChangeProp?: (e: any) => void; 
    passwordShow?: boolean;
    passwordVisibilityIcon?: React.ComponentType<React.SVGProps<SVGSVGElement>> | undefined | any; 
    svg?: React.ComponentType<React.SVGProps<SVGSVGElement>> | undefined | any; 
}

const InputField: React.FC<InputFieldProps> = ({
    customClasses,
    register, 
    label,
    type,
    placeholder,
    required,
    name,
    error, 
    errorMessage, 
    onChangeProp, 
    passwordShow, 
    passwordVisibilityIcon, 
    svg
}) => {
    return (
        <>
            <div className={` ${ customClasses ? customClasses : "mb-4" } `}>
                <label
                    htmlFor="email"
                    className="mb-2.5 block font-medium text-dark dark:text-white"
                >
                    {label}
                    {required && <span className="text-red">*</span>}
                </label>
                <div className="relative">
                    <input
                        onChange={ (e: any) => onChangeProp && onChangeProp (e) }
                        type={type}
                        placeholder={placeholder}
                        { ...register }
                        name={ name }
                        id={ name }
                        className="w-full rounded-lg border border-stroke bg-transparent py-[15px] pl-6 pr-11 font-medium text-dark outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                    />

                    <span className="absolute right-4.5 top-1/2 -translate-y-1/2">
                        { svg }
                    </span>

                    { passwordShow && passwordVisibilityIcon ? 
                        (
                            <span className="absolute right-4.5 top-1/2 -translate-y-1/2">
                                { svg }
                            </span>
                        )
                        : 
                        ""
                    }

                </div>
                <p className="text-red">
                    {
                        error && errorMessage
                    }
                </p>
            </div>
        </>
    );
};

export default InputField;
