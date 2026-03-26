import { useCallback, useRef } from 'react';

type PlayOptions = {
  /** Optional AudioContext from native/capacitor bridge in the future */
  audioContext?: AudioContext;
};

function getAudioContextConstructor(): typeof AudioContext | null {
  const g = globalThis as unknown as {
    AudioContext?: typeof AudioContext;
    webkitAudioContext?: typeof AudioContext;
  };
  return g.AudioContext ?? g.webkitAudioContext ?? null;
}

/**
 * Short “shuffle / reveal” chime using Web Audio.
 * Replace with `expo-av` / Capacitor NativeAudio in mobile shells — keep the same `play()` API.
 */
export function useDrawSound() {
  const ctxRef = useRef<AudioContext | null>(null);

  const play = useCallback((options?: PlayOptions) => {
    const Ctor = getAudioContextConstructor();
    if (!Ctor && !options?.audioContext) return;

    try {
      const ctx = options?.audioContext ?? ctxRef.current ?? new (Ctor ?? AudioContext)();
      ctxRef.current = ctx;
      if (ctx.state === 'suspended') void ctx.resume();

      const now = ctx.currentTime;
      const master = ctx.createGain();
      master.gain.setValueAtTime(0.12, now);
      master.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
      master.connect(ctx.destination);

      const osc = ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(440, now + 0.12);
      osc.frequency.exponentialRampToValueAtTime(330, now + 0.28);
      osc.connect(master);
      osc.start(now);
      osc.stop(now + 0.35);

      const noise = ctx.createBufferSource();
      const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.08, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < data.length; i += 1) data[i] = (Math.random() * 2 - 1) * 0.35;
      noise.buffer = buffer;
      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.04, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
      noise.connect(noiseGain);
      noiseGain.connect(master);
      noise.start(now);
      noise.stop(now + 0.09);
    } catch {
      /* ignore if audio blocked */
    }
  }, []);

  return { play };
}
