export class Tag {
  public coordinates: number[];
  public comment: string;
  public version: number;
  public id: number;
  public reference: number;
  public description: string;

  constructor(data: any = {}) {
    this.coordinates = data.coordinates || [];
    this.comment = data.comment || undefined;
    this.version = data.version || undefined;
    this.id = data.id || undefined;
    this.reference = data.reference || undefined;
    this.description = data.description || '';
  }
}
