import { Skia, SkImage, SkShader, SkSurface, SkRuntimeEffect } from '@shopify/react-native-skia';
import { TileMode, MipmapMode, FilterMode } from '@shopify/react-native-skia';

export class ImageEffectHandler {
  private runtimeEffect: SkRuntimeEffect;

  constructor(runtimeEffect: SkRuntimeEffect) {
    this.runtimeEffect = runtimeEffect;
  }


  private createImageShader(image: SkImage): SkShader {
    return image.makeShaderOptions(
      TileMode.Clamp,
      TileMode.Clamp,
      FilterMode.Nearest,
      MipmapMode.None
    );
  }

  private createOffscreenSurface(width: number, height: number): SkSurface {
    const surface = Skia.Surface.MakeOffscreen(width, height);
    if (!surface) {
      throw new Error('Canvas creation error');
    }
    return surface;
  }

  async apply(image: SkImage): Promise<SkImage> {
    const imageShader = this.createImageShader(image);

    const shader = this.runtimeEffect.makeShaderWithChildren([], [imageShader]);

    if (!shader) {
      throw new Error('Failed to create shader from runtime effect.');
    }

    const surface = this.createOffscreenSurface(image.width(), image.height());
    const canvas = surface.getCanvas();

    const paint = Skia.Paint();
    paint.setShader(shader);
    canvas.drawRect(Skia.XYWHRect(0, 0, image.width(), image.height()), paint);

    const snapshot = surface.makeImageSnapshot();
    return snapshot;
  }
}