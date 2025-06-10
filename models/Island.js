import mongoose from "mongoose";

const affiliateContentSchema = new mongoose.Schema({
  he: String,
  en: String,
}, { _id: false });

const affiliateSchema = new mongoose.Schema({
  affiliateName: String,
  affiliateNumberOfStars: Number,
  affiliateContent: affiliateContentSchema,
  affiliateGoogleScore: Number,
  affiliateLink: String,
  affiliateStyleImage: String,
}, { _id: false });

const regionSchema = new mongoose.Schema({
  regionName: {
    he: String,
    en: String,
  },
  regionAffiliates: [affiliateSchema],
}, { _id: false });

const cafeCardSchema = new mongoose.Schema({
  url: String,
  link: String,
  title: String,
  content: String,
  id: Number,
}, { _id: false });

const IslandSchema = new mongoose.Schema({
  languageDefault: {
    he: String,
    en: String,
  },
  languageText: {
    he: String,
    en: String,
  },
  navbar: {
    desktop: {
      he: [{}],
      en: [{}],
    },
    tablet: {
      he: [{}],
      en: [{}],
    },
    mobile: {
      he: [{}],
      en: [{}],
    },
  },
  filter: {
    he: [{}],
    en: [{}],
  },
  heroImage: String,
  aboutUsPage: {
    header: {
      he: String,
      en: String,
    },
    subHeader: {
      he: String,
      en: String,
    },
    pages: [{
      link: String,
      label: {
        he: String,
        en: String,
      }
    }]
  },
  heroPara: {
    he: String,
    en: String,
  },
  ctaButton: {
    he: String,
    en: String,
  },
  ctaText: {
    he: String,
    en: String,
  },
  articleHeader: {
    he: String,
    en: String,
  },
  islandName: {
    he: String,
    en: String,
  },
  articleMainParagraph: {
    he: {
      a: String,
      b: String,
    },
    en: {
      a: String,
      b: String,
    },
  },
  articleSecondParagraph: {
    he: String,
    en: String,
  },
  facebookLink: String,
  instagramLink: String,
  linktreeLink: String,
  vacationPhotosTitle: {
    he: String,
    en: String,
  },
  mapTitle: {
    he: {
      mobile: String,
      tablet: String,
      desktop: String,
    },
    en: {
      mobile: String,
      tablet: String,
      desktop: String,
    },
  },
  mapSkech: String,
  googleMap: {
    link: String,
  },
  resortsAndHotelsTitle: {
    he: String,
    en: String,
  },
  mySocials: {
    he: String,
    en: String,
  },
  sideParagraphs: {
    sidePara1: {
      he: String,
      en: String,
    },
    sidePara2: {
      he: String,
      en: String,
    },
  },
  footer: {
    Socials: [String],
    Sections: [String],
  },
  regions: [regionSchema],
  cafesAndResturants: {
    tite: String,
    cards: [cafeCardSchema],
  },
});

export default mongoose.models.Island || mongoose.model("Island", IslandSchema);
