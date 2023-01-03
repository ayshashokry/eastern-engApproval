window.__config = {
  prod: {
    ApiUrl: "https://webgis.eamana.gov.sa/GISAPIV2",
    hostURL: "https://webgis.eamana.gov.sa",
    hostTest: "https://webgis.eamana.gov.sa",
    filesURL: "https://webgis.eamana.gov.sa/GISAPI/",
    baseURI: "/gisnew",
    openWizardUrl: window.location.protocol + "//" + window.location.hostname + "/gisv2/",
    newTabShowWizardApps:["addedparcels","planapproval","splitemargelabel","gisservices","tamlikakar"]
  },

  prod_deploy: {
    ApiUrl: window.origin + "/GISAPIV2",
    hostURL: window.origin,
    filesURL: window.origin + "/GISAPI/",
    baseURI: "/gisnew",
    openWizardUrl: window.location.protocol + "//" + window.location.hostname + "/gisv2/",
    newTabShowWizardApps:["addedparcels","planapproval","splitemargelabel","gisservices","tamlikakar"]
  },
  stage: {
    ApiUrl: "http://77.30.168.84/GISAPITESTV2",
    hostURL: "http://77.30.168.85",
    filesURL: "http://77.30.168.84/GISAPI/",
    baseURI: "/gisnew",
    openWizardUrl: window.location.protocol + "//" + window.location.hostname + "/gisv2/",
    newTabShowWizardApps:["addedparcels","planapproval","splitemargelabel","gisservices","tamlikakar"]
  },
  master: {
    ApiUrl: "http://77.30.168.84/GISAPIDEVV2",
    hostURL: "http://77.30.168.84",
    hostTest:"http://77.30.168.86",
    filesURL: "http://77.30.168.84/GISAPI/",
    baseURI: "/gisnew",
    openWizardUrl: window.location.protocol + "//" + window.location.hostname + "/gisv2/",
    newTabShowWizardApps:["addedparcels","planapproval","splitemargelabel","gisservices","tamlikakar"]
  }
};
