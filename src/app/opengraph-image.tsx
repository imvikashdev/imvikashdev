import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Vikash Choudhary - Full-Stack Developer';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#030303',
        backgroundImage:
          'radial-gradient(circle at 25px 25px, #333 2%, transparent 0%), radial-gradient(circle at 75px 75px, #333 2%, transparent 0%)',
        backgroundSize: '100px 100px',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '80px',
          height: '80px',
          background: 'white', // High contrast logo for OG
          borderRadius: '20px',
          marginBottom: '40px',
          boxShadow: '0 0 30px rgba(255,255,255,0.1)',
        }}
      >
        <div
          style={{
            fontSize: 40,
            fontFamily: 'monospace',
            fontWeight: 900,
            color: 'black',
          }}
        >
          VC<span style={{ color: '#666' }}>.</span>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          fontSize: 80,
          fontFamily: 'sans-serif',
          fontWeight: 800,
          color: 'white',
          letterSpacing: '-0.03em',
          marginBottom: '20px',
          lineHeight: 1,
        }}
      >
        Vikash Choudhary
      </div>

      <div
        style={{
          display: 'flex',
          fontSize: 30,
          fontFamily: 'monospace',
          color: '#888',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}
      >
        Full-Stack & Web3 Developer
      </div>
    </div>,
    {
      ...size,
    },
  );
}
