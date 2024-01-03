/**
 * Creates a new `PlayerQueryList` object that can then be used to determine if the
 * player and document matches the query string, as well as to monitor any changes to detect
 * when it matches (or stops matching) that query.
 *
 * A player query supports the same syntax as media queries and allows media state properties
 * to be used like so:
 *
 * ```ts
 * const matches = usePlayerQuery("(width < 680) and (streamType: on-demand)");
 * ```
 *
 * You can also use media queries:
 *
 * ```ts
 * const matches = usePlayerQuery("@media (min-width: 300px)");
 * ```
 *
 * @docs {@link https://www.vidstack.io/docs/player/api/hooks/use-player-query}
 */
export declare function usePlayerQuery(query: string): boolean;
