import moment from "moment";
import React, { useState } from "react";
import HijriUtils from "@date-io/hijri";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import "moment/locale/ar-sa";

function DateInput() {
  const [selectedDate, handleDateChange] = useState(moment());

  return (
    <MuiPickersUtilsProvider utils={HijriUtils} locale="ar-SA">
      <DatePicker
        autoOk="true"
        openTo="year"
        views={["year", "month", "date"]}
        clearable
        labelFunc={(date) => (date ? date.format("iYYYY/iMM/iDD") : "")}
        value={selectedDate}
        onChange={handleDateChange}
        minDate="1937-03-14"
        maxDate="2076-11-26"
      />
    </MuiPickersUtilsProvider>
  );
}

export default DateInput;
