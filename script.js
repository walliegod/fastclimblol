import {
  presets,
  queueWrite
} from "https://esm.sh/glitched-writer@2.0.29";

const phrases = [
  "Neo,",
  "sooner or later",
  "you're going to realize",
  "just as I did",
  "that there's a difference",
  "between knowing the path",
  "and walking the path"
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
