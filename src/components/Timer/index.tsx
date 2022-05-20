import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import { Typography, Box } from '@mui/material';
import { CountdownWrapper, CountdownItem, CountdownSvg } from './Timer.styled';

const Countdown = (props) => {
    const [minutes, setMinutes] = useState();
    const [seconds, setSeconds] = useState();

    const SVGCircle = ({ radius }) => (
        <CountdownSvg className='countdown-svg'>
            <path fill="none" stroke="#eeeeee" stroke-width="4" d={describeArc(50, 50, 48, 0, radius)} />
        </CountdownSvg>
    );

    const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
        let angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
        return {
            x: centerX + (radius * Math.cos(angleInRadians)),
            y: centerY + (radius * Math.sin(angleInRadians))
        };
    }

    const describeArc = (x, y, radius, startAngle, endAngle) => {
        let start = polarToCartesian(x, y, radius, endAngle);
        let end = polarToCartesian(x, y, radius, startAngle);
        let largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
        let d = [
            "M", start.x, start.y,
            "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
        ].join(" ");
        return d;
    }

    const mapNumber = (number, in_min, in_max, out_min, out_max) => {
        return (number - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
    }
    const { timeTillDate, timeFormat, setMessage } = props;
    const then = moment(timeTillDate, timeFormat);

    useEffect(() => {
        const interval = setInterval(() => {
            const now = moment();
            if (then.isBefore(now)) {
                setMinutes('00');
                setSeconds('00');
                setMessage(true);
                clearInterval(interval);
                return;
            }
            const countdown = moment(then - now);
            setMinutes(countdown.format('mm'));
            setSeconds(countdown.format('ss'));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const minutesRadius = mapNumber(minutes, 60, 0, 0, 360);
    const secondsRadius = mapNumber(seconds, 60, 0, 0, 360);

    return (
        <Box>
            <CountdownWrapper>
                <CountdownItem>
                    <SVGCircle
                        radius={minutesRadius}
                    />
                    {minutes}
                    <span>minutes</span>
                </CountdownItem>
                <CountdownItem>
                    <SVGCircle
                        radius={secondsRadius}
                    />
                    {seconds}
                    <span>seconds</span>
                </CountdownItem>
            </CountdownWrapper>
        </Box>
    );
}

export default Countdown