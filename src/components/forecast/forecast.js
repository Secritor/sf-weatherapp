import './forecast.css';
import {Accordion, AccordionItem, AccordionItemButton, AccordionItemHeading, AccordionItemPanel} from 'react-accessible-accordion'
const WEEK_DAYS = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];


const Forecast = ({data}) => {

    const dayInAWeek =  new Date().getDay();
    const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0, dayInAWeek));

    console.log(forecastDays)

    return (
      <>
        <label className="title">Прогноз</label>
        <Accordion allowZeroExpanded>
            {data.list.splice(0, 7).map((item, index) => {
                return (
                <AccordionItem key={index}>
                    <AccordionItemHeading>
                        <AccordionItemButton>
                            <div className='daily-item'>
                                <img src={`icons/${item.weather[0].icon}.png`} alt="weather" className='icon-small'/>
                                <label className='day'>
                                    {forecastDays[index]}
                                </label>
                                <label className='description'>
                                    {item.weather[0].description}
                                </label>
                                <label className='min-max'>
                                    {Math.round(item.main.temp_min)}°C / {Math.round(item.main.temp_max)}°C
                                </label>
                            </div>
                        </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                        <div className='daily-details-grid'>
                            <div className='daily-details-grid-item'>
                                <label>Давление</label>
                                <label>{Math.floor((item.main.pressure) * 0.7506)} мм рт. ст.</label>
                            </div>
                            <div className='daily-details-grid-item'>
                                <label>Влажность</label>
                                <label>{item.main.humidity}%</label>
                            </div>
                            <div className='daily-details-grid-item'>
                                <label>Ветер</label>
                                <label>{Math.floor(item.wind.speed)}м\с</label>
                            </div>
                            <div className='daily-details-grid-item'>
                                <label>Ощущается как</label>
                                <label>{Math.floor(item.main.feels_like)}°C</label>
                            </div>
                        </div>
                    </AccordionItemPanel>
                </AccordionItem>
                )

            })}
            <AccordionItem></AccordionItem>
        </Accordion>
      </>  
    );
}

export default Forecast