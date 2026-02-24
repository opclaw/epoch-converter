'use client'
import {useState} from 'react'
import styles from './page.module.css'

export default function Home() {
  const [timestamp, setTimestamp] = useState(Date.now().toString())
  const [date, setDate] = useState(new Date().toISOString())

  const convertToDate = () => {
    const ts = parseInt(timestamp)
    if (!isNaN(ts)) {
      setDate(new Date(ts * (timestamp.length === 10 ? 1000 : 1)).toISOString())
    }
  }

  const convertToTimestamp = () => {
    const d = new Date(date)
    if (!isNaN(d.getTime())) {
      setTimestamp(Math.floor(d.getTime() / 1000).toString())
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Unix Timestamp Converter</h1>
      <div className={styles.section}>
        <label>Unix Timestamp (seconds)</label>
        <input type="text" value={timestamp} onChange={e => setTimestamp(e.target.value)} className={styles.input} />
        <button onClick={convertToDate} className={styles.btn}>Convert to Date →</button>
      </div>
      <div className={styles.section}>
        <label>ISO Date</label>
        <input type="text" value={date} onChange={e => setDate(e.target.value)} className={styles.input} />
        <button onClick={convertToTimestamp} className={styles.btn}>Convert to Timestamp →</button>
      </div>
      <div className={styles.now}>
        <button onClick={() => {setTimestamp(Math.floor(Date.now()/1000).toString()); setDate(new Date().toISOString())}} className={styles.nowBtn}>Get Current Time</button>
      </div>
    </div>
  )
}