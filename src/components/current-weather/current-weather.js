import './current-weather.css';

const CurrentWeather = ({data}) => {
    return (
        <div className='weather'>
            <div className='top'>
                <div>
                    <p className='city'>{data.city}</p>
                    <p className='weather-descr'>{data.weather[0].description}</p>
                </div>

                <img className='weather-icon' src={`icons/${data.weather[0].icon}.png`} alt="weather img" />
            </div>
            <div className='bottom'>
                <p className='temperature'> {Math.floor(data.main.temp)}°C</p>
                <div className='details'>
                    <div className='parameter-row'>
                        <span className='parameter-label'>Детали</span>
                    </div>
                    <div className='parameter-row'>
                        <span className='parameter-label'>Ощущается как</span>
                        <span className='parameter-value'>{Math.floor(data.main.feels_like)}°C</span>
                    </div>
                    <div className='parameter-row'>
                        <span className='parameter-label'>Ветер</span>
                        <span className='parameter-value'>{Math.floor(data.wind.speed)}м\с</span>
                    </div>
                    <div className='parameter-row'>
                        <span className='parameter-label'>Влажность</span>
                        <span className='parameter-value'>{data.main.humidity}%</span>
                    </div>
                    <div className='parameter-row'>
                        <span className='parameter-label'>Давление</span>
                        <span className='parameter-value'>{Math.floor((data.main.pressure) * 0.7506)} мм рт. ст.</span>
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default CurrentWeather;