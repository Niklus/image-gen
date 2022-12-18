/** @jsx h */
/** @jsxFrag Fragment */
import { h, html, Fragment } from "https://deno.land/x/htm@0.0.10/mod.tsx";
import { Application, Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";

const app = new Application();
const router = new Router();

router.post("/prompt", async (ctx) => {
  const body = ctx.request.body({ type: 'form' })
  const value = await body.value;
  const prompt = value.get('prompt');

  try {
    // Using https://github.com/Niklus/image-gen-api
    const response = await fetch(
      "https://image-gen.deta.dev/openai/generateimage",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          size: "medium",
        }),
      }
    );

    if (!response.ok) {
      const { body } = await render(<Home imageUrl={null} msg={"That image could not be generated"} />);
      return ctx.response.body = body;
    }

    const data = await response.json();
    const imageUrl = data.data;
    const { body } = await render(<Home imageUrl={imageUrl} msg={null} />);

    ctx.response.body = body;
    
  } catch (error) {
    console.error(error)
  }
});

router.get("/", async (ctx) => {
  const { body } = await render(<Home imageUrl={null} msg={null} />);
  ctx.response.body = body;  
});

app.use(router.routes());
app.use(router.allowedMethods());

app.addEventListener('listen', () => {
  console.log(`Listening on port: 8000`);
});

const Home = ({ imageUrl, msg }) => {
  return (
    <div>
      <h1>Image Gen</h1>
      <p><b>Image Gen</b> uses <a href="https://openai.com/dall-e-2" target="_blank">OpenAI's Dall-E models</a> to generate uniqe images.</p>
      <p>Try: <b><i>Astronaut riding a motorbike in space</i></b> and hit submit to get image.</p>
      <form method="POST" action="/prompt">
        <input placeholder="Image description" name="prompt" required/>
        <br/>
        <button>Submit</button>
        <br/>
      </form>
      <br/>
      {imageUrl ? <img class="card" src={imageUrl} alt="" /> : null}
      {msg ? <p class="card">{msg}</p> : null}
    </div>
  );
}

const render = (page) => {
  return html({
    title: "Image Gen",
    links: [
      { rel: "stylesheet", href: "https://cdn.jsdelivr.net/gh/niklus/chota/chota.min.css"}
    ],
    styles: [`
      main { 
        padding: 20px;
      }
      .card {
        padding: 0;
      }
      input {
        width: 512px !important;
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

await app.listen({ port: 8000 });


