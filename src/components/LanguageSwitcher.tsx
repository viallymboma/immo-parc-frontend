"use client"; 


// app/components/LanguageSwitcher.tsx
import i18next from 'i18next';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher: FC = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n?.changeLanguage(lang, () => {
        console.error('i18n.changeLanguage is not available.');
    } )
    // if (i18n.changeLanguage) {
    // //   i18n.changeLanguage(lang);
    // } else {
    //   console.error('i18n.changeLanguage is not available.');
    // }
  };

  return (
    <div className="flex space-x-4 p-4 bg-gray-100 rounded-md">
      <button
        onClick={() => changeLanguage('en')}
        className={`px-4 py-2 rounded-lg focus:outline-none ${
          i18n.language === 'en' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
        }`}
      >
        English
      </button>

      <button
        onClick={() => changeLanguage('fr')}
        className={`px-4 py-2 rounded-lg focus:outline-none ${
          i18n.language === 'fr' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
        }`}
      >
       {t('hello')} French
      </button>

      <button
        onClick={() => changeLanguage('es')}
        className={`px-4 py-2 rounded-lg focus:outline-none ${
          i18n.language === 'es' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
        }`}
      >
        Spanish
      </button>
    </div>
  );
};

export default LanguageSwitcher;


// // app/components/LanguageSwitcher.tsx
// import i18next from 'i18next';
// import { FC } from 'react';

// const LanguageSwitcher: FC = () => {
//   const changeLanguage = (lang: string) => {
//     i18next.changeLanguage(lang); // Switch language without changing URL
//   };

//   return (
//     <div>
//       <button onClick={() => changeLanguage('en')}>English</button>
//       <button onClick={() => changeLanguage('fr')}>French</button>
//       <button onClick={() => changeLanguage('es')}>Spanish</button>
//     </div>
//   );
// };

// export default LanguageSwitcher;


// // app/components/LanguageSwitcher.tsx
// import { useRouter } from 'next/router';
// import { FC } from 'react';

// const LanguageSwitcher: FC = () => {
//   const router = useRouter();

//   const changeLanguage = (locale: string) => {
//     router.push(router.pathname, router.asPath, { locale });
//   };

//   return (
//     <div>
//       <button onClick={() => changeLanguage('en')}>English</button>
//       <button onClick={() => changeLanguage('fr')}>French</button>
//       <button onClick={() => changeLanguage('es')}>Spanish</button>
//     </div>
//   );
// };

// export default LanguageSwitcher;