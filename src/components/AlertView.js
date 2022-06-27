// AlertView.js
// React Component that handles displaying weather alerts

import { formatDate } from '../MultiComponentFunctions';
import './AlertView.css';

const AlertView = (props) => {
    // Formats dates nicely for alerts 
    const getAlertDates = alert => {
        let start = alert['onsetEpoch'] * 1000;
        let end = alert['endsEpoch'] * 1000;

        return formatDate(start, 'FULL') + " to " + formatDate(end, 'FULL');
    }

    // For each alert, this structure will be used to display it
    const alerts = props.alerts.map((a) => {
        return (
            <div className='alert' key={a['headline']}>
                <i className='bi bi-exclamation-triangle' />
                <div className='alertText'>
                    <h5 className="ib"><a href={a['link']} target='_blank'>{a['headline']}</a></h5>
                    <h6 className="ib"><em>{getAlertDates(a)}</em></h6>
                    <h6>{a['description']}</h6>
                </div>
            </div>
        );
    });

    return (
        <div id='alertView'>
            {alerts}
        </div>
    )
}

export default AlertView;