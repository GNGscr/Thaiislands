export default function splitAffiliatesByMedia(regionAffiliates = [], media = "desktop") {
    const rowLength = media === "mobile" ? 1 : media === "tablet" ? 2 : 3;
    const result = [];
  
    regionAffiliates.forEach((affiliate, index) => {
      const rowIndex = Math.floor(index / rowLength);
      if (!result[rowIndex]) result[rowIndex] = [];
      result[rowIndex].push(affiliate);
    });
  
    return result;
  }
  