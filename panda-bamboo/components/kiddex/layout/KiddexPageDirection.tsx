"use client";

export function KiddexPageDirection() {
  return (
    <div className="page_direction">
      <div className="demo-rtl direction_switch">
        <button type="button" className="rtl">
          RTL
        </button>
      </div>
      <div className="demo-ltr direction_switch">
        <button type="button" className="ltr">
          LTR
        </button>
      </div>
    </div>
  );
}
