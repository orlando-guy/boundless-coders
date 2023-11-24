// Take in a phrase and separate the third word in an array
export function createArrayFromPhrase(phrase: string) {
    const splitPhrase = phrase.split(' ');
    const thirdWord = splitPhrase.pop();
    return [splitPhrase.join(' '), thirdWord];
}