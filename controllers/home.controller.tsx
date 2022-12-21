/** @jsx h */
import { h } from "../deps.ts";
import Layout from "../views/Layout.tsx";
import Home from "../views/Home.tsx";

const homePage = async (ctx) => {
  const { body } = await Layout(<Home imageUrl={null} message={null} />);
  ctx.response.body = body;  
}

const generateImage = async (ctx) => {
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
      const { body } = await Layout(
        <Home imageUrl={null} message={"That image could not be generated"} />
      );
      return ctx.response.body = body;
    }

    const data = await response.json();
    const imageUrl = data.data;
    const { body } = await Layout(<Home imageUrl={imageUrl} message={null} />);

    ctx.response.body = body;
    
  } catch (error) {
    console.error(error)
  }
}

export { homePage, generateImage }