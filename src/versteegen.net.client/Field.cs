using SkiaSharp;
using System.Drawing;

namespace versteegen.net.client
{
    public class Field
    {
        public struct Star
        {
            public double initialX;
            public double initialY;
            public double x;
            public double y;
            public double initialSize;
            public double size;
            public Color starColor;
        }

        Random rand = new Random();

        Star[] stars;

        public Field(int starCount)
        {
            Reset(starCount);
        }

        public void Reset(int starCount)
        {
            stars = new Star[starCount];
            for (int i = 0; i < starCount; i++)
                stars[i] = GetRandomStar();
        }

        private Star GetRandomStar(bool randomSize = true)
        {
            double starSize = 1;
            if (randomSize)
                starSize += rand.NextDouble() * 5;

            var newX = rand.NextDouble();
            var newY = rand.NextDouble();

            var randomColor = Color.FromArgb(rand.Next(256), rand.Next(256), rand.Next(256));

            return new Star
            {
                x = newX,
                initialX = newX,
                initialY = newY,
                y = newY,
                size = starSize,
                initialSize = starSize,
                starColor = randomColor
            };
        }

        public void Advance(double step = .01, double fieldScale = 2)
        {
            for (int i = 0; i < stars.Length; i++)
            {
                stars[i].x += (stars[i].x - .5) * stars[i].size * step;
                stars[i].y += (stars[i].y - .5) * stars[i].size * step;
                stars[i].size += stars[i].size * step * 2;

                // reset stars that went out of bounds
                if (stars[i].x < -fieldScale || stars[i].x > fieldScale ||
                    stars[i].y < -fieldScale || stars[i].y > fieldScale)
                    stars[i] = GetRandomStar(randomSize: false);
            }
        }

        public Star[] GetStars()
        {
            return stars;
        }
    }
}
