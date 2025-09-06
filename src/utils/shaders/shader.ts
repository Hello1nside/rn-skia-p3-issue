import { Skia } from '@shopify/react-native-skia';

export const shader = Skia.RuntimeEffect.Make(`
    uniform shader image;
  
    half4 main(float2 xy) {
      return image.eval(xy);
    }
  `)!;