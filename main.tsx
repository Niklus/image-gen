import { Application } from "./deps.ts";
import router from "./routes/home.router.ts";

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

app.addEventListener('listen', () => {
  console.log(`Listening on port: 8000`);
});

await app.listen({ port: 8000 });


