import React from 'react';
import AlgoliaPlaces from 'algolia-places-react';
import { useTranslation } from "react-i18next";

export default ({ handleAutoComplete }) => {
    const { t } = useTranslation();
    return (
        <AlgoliaPlaces
            placeholder={t('writeAddress')}
            options={{
                appId: process.env.REACT_ALGOLIA_APPLICATION_ID,
                apiKey: process.env.REACT_ALGOLIA_PLACES_USAGE_API_KEY,
                /* language: 'sv',
                countries: ['se'], */
                language: 'en',
                type: 'address',
                // Other options from https://community.algolia.com/places/documentation.html#options
            }}

            onChange={({ query, rawAnswer, suggestion, suggestionIndex }) => {
                handleAutoComplete(suggestion);
            }
            }

            onSuggestions={({ rawAnswer, query, suggestions }) => {
                //To do if
            }}

            onCursorChanged={({ rawAnswer, query, suggestion, suggestonIndex }) => {
                //To do if needed
            }}

            onClear={() => {
                //To do if needed
            }}

            onLimit={({ message }) => {
                //To do if needed
            }}

            onError={({ message }) => {
                //To do if needed
            }}
        />
    );
}