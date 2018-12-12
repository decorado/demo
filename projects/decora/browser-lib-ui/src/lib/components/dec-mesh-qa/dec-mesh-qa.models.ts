export enum enumTagWrapperContext {
  Wireframe = 'Wireframe',
  Matcap = 'Matcap',
  Map = 'Map',
}

export interface TagWrapper {
  Tag: Tag;
  Context: enumTagWrapperContext;
  SubContext: number;
  Kit: number;
}

export interface Tag {
  ErrorCode?: string;
  MeshPoint?: MeshPoint;
  Id: string;
  Reference: string;
  CameraAngle: CameraAngle;
  Start?: MeshPoint;
  End?: MeshPoint;
  Distance?: number;
  RightDistance?: string;
  Size?: Size;
}

export interface Size {
  x: number;
  y: number;
}

export interface CameraAngle {
  Position: MeshPoint;
  Rotation: MeshPoint;
  Orthographic: boolean;
}

export interface MeshPoint {
  x: number;
  y: number;
  z: number;
}
