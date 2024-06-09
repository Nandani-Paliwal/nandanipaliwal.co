import sanitizeHtml from 'sanitize-html'
import { sanitizeHtmlOptions } from './sanitizeHTMLOptions'
import { marked } from 'marked'
import highlightjs from 'highlight.js'
import { imageReplacer } from './image-utils'

const renderer = new marked.Renderer()

renderer.link = function (href, title, text) {
	const link = marked.Renderer.prototype.link.call(this, href, title, text)
	const linkIsUserMention =
		title &&
		title.includes('s Profile - Hashnode') &&
		href &&
		href.includes('https://hashnode.com')

	if (linkIsUserMention) {
		return link.replace(
			'<a',
			"<a class='user-mention' target='_blank' rel='noopener noreferrer'"
		)
	}
	if (href.indexOf('#') === 0) {
		return link.replace('<a', "<a class='post-section-overview'")
	}
	return link.replace('<a', "<a target='_blank' rel='noopener noreferrer' ")
}

renderer.tablecell = function (content) {
	const chunks = content.split('&lt;br&gt;-')

	if (chunks.length === 1) {
		return '<td>' + content + '</td>'
	}

	if (chunks[0].indexOf('- ') === 0) {
		chunks[0] = chunks[0].substring(1)
	}

	let html = ''

	chunks.forEach(function (chunk) {
		html += '<li>' + chunk + '</li>'
	})

	return '<td><ul>' + html + '</ul></td>'
}

const markedOpts = {
	renderer: renderer,
	gfm: true,
	tables: true,
	sanitize: false,
	// @ts-ignore
	highlight: function (code, lang) {
		// Fix to prevent content-preview API from crashing on inputting long codeblocks with mixed characters without language.
		lang = lang || 'javascript'
		if (!lang) {
			return highlightjs.highlightAuto(code).value
		}
		if (highlightjs.getLanguage(lang)) {
			return highlightjs.highlight(lang, code, true).value
		} else {
			return highlightjs.highlightAuto(code, []).value
		}
	}
}

const extractMentions = (content: string) => {
	const regex = /@<a([^>]*)href="@(\S+)"([^>]*)>((?:.(?!\<\/a\>))*.)<\/a>/g
	const replacer = (substring: string, ...args: any[]) => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const [p1, p2, p3, p4] = args
		return `<a target='_blank' rel='noopener noreferrer' title="${p2}" href="https://hashnode.com/@${p2}">${p4}</a>`
	}
	return content.replace(regex, replacer)
}

const getSanitizedHtml = (content: string) => {
	const sanitizedHtml = sanitizeHtml(content, sanitizeHtmlOptions)
	return sanitizedHtml
}

const getHtmlFromMarkdown = (contentMarkdown: string) => {
	const response = marked(contentMarkdown, markedOpts)
	return response
}

const getOptimizedImages = (content: string, title: string) => {
	return imageReplacer(content, true, title)
}

const pipe =
	(...fns: any[]) =>
	(x: any) =>
		fns.reduce((v, f) => f(v), x)

export const markdownToHtml = (contentMarkdown: string, title: string) => {
	const content = pipe(getHtmlFromMarkdown, getSanitizedHtml, extractMentions)(contentMarkdown)

	return getOptimizedImages(content, title)
}
