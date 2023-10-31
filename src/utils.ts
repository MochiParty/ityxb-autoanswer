export function toQueryString(obj: any) {
  return obj
    ? Object.keys(obj)
        .sort()
        .map((key: any) => {
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

export function getUrlParam(name: string) {
  const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  const r = window.location.search.substr(1).match(reg);
  return r ? unescape(r[2]) : null;
};


export function getWorkBusyId(){
  const reg = new RegExp(".*busywork/(?<id>.+)?");
  const r = window.location.pathname.match(reg)
  return r ? unescape(r[1]) : null;
}