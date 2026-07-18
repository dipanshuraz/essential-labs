/** Matches Kiddex template preloader (index.html). */
export function KiddexPreloader() {
  return (
    <div className="loader-wrap">
      <div className="preloader">
        <div id="handle-preloader" className="handle-preloader">
          <div className="animation-preloader">
            <div className="spinner" />
            <div className="txt-loading">
              {(["k", "i", "d", "d", "e", "x"] as const).map((letter) => (
                <span key={letter} data-text-preloader={letter} className="letters-loading">
                  {letter}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
