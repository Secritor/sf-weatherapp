import {AsyncPaginate} from 'react-select-async-paginate'
import { useState } from 'react';
import { GEO_API_URL, geoApiOptions} from '../../api';

const Search = ({onSearchChange, handleSearchOnGeo}) => {
    const [search, setSearch] = useState(null);

    const handleOnChange = (searchData) => {
        setSearch(searchData);
        onSearchChange(searchData)
    }


    const handleGeolocationSearch = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                handleSearchOnGeo(`${latitude} ${longitude}`);
            }, (error) => {
                console.error(error.message);
            });
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    };


    const loadOptions = (inputValue) => {
        return fetch(`${GEO_API_URL}?namePrefix=${inputValue}&languageCode=ru`, geoApiOptions)
        .then(responce => responce.json())
        .then(responce => {
            return {
              options: responce.data.map((city) => {
                return {
                    value: `${city.latitude } ${city.longitude}` ,
                    label: `${city.name}, ${city.region}, ${city.countryCode} `,

                }
              })  
            }
        })
        .catch(err => console.error(err));
    }

    return (
        <>
        <AsyncPaginate
            placeholder='Поиск по городу'
            debounceTimeout={1600}
            value={search}
            onChange={handleOnChange}
            loadOptions={loadOptions}
        />
        <button onClick={handleGeolocationSearch}>Погода по геолокации</button>
        </>

        
    );
}

export default Search