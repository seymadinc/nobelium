import Document, { Html, Head, Main, NextScript } from 'next/document'
import cn from 'classnames'
import BLOG from '@/blog.config'
import tailwind from '@/tailwind.config'
import CJK from '@/lib/cjk'
class MyDocument extends Document {
  static async getInitialProps (ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render () {
    const initialColorScheme = {
      auto: 'color-scheme-unset',
      dark: 'dark'
    }[BLOG.appearance]

    return (
      <Html lang={BLOG.lang} className={cn(initialColorScheme)}>
        <Head>
          {BLOG.font && BLOG.font === 'serif'
            ? (
            <>
              <link
                rel="preload"
                href="/fonts/SourceSerif.var.woff2"
                as="font"
                type="font/woff2"
                crossOrigin="anonymous"
              />
              <link
                rel="preload"
                href="/fonts/SourceSerif-Italic.var.woff2"
                as="font"
                type="font/woff2"
                crossOrigin="anonymous"
              />
            </>
              )
            : (
            <>
              <link
                rel="preload"
                href="/fonts/IBMPlexSansVar-Roman.woff2"
                as="font"
                type="font/woff2"
                crossOrigin="anonymous"
              />
              <link
                rel="preload"
                href="/fonts/IBMPlexSansVar-Italic.woff2"
                as="font"
                type="font/woff2"
                crossOrigin="anonymous"
              />
            </>
              )}

          {['zh', 'ja', 'ko'].includes(
            BLOG.lang.slice(0, 2).toLocaleLowerCase()
          ) && (
            <>
              <link
                rel="preconnect"
                href="https://fonts.gstatic.com"
                crossOrigin="anonymous"
              />
              <link
                rel="preload"
                as="style"
                href={`https://fonts.googleapis.com/css2?family=Noto+${
                  BLOG.font === 'serif' ? 'Serif' : 'Sans'
                }+${CJK()}:wght@400;500;700&display=swap`}
              />
              <link
                rel="stylesheet"
                href={`https://fonts.googleapis.com/css2?family=Noto+${
                  BLOG.font === 'serif' ? 'Serif' : 'Sans'
                }+${CJK()}:wght@400;500;700&display=swap`}
              />
              <noscript>
                <link
                  rel="stylesheet"
                  href={`https://fonts.googleapis.com/css2?family=Noto+${
                    BLOG.font === 'serif' ? 'Serif' : 'Sans'
                  }+${CJK()}:wght@400;500;700&display=swap`}
                />
              </noscript>
            </>
          )}
          <link rel="icon" href="/favicon.png" />
          <link rel="alternate" type="application/rss+xml" title="RSS 2.0" href="/feed"></link>
          {BLOG.appearance === 'auto'
            ? (
            <>
            <meta name="theme-color" content={BLOG.lightBackground} media="(prefers-color-scheme: light)"/>
            <meta name="theme-color" content={BLOG.darkBackground} media="(prefers-color-scheme: dark)"/>
            </>
              )
            : (
            <meta name="theme-color" content={BLOG.appearance === 'dark' ? BLOG.darkBackground : BLOG.lightBackground} />
              )
          }
          {/* To ensure the initial background color follows media preference when ThemeProvider is
              not ready */}
          <style>{`
            .color-scheme-unset body {
              background-color: ${tailwind.theme.extend.colors.day.DEFAULT};
            }
            @media (prefers-color-scheme: dark) {
              .color-scheme-unset body {
                background-color: ${tailwind.theme.extend.colors.night.DEFAULT};
              }
            }
          `}</style>
        </Head>
        <body className="bg-day dark:bg-night">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
