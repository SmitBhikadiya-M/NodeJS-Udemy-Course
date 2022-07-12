
const rp = require("request-promise");
const cheerio = require("cheerio");

const websiteData = [
    "http://www.pioneertravels.com",//w
    "https://www.zydushospitals.com/", //w
    "https://www.themls.com", //not found
    "https://www.ozone-india.com/", //w
    "https://www.finnovators.in/", //not found
    "https://www.starstell.com/", //w
    "https://www.donnaitalia.com", //Site blocked
    "https://www.uopinternational.org/", // continue showing 'UOPI TigerBot is typing..'
    "https://preprod.muchomobile.ch/", // site blocked
    "https://www.acadshr.com", // working
    "https://www.domino-printing.com/", // not found
    "https://www.315workavenue.com/", // site blocked  
    "https://www.sukhii.group/", // site blocked
    "https://www.dm-consultant.in/", // w
    "https://vertexglobaluae.ae/", // w
    "https://app.easyequities.co.za",
    "https://www.usfitness.com",
    "https://contently.com/",
    "https://owlspriority.com/",
    "https://www.artvo.com.au/our-range",
    "https://hariomconsultancy.in/30/index.html",
    "https://www.resumekart.com/",
    "https://www.edviconeducare.com",
    "https://hometitan.org",
    "https://arviax.com/sophia.html",
    "https://jattu.io",
    "https://www.raptorwindowcleaning.com",
    "https://matrix.dayang.com.cn/matrix/",
    "https://omnifoodv2.netlify.app/",
    "https://willett.in",
    "https://kdonbox.com/"
]

const grabScritps = async (url, startsWith) => {
    const data = { url, found: [] }
    try {
        const res = await rp(url);
        const $ = cheerio.load(res);
        const scripts = $("script", res);
        if (scripts.length > 0) {
            for (let i = 0; i < scripts.length; i++) {
                if (!scripts[i]) {
                    continue;
                }
                if (scripts[i].attribs.src !== undefined && (scripts[i].attribs.src.startsWith("https://app.wotnot.io"))) {
                    data.found.push(scripts[i].attribs.src);
                }
            }
        }
    } catch (e) {
        data.error = e;
    }
    console.log(data);
};

websiteData.forEach((url) => {
    grabScritps(url);
});
