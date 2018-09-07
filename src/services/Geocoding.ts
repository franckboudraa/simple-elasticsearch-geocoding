import ElasticClient from './ElasticClient';
import {
  IGeocodingPost,
  IGeocodingDelete,
  IGeocodingPatch
} from '../interfaces/Geocoding';

export default class Geocoding {
  private elastic: ElasticClient;

  public constructor() {
    this.elastic = new ElasticClient();
  }

  public search = async (query: string): Promise<any> => {
    return await this.elastic.search(query);
  };

  public create = async (input: IGeocodingPost): Promise<any> => {
    return await this.elastic.create('addresses', 'fr', input.address, input);
  };

  public update = async (input: IGeocodingPatch): Promise<any> => {
    return await this.elastic.update('addresses', 'fr', input.address, input);
  };

  public delete = async (input: IGeocodingDelete): Promise<any> => {
    return await this.elastic.delete(input.index, input.type, input.id);
  };
}
