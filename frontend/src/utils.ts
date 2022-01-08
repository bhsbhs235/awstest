function dateFormatter(date: Date | string) {
    let d: Date;
    if ((date as Date).toISOString === undefined) {
      d = new Date(date);
    } else {
      d = date as Date;
    }
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    return `${year}.${month}.${day}.`;
}

export { dateFormatter };