import React from "react";

//Packages
import { toArabic } from "arabic-digits";

//Images

export default function SmallFooter() {
  return (
    <div className="smallfooter ">
        <p className="smallfooterYear  ">
          جميع الحقوق محفوظة - لأمانة المنطقة الشرقية
          {toArabic(new Date().getFullYear())}
        </p>
    </div>
  );
}
