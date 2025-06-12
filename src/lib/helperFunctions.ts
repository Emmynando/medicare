export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function convertDate(theDate: string) {
  const date = new Date(theDate);
  const hours = date.getHours().toString().padStart(2, "0"); // Local time
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");

  const formatted = `${hours}:${minutes} ${day}/${month}`;
  return formatted;
  // return date.toLocaleString(undefined, {
  //   hour: "2-digit",
  //   minute: "2-digit",
  //   day: "2-digit",
  //   month: "2-digit",
  //   hour12: false,
  // });
}
