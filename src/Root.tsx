import {Audio, Img, useCurrentFrame, useVideoConfig} from 'remotion';
import {AbsoluteFill} from 'remotion';
import {Composition, staticFile} from 'remotion';

const secToString = (sec: number) => {
  sec |= 0;
  return `${String((sec / 60) | 0).padStart(2, '0')}:${String(
    sec % 60
  ).padStart(2, '0')}`;
};

type Props = {musicSeconds: number; title: string; subtitle: string};

function Base({musicSeconds, title, subtitle}: Props) {
  const currentFrame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const currentSeconds = (currentFrame === 0 ? 0 : currentFrame + 1) / fps;
  const currentPercent = (currentSeconds / musicSeconds) * 100;

  return (
    <AbsoluteFill
      style={{
        background: 'white',
        fontFamily: 'sans-serif',
      }}
    >
      <AbsoluteFill
        style={{
          background: 'white',
          width: '70%',
          height: '60%',
          margin: '0 auto',
          top: '50%',
          transform: 'translateY(-50%)',
          borderRadius: '30px',
          filter: 'drop-shadow(0 90px 90px rgb(0 0 0 / 0.25))',
          padding: '72px',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '360px',
            display: 'flex',
            alignItems: 'center',
            flex: 1,
          }}
        >
          <Img
            src={staticFile('image.jpg')}
            width={360}
            height={360}
            style={{
              objectFit: 'cover',
              transform: 'translateZ(0)',
              borderRadius: '8px',
            }}
          />
          <div
            style={{
              marginLeft: '48px',
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <span
                style={{
                  fontSize: 48,
                  fontWeight: 'bold',
                  lineHeight: '1em',
                }}
              >
                {title}
              </span>
              <span
                style={{
                  fontSize: 24,
                  fontWeight: 500,
                  lineHeight: '1em',
                  color: 'gray',
                }}
              >
                {subtitle}
              </span>
            </div>

            <div style={{marginTop: '18px'}}>
              <div
                style={{
                  width: '100%',
                  height: 16,
                  background: 'lightgray',
                  borderRadius: 16,
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: `${currentPercent}%`,
                    height: 16,
                    background: 'blue',
                    borderRadius: "9999px",
                  }}
                />
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: 8,
                  fontWeight: 'bold',
                  color: 'gray',
                }}
              >
                <span>{secToString(currentSeconds)}</span>
                <span>{secToString(musicSeconds)}</span>
              </div>
            </div>
          </div>
        </div>
      </AbsoluteFill>

      <Audio src={staticFile('music.m4a')} />
    </AbsoluteFill>
  );
}

export const RemotionRoot: React.FC = () => {
  const musicSeconds = 60 * 4 + 38; // 4:38
  const fps = 30;

  return (
    <>
      <Composition
        id="base"
        fps={fps}
        durationInFrames={fps * musicSeconds}
        width={1920}
        height={1080}
        component={Base}
        defaultProps={{
          musicSeconds,
          title: 'ESPERO',
          subtitle: '니나 Virtual Hertz',
        }}
      />
    </>
  );
};
