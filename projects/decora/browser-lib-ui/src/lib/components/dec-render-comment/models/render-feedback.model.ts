export default interface RenderFeedback {
  key: string;
  name: string;
  description: string;
  colorVariation: boolean;
  sub: RenderFeedback[];
}
