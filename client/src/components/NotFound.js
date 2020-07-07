import React from 'react';
import { useTranslation } from "react-i18next";

const NotFound = () => {
  const { t } = useTranslation();
  return (
    <div>
      <h3>{t('pageNotFound')}</h3>
      <p>{t('pageNotFoundMessage')}</p>
    </div>
  )
}

export default NotFound;