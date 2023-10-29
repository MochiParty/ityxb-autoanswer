export function toQueryString(obj :any) {
  return obj
    ? Object.keys(obj)
        .sort()
        .map((key : any) => {
          const val = obj[key];
          return Array.isArray(val)
            ? val
                .sort()
                .map(
                  (val2) =>
                    encodeURIComponent(key) + "=" + encodeURIComponent(val2)
                )
                .join("&")
            : encodeURIComponent(key) + "=" + encodeURIComponent(val);
        })
        .join("&")
    : "";
}
