/** @jsx h */
/** @jsxFrag Fragment */
import { h, Fragment } from "../deps.ts";

const Home = ({ imageUrl, message }) => {
  return (
    <>
      <h1>Image Gen</h1>
      <p>
        <b>Image Gen</b> uses <a href="https://openai.com/dall-e-2" target="_blank">OpenAI's Dall-E models</a> to generate uniqe images.
      </p>
      <p>
        Try: <b><i>Astronaut riding a horse in space</i></b> and hit enter to get the image.
      </p>
      <form method="POST" action="/prompt">
        <input placeholder="Image description" name="prompt" required/>
      </form>
      <br/>
      {imageUrl ? <img class="card" src={imageUrl} alt="AI Generated Image" /> : null}
      {message ? <p>{message}</p> : null}
    </>
  );
}

export default Home;