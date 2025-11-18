import React from 'react'
import { useTranslation } from 'react-i18next'
export default function Home(){
  const { t } = useTranslation()
  return (<div className="text-center"><h1>{t('welcome')}</h1><p className="mt-3">This site uses React-Bootstrap, JWT auth for Admin, and Tamil support.</p></div>)
}
