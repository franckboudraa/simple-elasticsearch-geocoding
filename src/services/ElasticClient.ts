import elasticsearch from 'elasticsearch';
import config from '../config';

export default class ElasticClient {
  client: any = new elasticsearch.Client({
    host: `${config.elasticSearchProtocol}://${config.elasticSearchHost}:${
      config.elasticSearchPort
    }`,
    log: 'error'
  });

  public ping = async (requestTimeout = 30000): Promise<void> => {
    this.client.ping(
      {
        requestTimeout
      },
      function(error: any) {
        if (error) {
          console.error('elasticsearch cluster is down!');
        } else {
          console.log('All is well');
        }
      }
    );
  };

  public search = async (q: string): Promise<any> => {
    try {
      const response = await this.client.search({
        q
      });

      return response.hits.hits;
    } catch (error) {
      console.trace(error.message);
    }
  };

  public create = async (
    index: string,
    type: string,
    id: string,
    body: any
  ): Promise<any> => {
    try {
      body.created_at = new Date();
      body.updated_at = new Date();

      return await this.client.create({
        index,
        type,
        id,
        body
      });
    } catch (error) {
      console.trace(error);
    }
  };

  public update = async (
    index: string,
    type: string,
    id: string,
    body: any
  ): Promise<any> => {
    try {
      body.updated_at = new Date();

      return await this.client.update({
        index,
        type,
        id,
        body
      });
    } catch (error) {
      console.trace(error);
    }
  };

  public delete = async (
    index: string,
    type: string,
    id: string
  ): Promise<any> => {
    try {
      return await this.client.delete({ index, type, id });
    } catch (error) {
      console.trace(error);
    }
  };
}
