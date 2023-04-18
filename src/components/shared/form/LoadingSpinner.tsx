import { useEffect, useState } from "react"
import styles from './form.module.css'

export default function ProgressRing() {
    const [counter, setCounter] = useState(1)

    // calculate circle dimensions based on predetermined radius
    const RADIUS = 30
    const CIRCUMFERENCE = Math.PI * RADIUS * 2

    // set interval to animate circle based on 1 second intervals
    useEffect(() => {
        const interval = setInterval(() => {
            setCounter(prev => prev + 1)
        }, 750)

        // clear interval upon component unmount
        return () => clearInterval(interval)
    }, [])

    return (
        <svg viewBox="0 0 100 100" style={{ height: '50px' }}>

            <circle 
                strokeWidth="10" 
                stroke='#4786d8'
                fill="transparent" 
                r={RADIUS} 
                cx="50" 
                cy="50"
                strokeDasharray={`${CIRCUMFERENCE} ${CIRCUMFERENCE}`}
                strokeDashoffset={-(CIRCUMFERENCE * counter)}
                className={styles.loader}
            />

        </svg>
    )
}