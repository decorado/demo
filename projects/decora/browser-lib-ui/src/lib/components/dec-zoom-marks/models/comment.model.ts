export class Comment {
  public coordinates: number[];
  public comment: string;
  public version: number;
  public id: number;
  public description: string;

  constructor(data: any = {}) {
    this.coordinates = data.coordinates || [];
    this.comment = data.comment || undefined;
    this.version = data.version || undefined;
    this.id = data.id || undefined;
    this.description = data.description || '';
  }
}
