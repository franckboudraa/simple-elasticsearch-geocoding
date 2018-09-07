import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import Geocoding from './Geocoding';
import {
  IGeocodingPost,
  IGeocodingDelete,
  IGeocodingPatch
} from '../interfaces/Geocoding';

declare module 'koa' {
  interface BaseContext {
    geocoder: Geocoding;
  }
}

export default class Server {
  private port: number;
  private app: Koa;
  private router: Router;
  private geocoder: Geocoding;

  public constructor(port: number) {
    this.port = port;
    this.app = new Koa();
    this.router = new Router();
    this.geocoder = new Geocoding();
  }

  public run = () => {
    this.app.context.geocoder = this.geocoder;
    this.app.use(bodyParser());

    this.router.get('/coords/:address', async (ctx, next) => {
      if (ctx.params && ctx.params.address) {
        const req = await this.geocoder.search(ctx.params.address);
        if (req && req.length > 0) {
          ctx.body = req;
          ctx.status = 200;
        } else {
          ctx.status = 404;
        }
      } else {
        ctx.body = 'You need to provide an address!';
        ctx.status = 400;
      }

      await next();
    });

    this.router.post('/coords', async (ctx, next) => {
      const input: any = ctx.request.body as IGeocodingPost;
      ctx.body = await this.geocoder.create(input);
      ctx.status = 200;
      await next();
    });

    this.router.patch('/coords', async (ctx, next) => {
      const input: any = ctx.request.body as IGeocodingPatch;
      ctx.body = await this.geocoder.update(input);
      ctx.status = 200;
      await next();
    });

    this.router.delete('/coords', async (ctx, next) => {
      const input: any = ctx.request.body as IGeocodingDelete;
      ctx.body = await this.geocoder.delete(input);
      ctx.status = 200;
      await next();
    });

    this.app.use(this.router.routes());
    this.app.use(this.router.allowedMethods());

    const server = this.app.listen(this.port, () => {
      console.log(`Server process: ${process.pid} listen on port ${this.port}`);
    });

    this.app.on('error', (e: any) => console.log(`ERROR: ${e.message}`));
  };
}
