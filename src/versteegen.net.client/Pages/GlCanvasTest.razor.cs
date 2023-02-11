using SkiaSharp;
using SkiaSharp.Views.Blazor;
using System.Diagnostics.Metrics;
using System.Threading;
using System.Timers;
using static versteegen.net.client.Field;

namespace versteegen.net.client.Pages
{
    public partial class GlCanvasTest
    {
        private SKGLView _glView;
        private int _starAlpha = 255;
        private bool _lightSpeed = false;
        private readonly Field _field = new Field(100);


        private void OnPaintSurface(SKPaintGLSurfaceEventArgs obj)
        {

            _field.Advance(0.01, 2);
            obj.Surface.Canvas.Clear(SKColors.Black);

            foreach (var star in _field.GetStars())
            {
                var starColor = new SKColor(star.starColor.R, star.starColor.G, star.starColor.B, (byte)_starAlpha);
                var starPaint = new SKPaint() { IsAntialias = true, Color = starColor };


                float xPixel = (float)star.x * 500;
                float yPixel = (float)star.y * 500;
                float radius = (float)star.size - 1;
                var point = new SKPoint(xPixel, yPixel);

                var intermediateSteps = 1000f;
                var xStep = xPixel - star.initialX * 500;
                var yStep = yPixel - star.initialY * 500;

                if (!_lightSpeed)
                {
                    var tailPath = new SKPath();
                    tailPath.MoveTo(new SKPoint((float)star.initialX * 500f, (float)star.initialY * 500f));
                    tailPath.LineTo(new SKPoint(point.X + radius, point.Y));
                    tailPath.LineTo(new SKPoint(point.X - radius, point.Y));
                    tailPath.Close();
                    obj.Surface.Canvas.DrawPath(tailPath, starPaint);
                }

                obj.Surface.Canvas.DrawCircle(point, radius, starPaint);
            }
        }
    }
}
