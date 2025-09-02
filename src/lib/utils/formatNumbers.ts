function formatNumberWithCommas(value: string): string {
    const [integer, decimal] = value.split(".");
    const formatted = Number(integer).toLocaleString();
    return decimal ? `${formatted}.${decimal}` : formatted;
}


export { formatNumberWithCommas };