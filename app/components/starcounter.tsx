import { Icon } from './icon';

export default function StarCounter({
  count,
  limit,
}: {
  count: number;
  limit: number;
}) {
  /**
   * Prevents the count from exceeding the limit.
   */

  if (count > limit) count = limit;

  /**
   * Returns an array of length `limit` with the count as the length of the array.
   */

  return (
    <>
      {Array.from({ length: limit }, (_, i) => {
        return (
          <div
            key={i}
            className="relative flex items-center justify-center w-4 h-4"
          >
            <Icon aria-hidden name="Star" className="w-4 h-4 text-rose-500" />

            <div className="absolute top-0 left-0 flex items-center justify-center w-4 h-4 overflow-hidden">
              <Icon
                aria-hidden
                name="Star"
                strokeWidth={0}
                className="w-4 h-4 fill-rose-500 text-transparent"
                style={{
                  clipPath: `polygon(0 0, ${count - i}rem 0, ${
                    count - i
                  }rem 1rem, 0 1rem)`,
                }}
              />
            </div>
          </div>
        );
      })}
    </>
  );
}
