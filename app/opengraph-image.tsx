import { ImageResponse } from 'next/og';

export const alt = 'Manan Garg: robotics and autonomy software';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#f3efe6',
          color: '#1a1815',
          padding: '72px 80px',
        }}
      >
        <div style={{ display: 'flex', fontSize: 26, letterSpacing: 3, textTransform: 'uppercase', color: '#6b665c' }}>
          Robotics and autonomy software
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontSize: 132, lineHeight: 1, letterSpacing: -4 }}>Manan Garg</div>
          <div style={{ display: 'flex', marginTop: 28, fontSize: 36, lineHeight: 1.3, maxWidth: 960 }}>
            dronecore: onboard autonomy for multirotor drones, validated on PX4 and ArduPilot in software-in-the-loop.
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', fontSize: 24, color: '#6b665c' }}>
          <div style={{ display: 'flex', width: 64, height: 6, background: '#b63b16', marginRight: 20 }} />
          B.Tech Computer Science · Bennett University · 2028
        </div>
      </div>
    ),
    { ...size }
  );
}
