const WORDS = (
  'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ' +
  'ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat ' +
  'duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur ' +
  'excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum'
).split(' ');

/** `count` words of lorem ipsum in sentences of eight to twelve words, starting with « Lorem ipsum ». */
export function loremWords(count: number): string {
  const out: string[] = [];
  let sentence = 0;
  let length = 8;
  for (let i = 0; i < count; i++) {
    let word = WORDS[i % WORDS.length];
    if (sentence === 0) word = word[0].toUpperCase() + word.slice(1);
    sentence++;
    const last = i === count - 1;
    if (sentence === length || last) {
      word += '.';
      sentence = 0;
      length = 8 + ((i * 7) % 5);
    }
    out.push(word);
  }
  return out.join(' ');
}
