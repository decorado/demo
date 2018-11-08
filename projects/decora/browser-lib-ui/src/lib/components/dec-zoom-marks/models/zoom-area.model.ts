export class ZoomArea {
  public coordinates: number[];
  public id: number;
  public reference: number;
  public status: string;
  public referenceShot: any;
  public renderShot: any;

  constructor(coordinates: number[], id: number, reference: number, status: string, referenceShot: any, renderShot: any) {
    this.coordinates = coordinates || [];
    this.id = id || undefined;
    this.reference = reference || undefined;
    this.status = status || '';
    this.renderShot = renderShot || {};
    this.referenceShot = referenceShot || {};
  }
}
