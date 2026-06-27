import {
  presets,
  queueWrite
} from "https://esm.sh/glitched-writer@2.0.29";

const phrases = [
  "Hi,",
  "welcome to",
  "fastclimb.lol",
  "stay tuned."
];

queueWrite(
  phrases,
  ".text",
  {
    ...presets.neo,
    letterize: true
  },
  800,
  true
);
