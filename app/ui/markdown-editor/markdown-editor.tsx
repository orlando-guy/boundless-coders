'use client'

import React from 'react'
import CodeMirror, { ViewUpdate } from '@uiw/react-codemirror'
import { markdown, markdownLanguage } from '@codemirror/lang-markdown'
import { languages } from '@codemirror/language-data'
import { githubDark } from '@uiw/codemirror-theme-github'

const MarkdownEditor = ({
    currentValue,
    onChange
}: Readonly<{
    currentValue?: string,
    onChange: (val: string, viewUpdate: ViewUpdate) => void
}>) => {

    return (
        <div>
            <CodeMirror
                value={currentValue}
                height='300px'
                theme={githubDark}
                extensions={[ markdown({ base: markdownLanguage, codeLanguages: languages }) ]}
                onChange={onChange}
            />
        </div>
    )
}

export default MarkdownEditor