import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();
  return (
    <div className="footer">
      <div>
        {t('Icons made by')}
        <a
          className="link"
          href="https://www.flaticon.com/authors/roundicons"
          title={t('Roundicons')}
          rel="noopener noreferrer"
        >
          {t('Roundicons')}
        </a>
        {t('from')}
        <a
          className="link"
          href="https://www.flaticon.com/"
          rel="noopener noreferrer"
          title={t('Flaticon')}
        >
          {t('flaticon url')}
        </a>
        {t('is licensed by')}
        <a
          className="link"
          href="http://creativecommons.org/licenses/by/3.0/"
          title={t('cc3 long')}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('cc3')}
        </a>
      </div>
    </div>
  );
}
