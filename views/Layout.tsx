/** @jsx h */
/** @jsxFrag Fragment */
import { h, html, Fragment } from "../deps.ts";

const Layout = (page) => {
  return html({
    title: "Image Gen",
    links: [
      { rel: "stylesheet", href: "https://cdn.jsdelivr.net/gh/niklus/chota/chota.min.css"}
    ],
    styles: [`
      main { 
        padding: 20px;
        text-align: center;
      }
      .card {
        padding: 0;
        margin: 0 auto;
      }
      input {
        max-width: 512px !important;
        margin: 0 auto;
      }
    `],
    scripts: [],
    body: (
      <>
        <main>
          {page}
        </main>
      </>
    ),
  });
}

export default Layout;