import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Epoch Converter — Unix Timestamp to Date'
export const size = { width: 1200, height: 630 }

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
          padding: '60px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        <div
          style={{
            fontSize: '120px',
            marginBottom: '30px',
          }}
        >
          ⏱️
        </div>
        <div
          style={{
            fontSize: '64px',
            fontWeight: 'bold',
            color: 'white',
            marginBottom: '20px',
            textAlign: 'center',
            textShadow: '0 2px 10px rgba(0,0,0,0.1)',
          }}
        >
          Epoch Converter
        </div>
        <div
          style={{
            fontSize: '36px',
            color: 'rgba(255, 255, 255, 0.9)',
            textAlign: 'center',
          }}
        >
          Unix Timestamp to Date
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
