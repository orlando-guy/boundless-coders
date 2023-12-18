import { remark } from "remark";
import html from 'remark-html'

// Take in a phrase and separate the third word in an array
export function createArrayFromPhrase(phrase: string) {
    const splitPhrase = phrase.split(' ');
    const thirdWord = splitPhrase.pop();
    return [splitPhrase.join(' '), thirdWord];
}

export function createSlugFromText(text: string) {
    return text.replaceAll(' ', '-').toLowerCase()
}

export function parseSlug(slug: string) {
    // Remove leading and trailing slashes
    slug = slug.replace(/^\/|\/$/g, '');

    // Split the slug by '/'
    const segments = slug.split('/');
    return segments;
}

export async function mdToHTML(rawMd: string) {
    const processedContent = await remark()
        .use(html)
        .process(rawMd)
    return processedContent.toString()
}

export function translator(word: string): string {
    const WORDS: { [key: string]: string } = {
        "ENTRY": 'Facile',
        "MIDDLE": 'Middle',
        "ADVANCED": 'Avancé'
    };

    // Check if the word exists in WORDS, otherwise return the original word
    return WORDS[word] || word;
}