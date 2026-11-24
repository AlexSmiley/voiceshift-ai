# VoiceShift AI — DSP MVP

Real-time microphone voice changer for the browser and Android. This is a **DSP MVP**, not yet a trained neural voice conversion system.

**Live demo:** [https://voiceshift-ai.vercel.app/](https://voiceshift-ai.vercel.app/)

## Web

Run `python -m http.server 8000 --directory web` from the repository root and open http://localhost:8000. Grant microphone permission, choose an effect, and use headphones to prevent feedback. HTTPS is required outside localhost. Browser recording uses the available MediaRecorder format (usually WebM or MP4), **not WAV**.

To deploy to Vercel, import the GitHub repository with the included `vercel.json` pointing at `web/`. No backend or environment variables are required.

## Android

Open `android/` in Android Studio, install SDK 35, sync Gradle and run on a physical device. Grant microphone permission and tap Start again. Android uses Java AudioRecord / AudioTrack; it does not yet use Kotlin/Oboe. Output uses Android system routing. Android recording and individual effect sliders are not implemented.

## Effects

Eight presets: Original, Male, Female, Deep, Robot, Alien, Cartoon, Demon. The effect labels describe approximate pitch/robot/echo presets, **not realistic gender or identity conversion**. DSP uses dual-window delay pitch shifting, ring modulation, feedback echo and limiting. Browser requests built-in noise suppression.

## Virtual microphone and AI

The browser can select an external virtual audio cable as its output when the browser supports `setSinkId`; configure the virtual cable's recording endpoint in the target desktop app. No virtual device driver is bundled, and Android/browser APIs do not provide system-wide microphone replacement. Neural AI training, inference, formant correction, and an AI model are **not yet implemented**.

## Tests

Run `node --test tests/*.mjs` from the repository root. Nine Node DSP tests passed locally on 2026-11-24. These check original passthrough and bounded finite samples for the presets; they do **not** establish audio quality, hardware latency, browser microphone integration or an Android build. Those need device testing.

## Source layout

- `web/` — zero-build frontend, AudioWorklet, DSP engine, waveform and recording
- `android/` — Android Studio project and Java audio loop
- `tests/` — Node DSP tests
- `vercel.json` — Vercel static deployment configuration
