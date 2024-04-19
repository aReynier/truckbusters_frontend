import { useState } from 'react';
import * as dateFns from 'date-fns';
import fr from 'date-fns/locale/fr';
import './Calendar.scss'
import LeftArrow from '../../assets/pictos/left-arrow.svg'
import LeftArrowNo from '../../assets/pictos/left-arrow-no.svg'
import RightArrow from '../../assets/pictos/right-arrow.svg'

const formatOfYear = 'yyy';
const formatOfMonth = 'MMMM';
const formatOfWeek = 'eeee';
const formatOfDay = 'd';

//to translate months and weekdays into french
const locale = fr;

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
//
  const initialCurrentDate = new Date();

  //find fisrt day of current month
  const firstDayCurrentMonth = dateFns.startOfMonth(currentDate);

  //find fisrt day of current month
  const lastDayCurrentMonth = dateFns.lastDayOfMonth(currentDate);

  //find fisrt day of current week
  const firstDayCurrentWeek = dateFns.startOfWeek(firstDayCurrentMonth, { weekStartsOn: 1 });

  //find last day of current week
  const lastDayCurrentWeek = dateFns.lastDayOfWeek(lastDayCurrentMonth, { weekStartsOn: 1 });

  //For having the days of the week
  const weekDays = dateFns.eachDayOfInterval({start: firstDayCurrentWeek, end: lastDayCurrentWeek})

  return (
  <div>
    <div className="calendar">
      <div className="calendar__head" style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', margin: '1rem 1rem 1rem 0'}}>
        <div className="calendar__head__month">
          <button
          className={`calendar__head__month__button ${ dateFns.format(currentDate, formatOfMonth, { locale }) === dateFns.format(initialCurrentDate, formatOfMonth, { locale }) && dateFns.format(currentDate, formatOfYear) === dateFns.format(initialCurrentDate, formatOfYear) ? "calendar__head__month__button--unactive" : "" }`}
          onClick={() => dateFns.format(currentDate, formatOfMonth, { locale }) !== dateFns.format(initialCurrentDate, formatOfMonth, { locale }) || dateFns.format(currentDate, formatOfYear) !== dateFns.format(initialCurrentDate, formatOfYear) ? setCurrentDate(dateFns.subMonths(currentDate, 1)) : "" }
          >
           <img className="calendar__head__month__button__icon" src={dateFns.format(currentDate, formatOfMonth, { locale }) !== dateFns.format(initialCurrentDate, formatOfMonth, { locale }) || dateFns.format(currentDate, formatOfYear) !== dateFns.format(initialCurrentDate, formatOfYear) ? LeftArrow : LeftArrowNo} />
          </button>
          <span className="calendar__head__month__paragraph">{dateFns.format(currentDate, formatOfMonth, { locale })} {dateFns.format(currentDate, formatOfYear)}</span>
          <button className="calendar__head__month__button" onClick={() => setCurrentDate(dateFns.addMonths(currentDate, 1))}>
            <img className="calendar__head__month__button__icon" src={RightArrow} />  
          </button>
        </div>
        <p className="calendar__head__availability">Plusieurs disponibilités ce mois-ci</p>
      </div>
      <div className="calendar__date">
      {weekDays.map((date) => (
          <button key={`${dateFns.format(date, formatOfDay)}-${dateFns.format(date, formatOfMonth)}-${dateFns.format(date, formatOfYear)}`} style={{ opacity: !dateFns.isSameMonth(date, currentDate)? '0': '',
          display: dateFns.isSunday(date, currentDate)? 'none': ''
          }} className={`calendar__date__card ${!dateFns.isSameMonth(date, currentDate) ? 'calendar__date__card--hidden' : ''} ${ !dateFns.isSameMonth(date, currentDate) && (dateFns.getDay(firstDayCurrentMonth) === 0 && dateFns.getDate(firstDayCurrentMonth) === 1) ? 'calendar__date__card--always--hidden' : ''}`}>
            <div className="calendar__date__card__content">
              <span className="calendar__date__card__content__paragraph" style={{ color: !dateFns.isSameMonth(date, currentDate)? '#000': ''}}>{dateFns.format(date, formatOfWeek, { locale })} {dateFns.format(date, formatOfDay)}</span>
            </div>
            <div className="calendar__date__card__availability">
              { dateFns.isSaturday(date, currentDate)? ( <p className="calendar__date__card__availability__paragraph">2 dispo.</p>
            ) : (
              <p className="calendar__date__card__availability__paragraph">5 dispo.</p>
              )}
            </div>
          </button>
          ))}
      </div>
    </div>
  </div>
  );
};

export default Calendar