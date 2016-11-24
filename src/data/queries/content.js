/**
 * MIT License
 *
 * Copyright (c) 2016 InSoft Engineering / github.com/insoftpub
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import fs from 'fs';
import { join } from 'path';
import Promise from 'bluebird';
import jade from 'jade';
import fm from 'front-matter';
import MarkdownIt from 'markdown-it';
import {
    GraphQLString as StringType,
    GraphQLNonNull as NonNull
} from 'graphql';
import ContentType from '../types/ContentType';

const
    md = new MarkdownIt(),

    // A folder with Jade/Markdown/HTML content pages
    CONTENT_DIR = join(__dirname, './content'),

    // Extract 'front matter' metadata and generate HTML
    parseContent = (path, fileContent, extension) => {
        const fmContent = fm(fileContent);
        let htmlContent;

        switch (extension) {
            case '.jade':
                htmlContent = jade.render(fmContent.body);
                break;
            case '.md':
                htmlContent = md.render(fmContent.body);
                break;
            case '.html':
                htmlContent = fmContent.body;
                break;
            default:
                return null;
        }

        return {
            path,
            content: htmlContent,
            ...fmContent.attributes
        };
    },
    readFile = Promise.promisify(fs.readFile),
    fileExists = filename => new Promise(resolve => {
        fs.exists(filename, resolve);
    });

async function resolveExtension(path, extension) {
    let fileNameBase = join(CONTENT_DIR, `${path === '/' ? '/index' : path}`),
        ext = extension,
        fileName;

    if (!ext.startsWith('.')) {
        ext = `.${extension}`;
    }

    fileName = fileNameBase + ext;

    if (!(await fileExists(fileName))) {
        fileNameBase = join(CONTENT_DIR, `${path}/index`);
        fileName = fileNameBase + ext;
    }

    if (!(await fileExists(fileName))) {
        return { success: false };
    }

    return { success: true, fileName };
}

async function resolveFileName(path) {
    const extensions = ['.jade', '.md', '.html'];

    for (const extension of extensions) {
        const maybeFileName = await resolveExtension(path, extension);

        if (maybeFileName.success) {
            return { success: true, fileName: maybeFileName.fileName, extension };
        }
    }

    return { success: false, fileName: null, extension: null };
}

export default {
    type: ContentType,
    args: {
        path: { type: new NonNull(StringType) }
    },
    async resolve({ request }, { path }) {
        const { success, fileName, extension } = await resolveFileName(path);
        let source;

        if (!success) {
            return null;
        }

        source = await readFile(fileName, { encoding: 'utf8' });

        return parseContent(path, source, extension);
    }
};
